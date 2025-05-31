import { HttpException, HttpStatus } from '@nestjs/common';

export class IncorrectOldPasswordException extends HttpException {
  constructor() {
    super('The provided old password is incorrect', HttpStatus.FORBIDDEN);
  }
}
