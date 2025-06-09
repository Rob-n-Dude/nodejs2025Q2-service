import { Injectable } from '@nestjs/common';
import { User } from './users.types';
import { Repository } from '../common/repository';
import { InjectRepository } from '@nestjs/typeorm';
import { User as UserEntity } from './users.entity';
import { Repository as OrmRepo } from 'typeorm';

@Injectable()
export class UsersRepository implements Repository<User> {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: OrmRepo<UserEntity>,
  ) {}

  async findById(id: string): Promise<User | void> {
    return this.userRepository.findOne({ where: { id } });
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async create(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  async update(id: string, userData: Partial<User>): Promise<User | null> {
    const userToUpdate = await this.findById(id);

    if (!userToUpdate) {
      return null;
    }

    const updatedUser = { ...userToUpdate, ...userData };

    return this.userRepository.save(updatedUser);
  }

  async delete(id: string): Promise<boolean> {
    const userToDelete = await this.findById(id);

    if (!userToDelete) {
      return false;
    }

    const result = await this.userRepository.delete(id);

    return result.affected > 0;
  }
}
