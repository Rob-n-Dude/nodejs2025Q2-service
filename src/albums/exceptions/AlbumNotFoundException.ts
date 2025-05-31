import { HttpException, HttpStatus } from '@nestjs/common';

export class AlbumNotFoundException extends HttpException {
  constructor(id: string) {
    super(`Album with ID ${id} not found`, HttpStatus.NOT_FOUND);
  }
}
