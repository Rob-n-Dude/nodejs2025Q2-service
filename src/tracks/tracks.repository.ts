import { Repository } from 'src/common/repository';
import { Track } from './tracks.types';

export class TracksRepository implements Repository<Track> {
  private tracks: Record<string, Track> = {};

  async findById(id: string): Promise<Track | null> {
    return Promise.resolve(this.tracks[id] || null);
  }

  async findAll(): Promise<Track[]> {
    return Promise.resolve(Object.values(this.tracks));
  }

  async create(track: Track): Promise<Track> {
    return new Promise((resolve) => {
      this.tracks[track.id] = track;

      resolve(track);
    });
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

    this.tracks[id] = updatedTrack;

    return updatedTrack;
  }

  async delete(id: string): Promise<boolean> {
    const trackToDelete = await this.findById(id);

    if (!trackToDelete) {
      return false;
    }

    delete this.tracks[id];

    return true;
  }
}
