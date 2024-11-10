import { ConflictException } from '@nestjs/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { CustomI18nService } from '../custom-i18n.service';

@Schema()
export class User {
  @Prop({ unique: true })
  username: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  password: string;

  @Prop({
    i18n: true,
    required: true,
  })
  country: string;
}

export type UserDocument = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);

export function setupUserSchema(i18nService: CustomI18nService) {
  UserSchema.post('save', function (error, doc, next) {
    if (error.name === 'MongoServerError' && error.code === 11000) {
      if (error.keyValue.username || error.keyValue.email) {
        next(
          new ConflictException(i18nService.translate('error.DUPLICATE_DB')),
        );
      }
    } else {
      next(error);
    }
  });
  return UserSchema;
}
