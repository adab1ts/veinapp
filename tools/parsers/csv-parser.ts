
import * as Baby from 'babyparse';
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

}
