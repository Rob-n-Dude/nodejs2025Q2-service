import { Injectable } from '@nestjs/common';
import { Artist as ArtistInterface } from './artists.types';
import { Repository as RepositoryInterface } from '../common/repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Artist } from './artists.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistsRepository implements RepositoryInterface<ArtistInterface> {
  constructor(
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,
  ) {}

  async findById(id: string): Promise<ArtistInterface | void> {
    return this.artistRepository.findOne({ where: { id } });
  }

  async findAll(): Promise<ArtistInterface[]> {
    return this.artistRepository.find();
  }

  async create(artist: ArtistInterface): Promise<ArtistInterface> {
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
  }

  async delete(id: string): Promise<boolean> {
    const artistToDelete = await this.findById(id);

    if (!artistToDelete) {
      return false;
    }

    const result = await this.artistRepository.delete(id);

    return result.affected > 0;
  }
}
