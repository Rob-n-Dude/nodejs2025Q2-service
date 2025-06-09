import { Injectable } from '@nestjs/common';
import { ArtistNotFoundException } from './exceptions/ArtistNotFoundException';
import { CreateArtistDTO } from './dto/CreateArtistDTO';
import { randomUUID } from 'node:crypto';
import { Artist } from './artists.types';
import { UpdateArtistDTO } from './dto/UpdateArtistDTO';
import { ArtistsRepository } from './artists.repository';

@Injectable()
export class ArtistsService {
  constructor(private readonly artistsRepository: ArtistsRepository) {}

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
  }
}
