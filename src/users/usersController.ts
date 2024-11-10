import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseFilters,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserService } from './users.service';
import { User } from './schemas/user.schema';
import { ParseMongoIdPipe } from '../mongo/pipes/parse-mongo-id.pipe';
import { CustomI18nValidationExceptionFilter } from '../common/filters/i18.filter';

@Controller('users')
@UseFilters(new CustomI18nValidationExceptionFilter())
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async find(): Promise<User[]> {
    return this.userService.findUsers();
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseMongoIdPipe)
    id,
  ): Promise<User> {
    return this.userService.findUserById(id);
  }

  @Post()
  // @UseFilters(new I18nValidationExceptionFilter())
  async create(
    @Body()
    createUserDto: CreateUserDto,
  ): Promise<User> {
    return this.userService.createUser(createUserDto);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseMongoIdPipe) id,
    @Body()
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseMongoIdPipe) id: string): Promise<void> {
    await this.userService.deleteUser(id);
  }
}
