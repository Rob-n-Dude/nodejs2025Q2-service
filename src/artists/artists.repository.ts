import { Injectable } from '@nestjs/common';
import { Artist as ArtistInterface } from './artists.types';
import { Repository as RepositoryInterface } from '../common/repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Artist } from './artists.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistsRepository implements RepositoryInterface<ArtistInterface> {
  private artists: Record<string, ArtistInterface> = {};

  constructor(
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,
  ) {}

  async findById(id: string): Promise<ArtistInterface | null> {
    // return Promise.resolve(this.artists[id] || null);
    return this.artistRepository.findOne({ where: { id } }) || null;
  }

  async findAll(): Promise<ArtistInterface[]> {
    // return Promise.resolve(Object.values(this.artists));
    return this.artistRepository.find();
  }

  async create(artist: ArtistInterface): Promise<ArtistInterface> {
    // return new Promise((resolve) => {
    //   this.artists[artist.id] = artist;
    //   resolve(artist);
    // });
    return this.artistRepository.save(artist);
  }

  async update(
    id: string,
    artistData: Partial<ArtistInterface>,
  ): Promise<ArtistInterface | null> {
    const artistToUpdate = await this.findById(id);

    if (!artistToUpdate) {
      return null;
    }

    const updatedArtist = { ...artistToUpdate, ...artistData };

    return this.artistRepository.save(updatedArtist);
    // this.artists[id] = updatedArtist;

    // return updatedArtist;
  }

  async delete(id: string): Promise<boolean> {
    const artistToDelete = await this.findById(id);

    if (!artistToDelete) {
      return false;
    }

    const result = await this.artistRepository.delete(id);

    return result.affected > 0;
    // delete this.artists[id];
    // return true;
  }
}
