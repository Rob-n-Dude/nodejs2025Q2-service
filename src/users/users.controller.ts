import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/CreateUserDTO';
import { UpdatePasswordDTO } from './dto/UpdatePasswordDTO';
import { IdDTO } from '../common/dto/IdDTO';

@Controller('user')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async getAll() {
    return await this.userService.getAllUsers();
  }

  @Get(':id')
  async getById(@Param() { id }: IdDTO) {
    return await this.userService.getUserById(id);
  }

  @Post()
  async createUser(@Body() userData: CreateUserDTO) {
    return await this.userService.createUser(userData);
  }

  @Put(':id')
  async updateUserPassword(
    @Param() { id }: IdDTO,
    @Body() userData: UpdatePasswordDTO,
  ) {
    return await this.userService.updateUserPassword(id, userData);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUser(@Param() { id }: IdDTO) {
    return await this.userService.deleteUser(id);
  }
}
