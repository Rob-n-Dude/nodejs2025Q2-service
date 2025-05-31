import { User } from '../users.types';
import { Exclude } from 'class-transformer';

export class UserResponseDTO implements User {
  id: string;
  login: string;
  createdAt: number;
  updatedAt: number;
  version: number;

  @Exclude()
  password: string;
}
