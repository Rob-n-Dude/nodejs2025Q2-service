import { FavoriteArtistNotFoundException } from './FavoriteArtistNotFoundException';
import { EntityKey } from '../../common/EntityKey';
import { FavoriteAlbumNotFoundException } from './FavoriteAlbumNotFoundException';
import { FavoriteTrackNotFoundException } from './FavoriteTrackNotFoundException';

export class FavoriteEntityNotFoundException {
  constructor(entityKey: string, entityId: string) {
    switch (entityKey) {
      case EntityKey.ARTISTS:
        throw new FavoriteArtistNotFoundException(entityId);
      case EntityKey.ALBUMS:
        throw new FavoriteAlbumNotFoundException(entityId);
      case EntityKey.TRACKS:
        throw new FavoriteTrackNotFoundException(entityId);
    }
  }
}
