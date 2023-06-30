import { CityName, Goods, OfferType } from './rent-offer.constants';


export default class CreateRentOfferDTO {
  public title!: string;

  public description!: string;

  public offerDate?: Date;

  public city!: CityName;

  public isPremium!: boolean;

  public type!: OfferType;

  public bedrooms!: number;

  public maxAdults!: number;

  public price!: number;

  public goods!: Goods[];

  public latitude!: number;

  public longitude!: number;
}