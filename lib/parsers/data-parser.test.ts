
import { DataParser, ParseResult } from '../parsers';


const parser = new DataParser();

console.log('Parsing json file data...');
const jsonParsed: ParseResult = parser.parse(['places.json']);
console.log(jsonParsed.data);

console.log('...and unparsing to csv format...');
parser.unparse(jsonParsed.data, 'places.json-to.csv');

console.log('Parsing csv file...');
const csvParsed: ParseResult = parser.parse(['places.json-to.csv']);
console.log(csvParsed.data);

console.log('...and unparsing data to json format...');
parser.unparse(csvParsed.data, 'places.csv-to.json');
