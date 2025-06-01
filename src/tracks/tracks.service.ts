import { Injectable } from '@nestjs/common';
import { TracksRepository } from './tracks.repository';
import { TrackNotFoundException } from './exceptions/TrackNotFoundException';
import { Track } from './tracks.types';
import { CreateTrackDTO } from './dto/CreateTrackDTO';
import { randomUUID } from 'node:crypto';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { EventType } from '../common/events/types';
import { AddTrackToFavoritesEvent } from 'src/favorites/events/AddTrackToFavoritesEvent';
import { GetEntityEvent } from 'src/common/events/GetEntityEvent';
import { EntityKey } from 'src/common/EntityKey';
import { EntityDeletedEvent } from 'src/common/events/EntityDeletedEvent';

@Injectable()
export class TracksService {
  constructor(
    private readonly tracksRepository: TracksRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async getAllTracks() {
    return await this.tracksRepository.findAll();
  }

  async getTrackById(id: string) {
    const track = await this.tracksRepository.findById(id);

    if (!track) {
      throw new TrackNotFoundException(id);
    }

    return track;
  }

  async createTrack(trackData: CreateTrackDTO) {
    const { name, artistId = null, albumId = null, duration } = trackData;

    const id = randomUUID();

    const track: Track = {
      id,
      name,
      artistId,
      albumId,
      duration,
    };

    return await this.tracksRepository.create(track);
  }

  async updateTrack(id: string, trackData: Partial<CreateTrackDTO>) {
    const track = await this.tracksRepository.findById(id);

    if (!track) {
      throw new TrackNotFoundException(id);
    }

    return await this.tracksRepository.update(id, trackData);
  }

  async deleteTrack(id: string) {
    const track = await this.tracksRepository.delete(id);

    if (!track) {
      throw new TrackNotFoundException(id);
    }

    this.eventEmitter.emit(
      EventType.ENTITY_DELETED,
      new EntityDeletedEvent(EntityKey.TRACKS, id),
    );
  }

  @OnEvent(EventType.ENTITY_DELETED)
  async handleDeleteEntityEvent(event: EntityDeletedEvent) {
    const { id, key } = event;

    if (key === EntityKey.TRACKS) {
      return;
    }

    const tracks = await this.tracksRepository.findAll();

    const entityKeyToTrackKey =
      key === EntityKey.ARTISTS ? 'artistId' : 'albumId';

    const tracksToUpdate = tracks.filter(
      (track) => track[entityKeyToTrackKey] === id,
    );

    await Promise.all(
      tracksToUpdate.map((track) => {
        const updatedTrack = {
          ...track,
          [entityKeyToTrackKey]: null,
        };

        return this.tracksRepository.update(track.id, updatedTrack);
      }),
    );
  }

  @OnEvent(EventType.ADD_TRACK_TO_FAVORITES)
  async handleCheckTrackExisted(event: AddTrackToFavoritesEvent) {
    const { trackId, callback } = event;

    const track = await this.tracksRepository.findById(trackId);

    await callback(!!track);
  }

  @OnEvent(EventType.GET_ENTITY)
  async handleGetEntitiesByIds(event: GetEntityEvent) {
    const { key } = event;

    if (key !== EntityKey.TRACKS) {
      return;
    }

    const { ids, callback } = event;

    const tracksById = await Promise.all(
      ids.map((id) => {
        return this.tracksRepository.findById(id);
      }),
    );

    callback(tracksById);
  }
}
