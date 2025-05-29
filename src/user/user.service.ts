import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDTO } from './dto/createUserDTO';
import { randomUUID } from 'node:crypto';
import { User } from './user.types';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getAllUsers() {
    return await this.userRepository.findAll();
  }

  async getUserById(id: string) {
    return await this.userRepository.findById(id);
  }

  async createUser(userData: CreateUserDTO) {
    const id = randomUUID();

    const createdAt = Date.now();
    const version = 1;

    const user = {
      ...userData,
      id,
      createdAt,
      version,
      updatedAt: createdAt,
    } as User;

    return await this.userRepository.create(user);
  }
}
