import { Injectable } from '@nestjs/common';
import { ArtistNotFoundException } from './exceptions/ArtistNotFoundException';
import { CreateArtistDTO } from './dto/CreateArtistDTO';
import { randomUUID } from 'node:crypto';
import { Artist } from './artists.types';
import { UpdateArtistDTO } from './dto/UpdateArtistDTO';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { EventType } from '../common/events/types';
import { ArtistsRepository } from './artists.repository';
import { AddArtistToFavoritesEvent } from '../favorites/events/AddArtistToFavoritesEvent';
import { GetEntityEvent } from '../common/events/GetEntityEvent';
import { EntityKey } from '../common/EntityKey';
import { EntityDeletedEvent } from '../common/events/EntityDeletedEvent';

@Injectable()
export class ArtistsService {
  constructor(
    private readonly artistsRepository: ArtistsRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async getAllArtists() {
    return await this.artistsRepository.findAll();
  }

  async getArtistById(id: string) {
    const artist = await this.artistsRepository.findById(id);

    if (!artist) {
      throw new ArtistNotFoundException(id);
    }

    return artist;
  }

  async createArtist(artistData: CreateArtistDTO) {
    const id = randomUUID();

    const artist: Artist = {
      id,
      ...artistData,
    };

    return await this.artistsRepository.create(artist);
  }

  async updateArtist(id: string, artistData: UpdateArtistDTO): Promise<Artist> {
    const artist = await this.artistsRepository.findById(id);

    if (!artist) {
      throw new ArtistNotFoundException(id);
    }

    return await this.artistsRepository.update(id, artistData);
  }

  async deleteArtist(id: string) {
    const artist = await this.artistsRepository.delete(id);

    if (!artist) {
      throw new ArtistNotFoundException(id);
    }

    this.eventEmitter.emit(
      EventType.ENTITY_DELETED,
      new EntityDeletedEvent(EntityKey.ARTISTS, id),
    );
  }

  @OnEvent(EventType.ADD_ARTIST_TO_FAVORITES)
  async handleCheckArtistExisted(event: AddArtistToFavoritesEvent) {
    const { id, callback } = event;

    const artist = await this.artistsRepository.findById(id);

    await callback(!!artist);
  }

  @OnEvent(EventType.GET_ENTITY)
  async handleGetEntitiesByIds(event: GetEntityEvent) {
    const { key } = event;

    if (key !== EntityKey.ARTISTS) {
      return;
    }

    const { ids, callback } = event;

    const artistsById = await Promise.all(
      ids.map((id) => {
        return this.artistsRepository.findById(id);
      }),
    );

    callback(artistsById);
  }
}
