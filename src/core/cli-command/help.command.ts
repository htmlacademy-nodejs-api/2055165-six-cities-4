import { CliCommandInterface } from './cli-command.interface.js';

export default class HelpCommand implements CliCommandInterface {
  public readonly name = '--help';

  public async execute(): Promise<void> {
    console.log(
      `
        Программа для подготовки данных для REST API сервера.
        Пример:
            main.rest.js --<command> [--arguments]
        Команды:
            --version:                       # выводит номер версии приложения six cities
            --help:                          # печатает этот текст в терминал
            --import <filepath>:             # импортирует данные приложения из TSV-файла
            --generate <n> <filepath> <url>  # генерирует произвольное количество тестовых объявлений об аренде
      `
    );
  }
}
