import { WriteStream } from 'node:fs';
import { createWriteStream } from 'node:fs';
import EventEmitter from 'node:events';

import { FileWriterInterface } from './file-writer.interface.js';


const CHUNK_SIZE = 32768; // 32KB

export default class TSVFileWriter implements FileWriterInterface {
  private stream: WriteStream;

  constructor(public readonly filename: string) {
    this.stream = createWriteStream(this.filename, {
      flags: 'w',
      encoding: 'utf8',
      highWaterMark: CHUNK_SIZE,
      autoClose: true,
    });
  }

  public async write(row: string): Promise<void> {
    const canWrite = this.stream.write(`${row}\n`);

    if (!canWrite) {
      await EventEmitter.once(this.stream, 'drain');
    }
  }
}
