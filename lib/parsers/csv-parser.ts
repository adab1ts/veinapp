
import * as Baby from 'babyparse';
import * as fs from 'fs';
import { Parser, ParseResult, DATA_PATH } from './parser';

// See:
// - https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/babyparse/index.d.ts
// - http://papaparse.com/docs
export class CSVParser implements Parser {

  config: BabyParse.ParseConfig = {
    delimiter: '', // empty: auto-detect
    newline: '',   // empty: auto-detect
    header: true,
    dynamicTyping: false,
    preview: 0,
    comments: false,
    skipEmptyLines: true,
    fastMode: undefined,
    step: undefined,
    complete: undefined,
  };

  constructor() {}

  parse(files: string[] = []): ParseResult {
    const result: ParseResult = {
      data: []
    };

    files.forEach(file => {
      const filename = `${DATA_PATH}/${file}`;
      const parsed: BabyParse.ParseResult = Baby.parseFiles(filename, this.config);

      result.data = [...result.data, ...parsed.data];
      // result.fields = parsed.meta.fields;
    });

    return result;
  }

  unparse(data: Object[], file: string = 'places.csv') {
    const filename = `${DATA_PATH}/${file}`;
    const options = { quotes: true };
    const csv = Baby.unparse(data, options);

    fs.writeFile(filename, csv, err => {
      if (err) {
        throw err;
      }

      console.log(`Data has been successfully saved to '${filename}'.`);
    });
  }

}
