import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ApplicationException, ExceptionMapper } from 'src/core/application';
import { DomainException } from 'src/core/domain';
import { UserNotFoundException } from 'src/users/application/exceptions/user-not-found';

@Injectable()
export class UserExceptionMapper implements ExceptionMapper {
  toHttp(exception: DomainException | ApplicationException): Error {
    if (exception instanceof UserNotFoundException) {
      return new NotFoundException(exception.message);
    }
    if (exception instanceof DomainException) {
      return new BadRequestException(
        `Domain error(${exception.name}): ${exception.message}`,
      );
    }
    return new InternalServerErrorException(exception.message);
  }
}
