import { Module } from '@nestjs/common';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';
import { FavoritesRepository } from './favorites.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favorite } from './favorites.entity';
import { AlbumsModule } from '../albums/albums.module';
import { TracksModule } from '../tracks/tracks.module';
import { ArtistsModule } from '../artists/artists.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Favorite]),
    AlbumsModule,
    TracksModule,
    ArtistsModule,
  ],
  controllers: [FavoritesController],
  providers: [FavoritesService, FavoritesRepository],
})
export class FavoritesModule {}
