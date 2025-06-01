import { HttpException, HttpStatus } from '@nestjs/common';

export class NonExistedTrackException extends HttpException {
  constructor(id: string) {
    super(
      `Track with id: ${id} is not exist in the system`,
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }
}
