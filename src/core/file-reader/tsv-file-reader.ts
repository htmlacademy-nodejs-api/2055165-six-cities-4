import { readFileSync } from 'node:fs';
import { FileReaderInterface } from './file-reader.interface.js';
import { RentOffer } from '../../types/rent-offer.type.js';
import { User } from '../../types/user.type.js';
import { Location } from '../../types/location.type.js';
import { Good } from '../../types/goods.type.js';
import { City } from '../../types/city.type.js';
import { OfferType } from '../../types/offer-type.type.js';

export default class TSVFileReader implements FileReaderInterface {
  private rawData = '';

  constructor(public filename: string) { }

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf8' });
  }

  public toArray(): RentOffer[] {
    if (!this.rawData) {
      return [];
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim() !== '')
      .map((line) => line.split('\t'))
      .map((offer) => {
        const [
          city,
          previewImage,
          images,
          title,
          offerDate,
          isPremium,
          isFavorite,
          rating,
          type,
          bedrooms,
          maxAdults,
          price,
          goods,
          name,
          email,
          proStatus,
          avatarImage,
          description,
          latitude,
          longitude
        ] = offer;

        const offerImages: string[] = images.split(';');
        const offerGoods = goods.split(';') as Good[];
        const location: Location = {
          latitude: Number.parseFloat(latitude),
          longitude: Number.parseFloat(longitude),
        };
        const advertiser: User = {
          username: name,
          email,
          avatarPath: avatarImage,
          isPro: proStatus === 'true'
        };

        return {
          title,
          description,
          offerDate,
          city: city as City,
          previewImage,
          images: offerImages,
          isPremium: isPremium === 'true',
          isFavorite: isFavorite === 'true',
          rating: Number.parseFloat(rating),
          type: type as OfferType,
          bedrooms: Number.parseInt(bedrooms, 10),
          maxAdults: Number.parseInt(maxAdults, 10),
          price: Number.parseInt(price, 10),
          goods: offerGoods,
          advertiser,
          location
        };
      });
  }
}
