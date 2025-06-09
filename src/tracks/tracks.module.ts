import { Module } from '@nestjs/common';
import { TracksController } from './tracks.controller';
import { TracksService } from './tracks.service';
import { TracksRepository } from './tracks.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Track } from './tracks.entity';
import { TracksSubscriber } from './events/tracks.subscriber';

@Module({
  imports: [TypeOrmModule.forFeature([Track])],
  controllers: [TracksController],
  providers: [TracksService, TracksRepository, TracksSubscriber],
  exports: [TracksService],
})
export class TracksModule {}
