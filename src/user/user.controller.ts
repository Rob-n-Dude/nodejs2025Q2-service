import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserIdDTO } from './dto/userIdDTO';
import { CreateUserDTO } from './dto/createUserDTO';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAll() {
    return await this.userService.getAllUsers();
  }

  @Get(':id')
  async getById(@Param() { id }: UserIdDTO) {
    return await this.userService.getUserById(id);
  }

  @Post()
  async createUser(@Body() userData: CreateUserDTO) {
    console.log(userData);
    return await this.userService.createUser(userData);
  }
}
