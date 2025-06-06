import { EntityKey } from '../common/EntityKey';

type FavoritesRepositoryInterface = Record<EntityKey, string[]>;

export class FavoritesRepository {
  private favorites: FavoritesRepositoryInterface = {
    [EntityKey.ARTISTS]: [],
    [EntityKey.ALBUMS]: [],
    [EntityKey.TRACKS]: [],
  };

  async findAll(): Promise<Record<string, string[]>> {
    return Promise.resolve(this.favorites);
  }

  async findByKey(key: EntityKey): Promise<string[]> {
    return new Promise((resolve) => {
      resolve(this.favorites[key]);
    });
  }

  async create(key: EntityKey, id: string): Promise<string[]> {
    return new Promise((resolve) => {
      this.favorites[key].push(id);
      resolve(this.favorites[key]);
    });
  }

  async delete(key: EntityKey, id: string): Promise<boolean> {
    const itemToDelete = this.favorites[key].indexOf(id);

    if (itemToDelete === -1) {
      return false;
    }

    return new Promise((resolve) => {
      this.favorites[key].splice(itemToDelete, 1);
      resolve(true);
    });
  }
}
