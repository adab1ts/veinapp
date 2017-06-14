
import { Parser, ParseResult } from './parser';
import { CSVParser } from './csv-parser';
import { JSONParser } from './json-parser';

export class DataParser implements Parser {

  constructor() {}

  parse(files: string[] = []): ParseResult {
    const result: ParseResult = { data: [] };
    let parsed: ParseResult = undefined;

    files.forEach(file => {
      if (/\.json$/i.test(file)) {
        parsed = new JSONParser().parse([file]);
      }
      if (/\.csv$/i.test(file)) {
        parsed = new CSVParser().parse([file]);
      }

      result.data = [...result.data, ...parsed.data];
    });

    return result;
  }

  unparse(data: Object[], file: string = 'places.csv') {
    if (/\.json$/i.test(file)) {
      new JSONParser().unparse(data, file);
    }
    if (/\.csv$/i.test(file)) {
      new CSVParser().unparse(data, file);
    }
  }

}
