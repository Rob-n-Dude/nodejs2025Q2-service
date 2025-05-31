import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDTO } from './dto/CreateUserDTO';
import { randomUUID } from 'node:crypto';
import { User } from './user.types';
import { plainToInstance } from 'class-transformer';
import { UserResponseDTO } from './dto/UserResponseDTO';
import { UpdatePasswordDTO } from './dto/UpdatePasswordDTO';
import { UserNotFoundException } from './exceptions/UserNotFoundException';
import { IncorrectOldPasswordException } from './exceptions/IncorrectOldPasswordException';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getAllUsers() {
    const users = await this.userRepository.findAll();
    return plainToInstance(UserResponseDTO, users);
  }

  async getUserById(id: string) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      return new UserNotFoundException(id);
    }

    return plainToInstance(UserResponseDTO, user);
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

    const createdUser = await this.userRepository.create(user);

    return plainToInstance(UserResponseDTO, createdUser);
  }

  async updateUserPassword(id: string, userData: UpdatePasswordDTO) {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new UserNotFoundException(id);
    }

    const arePasswordsEqual = user.password === userData.oldPassword;

    if (!arePasswordsEqual) {
      throw new IncorrectOldPasswordException();
    }

    const updatedUser = await this.userRepository.update(id, {
      password: userData.newPassword,
      updatedAt: Date.now(),
      version: user.version + 1,
    });

    if (!updatedUser) {
      throw new UserNotFoundException(id);
    }

    return plainToInstance(UserResponseDTO, updatedUser);
  }
}
