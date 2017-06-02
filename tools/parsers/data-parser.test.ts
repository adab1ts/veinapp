
import { DataParser, ParseResult } from '../parsers';


const parser = new DataParser();

const jsonParsed: ParseResult = parser.parse(['places.json']);
console.log(jsonParsed.data);

const csvParsed: ParseResult = parser.parse(['places.csv', 'feds.csv']);
console.log(csvParsed.data);
