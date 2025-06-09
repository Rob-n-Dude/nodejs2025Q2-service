import { EntityKey } from '../common/EntityKey';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';
import { Favorite } from './favorites.entity';

export class FavoritesRepository {
  constructor(
    @InjectRepository(Favorite)
    private readonly favoriteRepository: Repository<Favorite>,
  ) {}

  private async createEmptyFavorites(): Promise<Favorite> {
    const favoriteEntity = this.favoriteRepository.create();
    favoriteEntity.artists = [];
    favoriteEntity.albums = [];
    favoriteEntity.tracks = [];
    return await this.favoriteRepository.save(favoriteEntity);
  }

  private async getFavoritesEntity(): Promise<Favorite> {
    const favorites = await this.favoriteRepository.find({
      where: { id: Not(IsNull()) },
      relations: {
        artists: true,
        albums: true,
        tracks: true,
      },
    });

    const favorite = favorites[0];

    if (!favorite) {
      return this.createEmptyFavorites();
    }

    return favorite;
  }

  async findAll(): Promise<Record<string, any[]>> {
    const favorite = await this.getFavoritesEntity();

    return {
      [EntityKey.ARTISTS]: favorite.artists,
      [EntityKey.ALBUMS]: favorite.albums,
      [EntityKey.TRACKS]: favorite.tracks,
    };
  }

  async findByKey(key: EntityKey): Promise<any[]> {
    const favorite = await this.getFavoritesEntity();
    return favorite[key];
  }

  async create(key: EntityKey, entity: any): Promise<any[]> {
    const favorite = await this.getFavoritesEntity();

    if (!favorite[key].find((item) => item.id === entity.id)) {
      favorite[key].push(entity);
      await this.favoriteRepository.save(favorite);
    }

    return favorite[key];
  }

  async delete(key: EntityKey, entityId: string): Promise<boolean> {
    const favorite = await this.getFavoritesEntity();

    const index = favorite[key].findIndex((entity) => entity.id === entityId);

    if (index === -1) {
      return false;
    }

    favorite[key].splice(index, 1);
    await this.favoriteRepository.save(favorite);

    return true;
  }
}
