import { IsNotEmpty, IsString } from 'class-validator';
import { CreateUser } from '../user.types';

export class CreateUserDTO implements CreateUser {
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name is required' })
  login: string;

  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Password is required' })
  password: string;
}
