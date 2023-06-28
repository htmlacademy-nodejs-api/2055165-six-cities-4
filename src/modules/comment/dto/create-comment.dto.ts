import { IsInt, IsMongoId, Max, MaxLength, Min, MinLength } from 'class-validator';

const MIN_COMMENT_LENGTH = 5;
const MAX_COMMENT_LENGTH = 1024;

const MIN_RATING = 1;
const MAX_RATING = 5;

export default class CreateCommentDTO {

  @MinLength(MIN_COMMENT_LENGTH, {message: `Minimum comment length must be ${MIN_COMMENT_LENGTH} chars`})
  @MaxLength(MAX_COMMENT_LENGTH, {message: `Minimum comment length must be ${MAX_COMMENT_LENGTH} chars`})
  public text!: string;

  @IsInt({message: 'rating must be an integer'})
  @Min(MIN_RATING, {message: `rating min value is ${MIN_RATING}`})
  @Max(MAX_RATING, {message: `rating min value is ${MAX_RATING}`})
  public rating!: number;

  @IsMongoId({message: 'offerId field must be a valid id'})
  public offerId!: string;

  public authorId!: string;
}
