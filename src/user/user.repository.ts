import { Injectable } from '@nestjs/common';
import { User } from './user.types';
import { Repository } from 'src/common/repository';

@Injectable()
export class UserRepository implements Repository<User> {
  private users: Record<string, User> = {};

  async findById(id: string): Promise<User | null> {
    return this.users[id] || null;
  }

  async findAll(): Promise<User[]> {
    return Object.values(this.users);
  }

  async create(user: User): Promise<User> {
    return new Promise((resolve) => {
      this.users[user.id] = user;

      resolve(user);
    });
  }

  async update(id: string, userData: Partial<User>): Promise<User | null> {
    const userToUpdate = await this.findById(id);

    if (!userToUpdate) {
      return null;
    }

    const updatedUser = { ...userToUpdate, ...userData };
    this.users[id] = updatedUser;
    return updatedUser;
  }

  async delete(id: string): Promise<boolean> {
    const userToDelete = await this.findById(id);

    if (!userToDelete) {
      return false;
    }

    delete this.users[id];
    return true;
  }
}
