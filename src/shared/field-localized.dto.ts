import { IsString, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';
import { i18nValidationMessage } from 'nestjs-i18n';

export class FieldLocalizedDto {
  @IsNotEmpty()
  @IsString({ message: i18nValidationMessage('validation.STR') })
  @Transform(({ value }) => value.toString().trim())
  ar: string;

  @IsNotEmpty()
  @IsString({ message: i18nValidationMessage('validation.STR') })
  @Transform(({ value }) => value.toString().trim())
  en: string;
}
