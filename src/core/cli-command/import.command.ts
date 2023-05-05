import TSVFileReader from '../file-reader/tsv-file-reader.js';
import { CliCommandInterface } from './cli-command.interface.js';
import { RentOffer } from '../../types/rent-offer.type.js';
import chalk from 'chalk';

export default class ImportCommand implements CliCommandInterface {
  public readonly name = '--import';
  public execute(filename: string): void {
    const fileReader = new TSVFileReader(filename.trim());

    try {
      fileReader.read();
      const offers = fileReader.toArray();
      const log = console.log;

      offers.forEach(({type, city, goods, advertiser, location, ...rest}: RentOffer) => {
        const {username, email, avatarPath, isPro} = advertiser;
        log('city: ', chalk.green(city));
        log('type: ', chalk.blue(type));
        log('advertiser: ', chalk.yellow(username, email, avatarPath, isPro));
        log('goods: ', chalk.cyan(goods));
        log('location: ', chalk.redBright(location.latitude, location.longitude));
        log(rest);
      });

    } catch (err) {
      if (!(err instanceof Error)) {
        throw err;
      }

      console.log(`Не удалось импортировать данные из файла по причине: «${err.message}»`);
    }
  }
}
