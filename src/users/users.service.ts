import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateUserDto } from './dtos/update-user.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { MongoIdDto } from './dtos/mongo-id.dto';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { CustomI18nService } from './custom-i18n.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly i18n: I18nService,
    @Inject(CustomI18nService) private customI18nService: CustomI18nService,
  ) {}

  async findUsers(): Promise<User[]> {
    const users = await this.userModel.find();
    const localized = this.userModel.schema.methods.toObjectLocalizedOnly(
      users,
      I18nContext.current().lang,
    );
    if (!localized) {
      throw new NotFoundException(
        this.customI18nService.translate('error.NOT_FOUND'),
      );
    }
    return localized;
  }

  async findUserById(id: MongoIdDto): Promise<User> {
    const user = await this.userModel.findById(id);
     const localized = this.userModel.schema.methods.toObjectLocalizedOnly(
       user,
       I18nContext.current().lang,
     );
    if (!localized) {
      // throw new NotFoundException(`Not found user ${id}`);
      throw new NotFoundException(
        this.customI18nService.translate('error.NOT_FOUND_ONE', {
          args: { id },
        }),
      );
    }
    return localized;
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const createUser = await this.userModel.create(createUserDto);
    return createUser;
  }

  async updateUser(id, updateUserDto: UpdateUserDto): Promise<User> {
    const updatedUser = await this.userModel.findByIdAndUpdate(
      id,
      updateUserDto,
      { new: true },
    );
    if (!updatedUser) {
      throw new NotFoundException(
        this.customI18nService.translate('error.NOT_FOUND_ONE', {
          args: { id },
        }),
      );
    }

    return updatedUser;
  }

  async deleteUser(id: string): Promise<void> {
    const deletedUser = await this.userModel.findByIdAndDelete(id);
    if (!deletedUser) {
      throw new NotFoundException(
        this.customI18nService.translate('error.NOT_FOUND_ONE', {
          args: { id },
        }),
      );
    }
  }
}
