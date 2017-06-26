
import * as fs from 'fs';
import { Parser, ParseResult, DATA_PATH } from './parser';

export class JSONParser implements Parser {

  constructor() {}

  parse(files: string[] = []): ParseResult {
    const result: ParseResult = {
      data: []
    };

    files.forEach(file => {
      const rawdata = require(`${DATA_PATH}/${file}`);
      const parsed = JSON.parse(JSON.stringify(rawdata));

      result.data = [...result.data, ...parsed];
    });

    return result;
  }

  unparse(data: Object[], file: string = 'places.json') {
    const filename = `${DATA_PATH}/${file}`;
    const json = JSON.stringify(data, null, '\t');

    fs.writeFile(filename, json, err => {
      if (err) {
        throw err;
      }

      console.log(`Data has been successfully saved to '${filename}'.`);
    });
  }

}
