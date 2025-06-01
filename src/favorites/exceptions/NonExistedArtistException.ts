import { HttpException, HttpStatus } from '@nestjs/common';

export class NonExistedArtistException extends HttpException {
  constructor(id: string) {
    super(
      `Artist with id: ${id} is not exist`,
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }
}
