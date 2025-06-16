import { HttpException, HttpStatus } from '@nestjs/common';

export class ArtistNotFoundException extends HttpException {
  constructor(id: string) {
    super(`Artist with id ${id} not found`, HttpStatus.NOT_FOUND);
  }
}
