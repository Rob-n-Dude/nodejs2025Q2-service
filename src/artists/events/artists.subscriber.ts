import {
  EventSubscriber,
  EntitySubscriberInterface,
  RemoveEvent,
  DataSource,
} from 'typeorm';
import { Artist } from '../artists.entity';
import { Favorite } from '../../favorites/favorites.entity';

@EventSubscriber()
export class ArtistsSubscriber implements EntitySubscriberInterface<Artist> {
  constructor(private readonly dataSource: DataSource) {
    this.dataSource.subscribers.push(this);
  }

  listenTo() {
    return Artist;
  }

  async afterRemove(event: RemoveEvent<Artist>): Promise<void> {
    const favoriteRepository = event.manager.getRepository(Favorite);

    const favorites = await favoriteRepository.find({
      relations: {
        artists: true,
      },
    });

    for (const favorite of favorites) {
      favorite.artists = favorite.artists || [];
      favorite.artists = favorite.artists.filter(
        (artist) => artist.id !== event.entity.id,
      );
      await favoriteRepository.save(favorite);
    }
  }
}
