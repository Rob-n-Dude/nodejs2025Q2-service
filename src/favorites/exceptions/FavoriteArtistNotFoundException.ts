import { HttpException, HttpStatus } from '@nestjs/common';

export class FavoriteArtistNotFoundException extends HttpException {
  constructor(private readonly id: string) {
    super(`Artist with id: ${id} is not favorite`, HttpStatus.NOT_FOUND);
  }
}
