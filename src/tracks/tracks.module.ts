import { Module } from '@nestjs/common';
import { TracksController } from './tracks.controller';
import { TracksService } from './tracks.service';
import { TracksRepository } from './tracks.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Track } from './tracks.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Track])],
  controllers: [TracksController],
  providers: [TracksService, TracksRepository],
})
export class TracksModule {}
