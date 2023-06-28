import { IsEmail, IsEnum, IsString, MaxLength, MinLength } from 'class-validator';

import { UserStatus } from '../../../types/user-status.type.js';

const MIN_NAME_LENGTH = 1;
const MAX_NAME_LENGTH = 15;

const MIN_PASSWORD_LENGTH = 6;
const MAX_PASSWORD_LENGTH = 12;

export default class CreateUserDTO {
  @IsString({message: 'username is required'})
  @MinLength(MIN_NAME_LENGTH, {message: `Min length for username is ${MIN_NAME_LENGTH} char`})
  @MaxLength(MAX_NAME_LENGTH, {message: `Max length for username is ${MAX_NAME_LENGTH} chars`})
  public username!: string;

  @IsEmail({}, {message: 'email must be valid'})
  public email!: string;

  @IsString({message: 'password is required'})
  @MinLength(MIN_PASSWORD_LENGTH, {message: `Min length for password is ${MIN_PASSWORD_LENGTH} chars`})
  @MaxLength(MAX_PASSWORD_LENGTH, {message: `Max length for password is ${MAX_PASSWORD_LENGTH} chars`})
  public password!: string;

  @IsEnum(UserStatus, {message: `user status must be either ${UserStatus.Pro} or ${UserStatus.Default}`})
  public status!: UserStatus;
}
