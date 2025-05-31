import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { UserIdDTO } from './dto/UserIdDTO';
import { CreateUserDTO } from './dto/CreateUserDTO';
import { UpdatePasswordDTO } from './dto/UpdatePasswordDTO';

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
    return await this.userService.createUser(userData);
  }

  @Put(':id')
  async updateUserPassword(
    @Param() { id }: UserIdDTO,
    @Body() userData: UpdatePasswordDTO,
  ) {
    return await this.userService.updateUserPassword(id, userData);
  }
}
