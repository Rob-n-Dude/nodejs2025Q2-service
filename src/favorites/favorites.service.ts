import { Injectable } from '@nestjs/common';
import { FavoritesRepository } from './favorites.repository';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { EventType } from '../common/events/types';
import { AddTrackToFavoritesEvent } from './events/AddTrackToFavoritesEvent';
import { NonExistedTrackException } from './exceptions/NonExistedTrackException';
import { FavoriteTrackNotFoundException } from './exceptions/FavoriteTrackNotFoundException';
import { NonExistedArtistException } from './exceptions/NonExistedArtistException';
import { AddArtistToFavoritesEvent } from './events/AddArtistToFavoritesEvent';
import { FavoriteArtistNotFoundException } from './exceptions/FavoriteArtistNotFoundException';
import { NonExistedAlbumException } from './exceptions/NonExistedAlbumException';
import { AddAlbumToFavoritesEvent } from './events/AddAlbumToFavoritesEvent';
import { FavoriteAlbumNotFoundException } from './exceptions/FavoriteAlbumNotFoundException';
import { GetEntityEvent } from '../common/events/GetEntityEvent';
import { EntityKey } from '../common/EntityKey';
import { EntityDeletedEvent } from '../common/events/EntityDeletedEvent';

@Injectable()
export class FavoritesService {
  constructor(
    private readonly favoritesRepository: FavoritesRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async getAllFavorites() {
    const favoriteIds = await this.favoritesRepository.findAll();
    const favorites = {};

    for (const key in favoriteIds) {
      await new Promise((resolve) => {
        const onEntity = (entities: unknown[]) => {
          const filteredEntities = entities.filter((ent) => !!ent);
          favorites[key] = filteredEntities;
          resolve(entities);
        };

        this.eventEmitter.emit(
          EventType.GET_ENTITY,
          new GetEntityEvent(key as EntityKey, favoriteIds[key], onEntity),
        );
      });
    }

    return favorites;
  }

  async addTrackToFavorites(trackId: string) {
    const favoriteTracks = await this.favoritesRepository.findByKey(
      EntityKey.TRACKS,
    );

    const favoriteTrack = favoriteTracks.find((track) => track === trackId);

    if (favoriteTrack) {
      return favoriteTrack;
    }

    return new Promise((resolve, reject) => {
      const onTrackExists = async (exists: boolean) => {
        if (!exists) {
          reject(new NonExistedTrackException(trackId));
        }

        await this.favoritesRepository.create(EntityKey.TRACKS, trackId);
        resolve(trackId);
      };

      this.eventEmitter.emit(
        EventType.ADD_TRACK_TO_FAVORITES,
        new AddTrackToFavoritesEvent(trackId, onTrackExists),
      );
    });
  }

  async removeTrackFromFavorites(trackId: string) {
    const track = await this.favoritesRepository.delete(
      EntityKey.TRACKS,
      trackId,
    );

    if (!track) {
      throw new FavoriteTrackNotFoundException(trackId);
    }
  }

  async addArtistToFavorites(artistId: string) {
    const favoriteArtists = await this.favoritesRepository.findByKey(
      EntityKey.ARTISTS,
    );

    const isArtistIsFavorite = favoriteArtists.includes(artistId);

    if (isArtistIsFavorite) {
      return artistId;
    }

    return new Promise((resolve, reject) => {
      const onArtistExists = async (exists: boolean) => {
        if (!exists) {
          reject(new NonExistedArtistException(artistId));
        }

        await this.favoritesRepository.create(EntityKey.ARTISTS, artistId);
        resolve(artistId);
      };

      this.eventEmitter.emit(
        EventType.ADD_ARTIST_TO_FAVORITES,
        new AddArtistToFavoritesEvent(artistId, onArtistExists),
      );
    });
  }

  async removeArtistFromFavorites(artistId: string) {
    const artist = await this.favoritesRepository.delete(
      EntityKey.ARTISTS,
      artistId,
    );

    if (!artist) {
      throw new FavoriteArtistNotFoundException(artistId);
    }
  }

  async addAlbumToFavorites(albumId: string) {
    const favoriteAlbums = await this.favoritesRepository.findByKey(
      EntityKey.ALBUMS,
    );

    const isAlbumInFavorite = favoriteAlbums.includes(albumId);

    if (isAlbumInFavorite) {
      return albumId;
    }

    return new Promise((resolve, reject) => {
      const onAlbumExists = async (exists: boolean) => {
        if (!exists) {
          reject(new NonExistedAlbumException(albumId));
        }

        await this.favoritesRepository.create(EntityKey.ALBUMS, albumId);
        resolve(albumId);
      };

      this.eventEmitter.emit(
        EventType.ADD_ALBUM_TO_FAVORITES,
        new AddAlbumToFavoritesEvent(albumId, onAlbumExists),
      );
    });
  }

  async removeAlbumFromFavorites(albumId: string) {
    const album = await this.favoritesRepository.delete(
      EntityKey.ALBUMS,
      albumId,
    );

    if (!album) {
      throw new FavoriteAlbumNotFoundException(albumId);
    }
  }

  @OnEvent(EventType.ENTITY_DELETED)
  async handleRemoveEntityFromFavorites(event: EntityDeletedEvent) {
    const { key, id } = event;

    await this.favoritesRepository.delete(key, id);
  }
}
