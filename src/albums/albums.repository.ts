import { Injectable } from '@nestjs/common';
import { Repository } from '../common/repository';
import { Album } from './albums.types';

@Injectable()
export class AlbumsRepository implements Repository<Album> {
  private albums: Record<string, Album> = {};

  async findById(id: string): Promise<Album | null> {
    return Promise.resolve(this.albums[id] || null);
  }

  async findAll(): Promise<Album[]> {
    return Promise.resolve(Object.values(this.albums));
  }

  async create(album: Album): Promise<Album> {
    return new Promise((resolve) => {
      this.albums[album.id] = album;

      resolve(album);
    });
  }

  async update(id: string, albumData: Partial<Album>): Promise<Album | null> {
    const albumToUpdate = await this.findById(id);

    if (!albumToUpdate) {
      return null;
    }

    const updateAlbum = { ...albumToUpdate, ...albumData };
    this.albums[id] = updateAlbum;
    return updateAlbum;
  }

  async delete(id: string): Promise<boolean> {
    const albumToDelete = await this.findById(id);

    if (!albumToDelete) {
      return false;
    }

    delete this.albums[id];
    return true;
  }
}
