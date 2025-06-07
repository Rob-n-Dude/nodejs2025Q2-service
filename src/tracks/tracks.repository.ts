import { Repository } from '../common/repository';
import { Track } from './tracks.types';
import { Repository as OrmRepo } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Track as TrackEntity } from './tracks.entity';

export class TracksRepository implements Repository<Track> {
  constructor(
    @InjectRepository(TrackEntity)
    private readonly trackRepository: OrmRepo<TrackEntity>,
  ) {}

  async findById(id: string): Promise<Track | void> {
    return this.trackRepository.findOne({ where: { id } });
  }

  async findAll(): Promise<Track[]> {
    return this.trackRepository.find();
  }

  async create(track: Track): Promise<Track> {
    return this.trackRepository.save(track);
  }

  async update(id: string, trackData: Partial<Track>): Promise<Track | null> {
    const trackToUpdate = await this.findById(id);

    if (!trackToUpdate) {
      return null;
    }

    const updatedTrack = {
      ...trackToUpdate,
      ...trackData,
    };

    return this.trackRepository.save(updatedTrack);
  }

  async delete(id: string): Promise<boolean> {
    const trackToDelete = await this.findById(id);

    if (!trackToDelete) {
      return false;
    }

    const result = await this.trackRepository.delete(id);

    return result.affected > 0;
  }
}
