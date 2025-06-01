import { EntityKey } from 'src/common/EntityKey';

export interface Favorite {
  [EntityKey.ALBUMS]: string[];
  [EntityKey.ARTISTS]: string[];
  [EntityKey.TRACKS]: string[];
}
