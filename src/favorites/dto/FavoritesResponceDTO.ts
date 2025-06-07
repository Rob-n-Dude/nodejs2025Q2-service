import { Album } from 'src/albums/albums.types';
import { Artist } from 'src/artists/artists.types';
import { Track } from 'src/tracks/tracks.types';

export class FavoritesResponseDTO {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
