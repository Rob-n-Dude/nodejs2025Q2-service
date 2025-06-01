import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { TracksModule } from './tracks/tracks.module';
import { AlbumsModule } from './albums/albums.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ArtistsModule } from './artists/artists.module';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    UsersModule,
    TracksModule,
    AlbumsModule,
    ArtistsModule,
  ],
})
export class AppModule {}
