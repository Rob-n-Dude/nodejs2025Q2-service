import { Injectable } from '@nestjs/common';
import { TracksRepository } from './tracks.repository';
import { TrackNotFoundException } from './exceptions/TrackNotFoundException';
import { Track } from './tracks.types';
import { CreateTrackDTO } from './dto/CreateTrackDTO';
import { randomUUID } from 'node:crypto';
import { OnEvent } from '@nestjs/event-emitter';
import { DeleteAlbumEvent } from '../common/events/DeleteAlbumEvent';
import { EventType } from '../common/events/types';

@Injectable()
export class TracksService {
  constructor(private readonly tracksRepository: TracksRepository) {}

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
  }

  @OnEvent(EventType.ALBUM_DELETED)
  async handleDeleteAlbumEvent(event: DeleteAlbumEvent) {
    const { id } = event;

    const tracks = await this.tracksRepository.findAll();

    const tracksToUpdate = tracks.filter((track) => track.albumId === id);

    await Promise.all(
      tracksToUpdate.map((track) => {
        const updatedTrack = {
          ...track,
          albumId: null,
        };

        return this.tracksRepository.update(track.id, updatedTrack);
      }),
    );
  }
}
