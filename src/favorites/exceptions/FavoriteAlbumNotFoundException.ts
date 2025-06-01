import { HttpException, HttpStatus } from '@nestjs/common';

export class FavoriteAlbumNotFoundException extends HttpException {
  constructor(private readonly id: string) {
    super(`Album with id: ${id} is not favorite`, HttpStatus.NOT_FOUND);
  }
}
