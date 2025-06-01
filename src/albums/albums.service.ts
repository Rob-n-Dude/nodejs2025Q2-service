import { Injectable } from '@nestjs/common';
import { AlbumsRepository } from './albums.repository';
import { AlbumNotFoundException } from './exceptions/AlbumNotFoundException';
import { CreateAlbumDTO } from './dto/CreateAlbumDTO';
import { randomUUID } from 'node:crypto';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { DeleteAlbumEvent } from '../common/events/DeleteAlbumEvent';
import { EventType } from '../common/events/types';
import { DeleteArtistEvent } from 'src/artists/events/DeleteArtistEvent';
import { AddAlbumToFavoritesEvent } from 'src/favorites/events/AddAlbumToFavoritesEvent';
import { GetEntityEvent } from 'src/common/events/GetEntityEvent';
import { EntityKey } from 'src/common/EntityKey';
import { EntityDeletedEvent } from 'src/common/events/EntityDeletedEvent';

@Injectable()
export class AlbumsService {
  constructor(
    private readonly albumsRepository: AlbumsRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async getAllAlbums() {
    return await this.albumsRepository.findAll();
  }

  async getAlbumById(id: string) {
    const album = await this.albumsRepository.findById(id);
    if (!album) {
      throw new AlbumNotFoundException(id);
    }

    return album;
  }

  async createAlbum(albumData: CreateAlbumDTO) {
    const { name, artistId = null, year } = albumData;

    const id = randomUUID();

    const album = {
      id,
      name,
      artistId,
      year,
    };

    return await this.albumsRepository.create(album);
  }

  async updateAlbum(id: string, albumData: Partial<CreateAlbumDTO>) {
    const album = await this.albumsRepository.findById(id);

    if (!album) {
      throw new AlbumNotFoundException(id);
    }

    return await this.albumsRepository.update(id, albumData);
  }

  async deleteAlbum(id: string) {
    const album = await this.albumsRepository.delete(id);

    if (!album) {
      throw new AlbumNotFoundException(id);
    }

    this.eventEmitter.emit(EventType.ALBUM_DELETED, new DeleteAlbumEvent(id));
  }

  @OnEvent(EventType.ENTITY_DELETED)
  async handleDeleteArtistEvent(event: EntityDeletedEvent) {
    const { id, key } = event;
    if (key !== EntityKey.ARTISTS) {
      return;
    }

    const albums = await this.albumsRepository.findAll();

    const albumsToUpdate = albums.filter((album) => album.artistId === id);

    await Promise.all(
      albumsToUpdate.map((album) => {
        return this.albumsRepository.update(album.id, { artistId: null });
      }),
    );
  }

  @OnEvent(EventType.ADD_ALBUM_TO_FAVORITES)
  async handleCheckAlbumExisted(event: AddAlbumToFavoritesEvent) {
    const { id, callback } = event;

    const track = await this.albumsRepository.findById(id);

    await callback(!!track);
  }

  @OnEvent(EventType.GET_ENTITY)
  async handleGetEntitiesByIds(event: GetEntityEvent) {
    const { key } = event;

    if (key !== EntityKey.ALBUMS) {
      return;
    }

    const { ids, callback } = event;

    const albumsById = await Promise.all(
      ids.map((id) => {
        return this.albumsRepository.findById(id);
      }),
    );

    callback(albumsById);
  }
}
