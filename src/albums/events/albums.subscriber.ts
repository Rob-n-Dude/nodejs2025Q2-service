import {
  EventSubscriber,
  EntitySubscriberInterface,
  RemoveEvent,
  DataSource,
} from 'typeorm';
import { Album } from '../albums.entity';
import { Favorite } from '../../favorites/favorites.entity';

@EventSubscriber()
export class AlbumsSubscriber implements EntitySubscriberInterface<Album> {
  constructor(private readonly dataSource: DataSource) {
    this.dataSource.subscribers.push(this);
  }

  listenTo() {
    return Album;
  }

  async afterRemove(event: RemoveEvent<Album>): Promise<void> {
    const favoriteRepository = event.manager.getRepository(Favorite);

    const favorites = await favoriteRepository.find({
      relations: {
        albums: true,
      },
    });

    for (const favorite of favorites) {
      favorite.albums = favorite.albums || [];
      favorite.albums = favorite.albums.filter(
        (album) => album.id !== event.entity.id,
      );
      await favoriteRepository.save(favorite);
    }
  }
}
