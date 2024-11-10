import { UsersController } from './usersController';
import { UserService } from './users.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { setupUserSchema, User, UserSchema } from './schemas/user.schema';
import { CustomI18nService } from './custom-i18n.service';
import * as mongooseI18n from 'mongoose-i18n-localize';
import { I18nService } from 'nestjs-i18n';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        inject: [I18nService],
        useFactory: async (i18nService: I18nService) => {
          const customI18nService = new CustomI18nService(i18nService);

          const schema = UserSchema;
          schema.plugin(mongooseI18n, {
            locales: ['en', 'ar'],
            defaultLocale: 'en',
            autoUpdate: true,
            useCurrentLocale: true,
          });

          // Set up custom schema post-save behavior
          setupUserSchema(customI18nService);
          return schema;
        },
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UserService, CustomI18nService],
})
export class UsersModule {}
