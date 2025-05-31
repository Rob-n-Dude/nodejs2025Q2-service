import { Injectable } from '@nestjs/common';
import { AlbumsRepository } from './albums.repository';
import { AlbumNotFoundException } from './exceptions/AlbumNotFoundException';
import { CreateAlbumDTO } from './dto/CreateAlbumDTO';
import { randomUUID } from 'node:crypto';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { DeleteAlbumEvent } from '../common/events/DeleteAlbumEvent';
import { EventType } from '../common/events/types';

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

    const updatedAlbum = {
      ...album,
      ...albumData,
    };

    return await this.albumsRepository.update(id, updatedAlbum);
  }

  async deleteAlbum(id: string) {
    const album = await this.albumsRepository.delete(id);

    if (!album) {
      throw new AlbumNotFoundException(id);
    }

    this.eventEmitter.emit(EventType.ALBUM_DELETED, new DeleteAlbumEvent(id));
  }
}
