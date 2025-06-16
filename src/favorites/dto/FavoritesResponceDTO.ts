import { Album } from '../../albums/albums.types';
import { Artist } from '../../artists/artists.types';
import { Track } from '../../tracks/tracks.types';

export class FavoritesResponseDTO {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
