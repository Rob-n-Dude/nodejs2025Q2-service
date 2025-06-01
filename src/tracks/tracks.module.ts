import { Module } from '@nestjs/common';
import { TracksController } from './tracks.controller';
import { TracksService } from './tracks.service';
import { TracksRepository } from './tracks.repository';

@Module({
  imports: [],
  controllers: [TracksController],
  providers: [TracksService, TracksRepository],
})
export class TracksModule {}
