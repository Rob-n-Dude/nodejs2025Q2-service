import { EntityKey } from '../common/EntityKey';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('favorites')
export class Favorite {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, type: 'json' })
  [EntityKey.ALBUMS]: string[];

  @Column({ nullable: false, type: 'json' })
  [EntityKey.ARTISTS]: string[];

  @Column({ nullable: false, type: 'json' })
  [EntityKey.TRACKS]: string[];
}
