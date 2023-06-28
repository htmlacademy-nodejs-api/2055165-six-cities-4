import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

const MIN_PASSWORD_LENGTH = 6;
const MAX_PASSWORD_LENGTH = 12;

export default class AuthUserDTO {
  @IsEmail({}, {message: 'email must be valid'})
  public email!: string;

  @IsString({message: 'password is required'})
  @MinLength(MIN_PASSWORD_LENGTH, {message: `Min length for password is ${MIN_PASSWORD_LENGTH} chars`})
  @MaxLength(MAX_PASSWORD_LENGTH, {message: `Max length for password is ${MAX_PASSWORD_LENGTH} chars`})
  public password!: string;
}
