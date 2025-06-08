import { Injectable } from '@nestjs/common';
import { AlbumsRepository } from './albums.repository';
import { AlbumNotFoundException } from './exceptions/AlbumNotFoundException';
import { CreateAlbumDTO } from './dto/CreateAlbumDTO';
import { randomUUID } from 'node:crypto';

@Injectable()
export class AlbumsService {
  constructor(private readonly albumsRepository: AlbumsRepository) {}

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
  }
}
