import { Injectable } from '@nestjs/common';
import { Artist } from './artists.types';
import { Repository } from '../common/repository';

@Injectable()
export class ArtistsRepository implements Repository<Artist> {
  private artists: Record<string, Artist> = {};

  async findById(id: string): Promise<Artist | null> {
    return Promise.resolve(this.artists[id] || null);
  }

  async findAll(): Promise<Artist[]> {
    return Promise.resolve(Object.values(this.artists));
  }

  async create(artist: Artist): Promise<Artist> {
    return new Promise((resolve) => {
      this.artists[artist.id] = artist;
      resolve(artist);
    });
  }

  async update(
    id: string,
    artistData: Partial<Artist>,
  ): Promise<Artist | null> {
    const artistToUpdate = await this.findById(id);

    if (!artistToUpdate) {
      return null;
    }

    const updatedArtist = { ...artistToUpdate, ...artistData };
    this.artists[id] = updatedArtist;

    return updatedArtist;
  }

  async delete(id: string): Promise<boolean> {
    const artistToDelete = await this.findById(id);

    if (!artistToDelete) {
      return false;
    }

    delete this.artists[id];
    return true;
  }
}
