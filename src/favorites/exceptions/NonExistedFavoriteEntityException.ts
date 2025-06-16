import { EntityKey } from '../../common/EntityKey';
import { NonExistedArtistException } from './NonExistedArtistException';
import { NonExistedAlbumException } from './NonExistedAlbumException';
import { NonExistedTrackException } from './NonExistedTrackException';

export class NonExistedFavoriteEntityException {
  constructor(entityKey: string, entityId: string) {
    switch (entityKey) {
      case EntityKey.ARTISTS:
        throw new NonExistedArtistException(entityId);
      case EntityKey.ALBUMS:
        throw new NonExistedAlbumException(entityId);
      case EntityKey.TRACKS:
        throw new NonExistedTrackException(entityId);
    }
  }
}
