import { IsNotEmpty, IsString } from 'class-validator';
import { CreateUser } from '../users.types';

export class CreateUserDTO implements CreateUser {
  @IsString({ message: 'Login must be a string' })
  @IsNotEmpty({ message: 'Login is required' })
  login: string;

  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Password is required' })
  password: string;
}
