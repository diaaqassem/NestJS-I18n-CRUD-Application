import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';

// validate that the input value is a valid mongo id and throw an error if it's not
export class ParseMongoIdPipe implements PipeTransform<string, string> {
  transform(value: string, metadata: ArgumentMetadata): string {
    // validate that value is a valid mongo id
    const isValidMongoId = /^[a-f\d]{24}$/i.test(value);
    if (!isValidMongoId) {
      throw new BadRequestException(`${value} is not a valid mongo id`);
    }
    return value;
  }
}
