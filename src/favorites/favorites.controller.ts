import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { IdDTO } from 'src/common/dto/IdDTO';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoriteService: FavoritesService) {}

  @Get()
  async getAll() {
    return await this.favoriteService.getAllFavorites();
  }

  @Post('/track/:id')
  async addTrackToFavorites(@Param() { id }: IdDTO) {
    return await this.favoriteService.addTrackToFavorites(id);
  }

  @Post('/artist/:id')
  async addArtistToFavorites(@Param() { id }: IdDTO) {
    return await this.favoriteService.addArtistToFavorites(id);
  }

  @Post('/album/:id')
  async addAlbumToFavorites(@Param() { id }: IdDTO) {
    return await this.favoriteService.addAlbumToFavorites(id);
  }

  @Delete('/track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeTrackFromFavorites(@Param() { id }: IdDTO) {
    return await this.favoriteService.removeTrackFromFavorites(id);
  }

  @Delete('/artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeArtistFromFavorites(@Param() { id }: IdDTO) {
    return await this.favoriteService.removeArtistFromFavorites(id);
  }

  @Delete('/album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeAlbumFromFavorites(@Param() { id }: IdDTO) {
    return await this.favoriteService.removeAlbumFromFavorites(id);
  }
}
