import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TracksService } from './tracks.service';
import { IdDTO } from '../common/dto/IdDTO';
import { CreateTrackDTO } from './dto/CreateTrackDTO';

@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Get()
  async getAll() {
    return await this.tracksService.getAllTracks();
  }

  @Get(':id')
  async getById(@Param() { id }: IdDTO) {
    return await this.tracksService.getTrackById(id);
  }

  @Post()
  async createTrack(@Body() trackData: CreateTrackDTO) {
    return await this.tracksService.createTrack(trackData);
  }

  @Put(':id')
  async updateTrack(@Param() { id }: IdDTO, @Body() trackData: CreateTrackDTO) {
    return await this.tracksService.updateTrack(id, trackData);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteTrack(@Param() { id }: IdDTO) {
    return await this.tracksService.deleteTrack(id);
  }
}
