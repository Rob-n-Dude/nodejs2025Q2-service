import { Injectable } from '@nestjs/common';
import { FavoritesRepository } from './favorites.repository';
import { EntityKey } from '../common/EntityKey';
import { FavoriteEntityNotFoundException } from './exceptions/FavoriteEntityNotFoundException';

@Injectable()
export class FavoritesService {
  constructor(private readonly favoritesRepository: FavoritesRepository) {}

  private async addEntityToFavorites(entityKey: EntityKey, entityId: string) {
    const favoriteEntities =
      await this.favoritesRepository.findByKey(entityKey);

    if (favoriteEntities.find((entity) => entity.id === entityId)) {
      return entityId;
    }

    await this.favoritesRepository.create(entityKey, entityId);
    return entityId;
  }

  private async removeEntityFromFavorites(
    entityKey: EntityKey,
    entityId: string,
  ) {
    const entity = await this.favoritesRepository.delete(entityKey, entityId);

    if (!entity) {
      throw new FavoriteEntityNotFoundException(entityKey, entityId);
    }
  }

  async getAllFavorites() {
    return await this.favoritesRepository.findAll();
  }

  async addTrackToFavorites(trackId: string) {
    return this.addEntityToFavorites(EntityKey.TRACKS, trackId);
  }

  async removeTrackFromFavorites(trackId: string) {
    return this.removeEntityFromFavorites(EntityKey.TRACKS, trackId);
  }

  async addArtistToFavorites(artistId: string) {
    return this.addEntityToFavorites(EntityKey.ARTISTS, artistId);
  }

  async removeArtistFromFavorites(artistId: string) {
    return this.removeEntityFromFavorites(EntityKey.ARTISTS, artistId);
  }

  async addAlbumToFavorites(albumId: string) {
    return this.addEntityToFavorites(EntityKey.ALBUMS, albumId);
  }

  async removeAlbumFromFavorites(albumId: string) {
    return this.removeEntityFromFavorites(EntityKey.ALBUMS, albumId);
  }
}
