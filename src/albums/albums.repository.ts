import { Injectable } from '@nestjs/common';
import { Repository } from '../common/repository';
import { Album } from './albums.types';
import { Repository as OrmRepo } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Album as AlbumEntity } from './albums.entity';

@Injectable()
export class AlbumsRepository implements Repository<Album> {
  constructor(
    @InjectRepository(AlbumEntity)
    private readonly albumRepository: OrmRepo<AlbumEntity>,
  ) {}

  async findById(id: string): Promise<Album | void> {
    return this.albumRepository.findOne({
      where: { id },
      relations: { artist: true },
    });
  }

  async findAll(): Promise<Album[]> {
    return this.albumRepository.find({ relations: { artist: true } });
  }

  async create(album: Album): Promise<Album> {
    return this.albumRepository.save(album);
  }

  async update(id: string, albumData: Partial<Album>): Promise<Album | null> {
    const albumToUpdate = await this.findById(id);

    if (!albumToUpdate) {
      return null;
    }

    const updateAlbum = { ...albumToUpdate, ...albumData };
    return this.albumRepository.save(updateAlbum);
  }

  async delete(id: string): Promise<boolean> {
    const albumToDelete = await this.findById(id);

    if (!albumToDelete) {
      return false;
    }

    const result = await this.albumRepository.delete(id);

    return result.affected > 0;
  }
}
