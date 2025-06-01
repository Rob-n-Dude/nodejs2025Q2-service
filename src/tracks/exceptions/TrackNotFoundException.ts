import { HttpException, HttpStatus } from '@nestjs/common';

export class TrackNotFoundException extends HttpException {
  constructor(id: string) {
    super(`Track with id ${id} not found`, HttpStatus.NOT_FOUND);
  }
}
