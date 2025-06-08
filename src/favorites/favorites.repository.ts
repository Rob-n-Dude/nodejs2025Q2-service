import { EntityKey } from '../common/EntityKey';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Favorite } from './favorites.entity';
import { Album } from '../albums/albums.entity';
import { Artist } from '../artists/artists.entity';
import { Track } from '../tracks/tracks.entity';

type FavoriteUnion = Album & Artist & Track;
type OneOfFavorites = Album | Artist | Track;
type FavoritesRepositoryInterface = Record<EntityKey, OneOfFavorites[]>;

export class FavoritesRepository {
  constructor(
    @InjectRepository(Favorite)
    private readonly favoriteRepository: Repository<Favorite>,
  ) {}

  private async createEmptyFavorites(): Promise<FavoritesRepositoryInterface> {
    const emptyFavorites: FavoritesRepositoryInterface = {
      [EntityKey.ARTISTS]: [],
      [EntityKey.ALBUMS]: [],
      [EntityKey.TRACKS]: [],
    };

    const favoriteEntity = this.favoriteRepository.create();
    await this.favoriteRepository.save(favoriteEntity);
    return emptyFavorites;
  }

  private async getFavorites(): Promise<FavoritesRepositoryInterface> {
    const favorites = await this.favoriteRepository.find({
      relations: {
        [EntityKey.ARTISTS]: true,
        [EntityKey.ALBUMS]: true,
        [EntityKey.TRACKS]: true,
      },
    });

    const favorite = favorites[0];

    if (!favorite) {
      return this.createEmptyFavorites();
    }

    return {
      [EntityKey.ARTISTS]: favorite[EntityKey.ARTISTS],
      [EntityKey.ALBUMS]: favorite[EntityKey.ALBUMS],
      [EntityKey.TRACKS]: favorite[EntityKey.TRACKS],
    };
  }

  async findAll(): Promise<Record<string, OneOfFavorites[]>> {
    return await this.getFavorites();
  }

  async findByKey(key: EntityKey): Promise<OneOfFavorites[]> {
    const favorites = await this.getFavorites();

    return favorites[key];
  }

  async create(key: EntityKey, id: string): Promise<string[]> {
    const favorites = await this.favoriteRepository.find({
      relations: {
        [key]: true,
      },
    });

    const favorite = favorites[0];

    if (!favorite) {
      await this.createEmptyFavorites();
      return this.create(key, id);
    }

    const exists = favorite[key].some((item) => item.id === id);

    if (exists) {
      return favorite[key].map((item) => item.id);
    }

    const entity = { id } as FavoriteUnion;

    favorite[key].push(entity);

    await this.favoriteRepository.save(favorite);
    return favorite[key].map((item) => item.id);
  }

  async delete(key: EntityKey, id: string): Promise<boolean> {
    const favorites = await this.favoriteRepository.find({
      relations: {
        [key]: true,
      },
    });

    const favorite = favorites[0];

    if (!favorite) {
      return false;
    }

    const index = favorite[key].findIndex((entity) => entity.id === id);

    if (index === -1) {
      return false;
    }

    favorite[key].splice(index, 1);
    await this.favoriteRepository.save(favorite);

    return true;
  }
}
