import { IsUUID } from 'class-validator';

export class UserIdDTO {
  @IsUUID()
  id: string;
}
