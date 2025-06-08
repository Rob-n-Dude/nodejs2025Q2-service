import { Album } from '../albums/albums.entity';
import { Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { Artist } from '../artists/artists.entity';
import { Track } from '../tracks/tracks.entity';

@Entity('favorites')
export class Favorite {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToMany(() => Album, { cascade: true })
  @JoinTable()
  albums: Album[];

  @ManyToMany(() => Artist, { cascade: true })
  @JoinTable()
  artists: Artist[];

  @ManyToMany(() => Track, { cascade: true })
  @JoinTable()
  tracks: Track[];
}
