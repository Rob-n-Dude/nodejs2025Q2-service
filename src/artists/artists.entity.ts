import { Track } from '../tracks/tracks.entity';
import { Album } from '../albums/albums.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('artists')
export class Artist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'boolean' })
  grammy: boolean;

  @OneToMany(() => Album, (album) => album.artist, {
    cascade: true,
  })
  albums: Album[];

  @OneToMany(() => Track, (track) => track.artist, {
    cascade: true,
  })
  tracks: Track[];
}
