import { Type } from 'class-transformer';
import { IsDefined, IsEmail, IsString, Length, ValidateNested } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { FieldLocalizedDto } from '../../shared/field-localized.dto';

export class CreateUserDto {
  @IsString()
  @Length(3, 20, {
    // message: 'incorrect email'
    message: i18nValidationMessage('validation.NAME'),
  })
  readonly username: string;

  @IsEmail(
    {},
    {
      // message: 'incorrect email'
      message: i18nValidationMessage('validation.EMAIL_NOT_FORMATTED'),
    },
  )
  readonly email: string;

  // @IsString()
  @IsDefined()
  @Type(() => FieldLocalizedDto)
  @ValidateNested()
  readonly country: FieldLocalizedDto;

  @IsString({
    message: i18nValidationMessage('validation.STR'),
  })
  readonly password: string;
}
