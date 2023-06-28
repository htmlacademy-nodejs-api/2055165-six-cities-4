import {ArrayMinSize, ArrayUnique, IsArray, IsBoolean, IsDateString, IsEnum, IsInt, IsLatitude, IsLongitude, IsOptional, Max, MaxLength, Min, MinLength } from 'class-validator';

import { Goods } from '../../../types/goods.type.js';
import { OfferType } from '../../../types/offer-type.type.js';
import { CityName } from '../../../types/city.type.js';

const MIN_TITLE_LENGTH = 10;
const MAX_TITLE_LENGTH = 100;

const MIN_DESCRIPTION_LENGTH = 20;
const MAX_DESCRIPTION_LENGTH = 1024;

const MIN_BEDROOMS_COUNT = 1;
const MAX_BEDROOMS_COUNT = 8;

const MIN_MAXADULTS_COUNT = 1;
const MAX_MAXADULTS_COUNT = 10;

const MIN_PRICE = 100;
const MAX_PRICE = 100_000;

const MIN_GOODS_COUNT = 1;


export default class CreateRentOfferDTO {
  @MinLength(MIN_TITLE_LENGTH, {message: `Minimum title length must be ${MIN_TITLE_LENGTH} chars`})
  @MaxLength(MAX_TITLE_LENGTH, {message: `Maximum title length must be ${MAX_TITLE_LENGTH} chars`})
  public title!: string;

  @MinLength(MIN_DESCRIPTION_LENGTH, {message: `Minimum description length must be ${MIN_DESCRIPTION_LENGTH} chars`})
  @MaxLength(MAX_DESCRIPTION_LENGTH, {message: `Maximum description length must be ${MAX_DESCRIPTION_LENGTH} chars`})
  public description!: string;

  @IsOptional()
  @IsDateString({}, {message: 'offerDate must be valid ISO date'})
  public offerDate?: Date;

  @IsEnum(CityName, {message: `city must be only one of the following: ${Object.values(CityName).join(', ')}`})
  public city!: CityName;

  @IsBoolean({message: '"isPremium" field must be a boolean'})
  public isPremium!: boolean;

  @IsEnum(OfferType, {message: `offer type must be only one of the following: ${Object.values(OfferType).join(', ')}`})
  public type!: OfferType;

  @IsInt({message: 'bedrooms count must be an integer value'})
  @Min(MIN_BEDROOMS_COUNT, {message: `bedrooms min count is ${MIN_BEDROOMS_COUNT}`})
  @Max(MAX_BEDROOMS_COUNT, {message: `bedrooms max count is ${MAX_BEDROOMS_COUNT}`})
  public bedrooms!: number;

  @IsInt({message: 'maxAdults count must be an integer value'})
  @Min(MIN_MAXADULTS_COUNT, {message: `maxAdults min count is ${MIN_MAXADULTS_COUNT}`})
  @Max(MAX_MAXADULTS_COUNT, {message: `maxAdults max count is ${MAX_MAXADULTS_COUNT}`})
  public maxAdults!: number;

  @IsInt({message: 'price must be an integer value'})
  @Min(MIN_PRICE, {message: `price min count is ${MIN_PRICE}`})
  @Max(MAX_PRICE, {message: `price min count is ${MAX_PRICE}`})
  public price!: number;

  @IsArray({message: 'field "goods" must be an array'})
  @IsEnum(Goods, {each: true, message: `each item in "goods" array must be one of the following: ${Object.values(Goods).join(', ')}`})
  @ArrayUnique({message: 'all items in "goods" array must be unique'})
  @ArrayMinSize(MIN_GOODS_COUNT, {message: `field "goods" must contain ${MIN_GOODS_COUNT} items count`})
  public goods!: Goods[];

  public advertiserId!: string;

  @IsLatitude({message: 'latitude must have a correct lat. coordinate format'})
  public latitude!: number;

  @IsLongitude({message: 'longitude must have a correct long. coordinate format'})
  public longitude!: number;
}
