import { HttpException, HttpStatus } from '@nestjs/common';

export class FavoriteTrackNotFoundException extends HttpException {
  constructor(id: string) {
    super(`Track with id: ${id} is not favorite`, HttpStatus.NOT_FOUND);
  }
}
