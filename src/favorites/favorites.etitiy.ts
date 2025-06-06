import { EntityKey } from '../common/EntityKey';
import { Entity, Column } from 'typeorm';

@Entity('favorites')
export class Favorite {
  @Column({ nullable: false, type: 'json' })
  [EntityKey.ALBUMS]: string[];

  @Column({ nullable: false, type: 'json' })
  [EntityKey.ARTISTS]: string[];

  @Column({ nullable: false, type: 'json' })
  [EntityKey.TRACKS]: string[];
}
