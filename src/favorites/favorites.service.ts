import { Injectable } from '@nestjs/common';
import { FavoritesRepository } from './favorites.repository';
import { EntityKey } from '../common/EntityKey';
import { FavoriteEntityNotFoundException } from './exceptions/FavoriteEntityNotFoundException';
import { AlbumsService } from '../albums/albums.service';
import { ArtistsService } from '../artists/artists.service';
import { TracksService } from '../tracks/tracks.service';
import { NonExistedFavoriteEntityException } from './exceptions/NonExistedFavoriteEntityException';

@Injectable()
export class FavoritesService {
  constructor(
    private readonly favoritesRepository: FavoritesRepository,
    private readonly albumsService: AlbumsService,
    private readonly artistsService: ArtistsService,
    private readonly tracksService: TracksService,
  ) {}

  async getAllFavorites() {
    return await this.favoritesRepository.findAll();
  }

  private async findEntityById(entityKey: EntityKey, entityId: string) {
    switch (entityKey) {
      case EntityKey.ALBUMS:
        return await this.albumsService.getAlbumById(entityId);
      case EntityKey.ARTISTS:
        return await this.artistsService.getArtistById(entityId);
      case EntityKey.TRACKS:
        return await this.tracksService.getTrackById(entityId);
      default:
        break;
    }
  }

  async addEntityToFavorites(entityKey: EntityKey, entityId: string) {
    try {
      const entity = await this.findEntityById(entityKey, entityId);

      if (!entity) {
        throw new NonExistedFavoriteEntityException(entityKey, entityId);
      }

      await this.favoritesRepository.create(entityKey, entity);

      return entity;
    } catch {
      throw new NonExistedFavoriteEntityException(entityKey, entityId);
    }
  }

  async removeEntityFromFavorites(entityKey: EntityKey, entityId: string) {
    const removed = await this.favoritesRepository.delete(entityKey, entityId);

    if (!removed) {
      throw new FavoriteEntityNotFoundException(entityKey, entityId);
    }
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
