
import { root } from '../utils';

const DATA_PATH: string = root('db', 'data');

interface ParseResult {
  data: Array<any>;
}

interface Parser {
  parse(files?: string[]): ParseResult;
  unparse(data: Object[], file?: string): void;
}

export { Parser, ParseResult, DATA_PATH };
