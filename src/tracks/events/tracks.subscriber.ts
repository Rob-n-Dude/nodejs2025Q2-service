import {
  EventSubscriber,
  EntitySubscriberInterface,
  RemoveEvent,
  DataSource,
} from 'typeorm';
import { Track } from '../tracks.entity';
import { Favorite } from '../../favorites/favorites.entity';

@EventSubscriber()
export class TracksSubscriber implements EntitySubscriberInterface<Track> {
  constructor(private readonly dataSource: DataSource) {
    this.dataSource.subscribers.push(this);
  }

  listenTo() {
    return Track;
  }

  async afterRemove(event: RemoveEvent<Track>): Promise<void> {
    const favoriteRepository = event.manager.getRepository(Favorite);

    const favorites = await favoriteRepository.find({
      relations: {
        tracks: true,
      },
    });

    for (const favorite of favorites) {
      favorite.tracks = favorite.tracks || [];
      favorite.tracks = favorite.tracks.filter(
        (track) => track.id !== event.entity.id,
      );
      await favoriteRepository.save(favorite);
    }
  }
}
