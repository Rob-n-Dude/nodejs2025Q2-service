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
import { AlbumsService } from './albums.service';
import { IdDTO } from '../common/dto/IdDTO';
import { CreateAlbumDTO } from './dto/CreateAlbumDTO';

@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Get()
  async getAll() {
    return await this.albumsService.getAllAlbums();
  }

  @Get(':id')
  async getById(@Param() { id }: IdDTO) {
    return await this.albumsService.getAlbumById(id);
  }

  @Post()
  async createAlbum(@Body() albumData: CreateAlbumDTO) {
    return await this.albumsService.createAlbum(albumData);
  }

  @Put(':id')
  async updateAlbum(@Param() { id }: IdDTO, @Body() albumData: CreateAlbumDTO) {
    return await this.albumsService.updateAlbum(id, albumData);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAlbum(@Param() { id }: IdDTO) {
    return await this.albumsService.deleteAlbum(id);
  }
}
