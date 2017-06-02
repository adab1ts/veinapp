
import { root } from '../utils';

const DATA_PATH: string = root('db', 'data');

interface ParseResult {
  data: Array<any>;
}

interface Parser {
  parse(): ParseResult;
}

export { Parser, ParseResult, DATA_PATH };
