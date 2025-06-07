import { EntityKey } from '../common/EntityKey';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Favorite } from './favorites.entity';

type FavoritesRepositoryInterface = Record<EntityKey, string[]>;

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

    const favoriteEntity = this.favoriteRepository.create(emptyFavorites);
    return this.favoriteRepository.save(favoriteEntity);
  }

  private async getFavorites(): Promise<FavoritesRepositoryInterface> {
    const favorites = await this.favoriteRepository.find();

    const favorite = favorites[0];

    if (!favorite) {
      return this.createEmptyFavorites();
    }

    return {
      [EntityKey.ARTISTS]: favorite.artists,
      [EntityKey.ALBUMS]: favorite.albums,
      [EntityKey.TRACKS]: favorite.tracks,
    };
  }

  async findAll(): Promise<Record<string, string[]>> {
    return this.getFavorites();
  }

  async findByKey(key: EntityKey): Promise<string[]> {
    const favorites = await this.getFavorites();

    return favorites[key];
  }

  async create(key: EntityKey, id: string): Promise<string[]> {
    const favorites = await this.getFavorites();

    favorites[key].push(id);

    await this.favoriteRepository.save(favorites);
    return favorites[key];
  }

  async delete(key: EntityKey, id: string): Promise<boolean> {
    const favorites = await this.getFavorites();
    const itemToDelete = favorites[key].indexOf(id);

    if (itemToDelete === -1) {
      return false;
    }

    favorites[key].splice(itemToDelete, 1);

    await this.favoriteRepository.save(favorites);
    return true;
  }
}
