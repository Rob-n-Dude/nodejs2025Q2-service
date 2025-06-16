import { EntityKey } from '../common/EntityKey';

export interface Favorite {
  [EntityKey.ALBUMS]: string[];
  [EntityKey.ARTISTS]: string[];
  [EntityKey.TRACKS]: string[];
}
