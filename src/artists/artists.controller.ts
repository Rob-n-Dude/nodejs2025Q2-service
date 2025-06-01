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
import { IdDTO } from 'src/common/dto/IdDTO';
import { CreateArtistDTO } from './dto/CreateArtistDTO';
import { UpdateArtistDTO } from './dto/UpdateArtistDTO';
import { ArtistsService } from './artists.service';

@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Get()
  async getAll() {
    return await this.artistsService.getAllArtists();
  }

  @Get(':id')
  async getArtistById(@Param() { id }: IdDTO) {
    return await this.artistsService.getArtistById(id);
  }

  @Post()
  async createArtist(@Body() artistData: CreateArtistDTO) {
    return await this.artistsService.createArtist(artistData);
  }

  @Put(':id')
  async updateArtist(
    @Param() { id }: IdDTO,
    @Body() artistData: UpdateArtistDTO,
  ) {
    return await this.artistsService.updateArtist(id, artistData);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteArtist(@Param() { id }: IdDTO) {
    return await this.artistsService.deleteArtist(id);
  }
}
