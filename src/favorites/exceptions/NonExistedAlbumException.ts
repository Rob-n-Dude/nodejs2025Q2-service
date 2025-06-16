import { HttpException, HttpStatus } from '@nestjs/common';

export class NonExistedAlbumException extends HttpException {
  constructor(private readonly id: string) {
    super(
      `Album with id: ${id} is not exists`,
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }
}
