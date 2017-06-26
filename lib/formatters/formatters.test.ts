
import { format, capitalize, lowerCase, replace, trim, unprotocol, geoformat } from '../formatters';


const place = {
  'name': 'aV Amics   de La  RAMBLA ',
  'address': '  Carrer d\'Aoiz I Velarde, 85, 7-3 ',
  'city': 'l\'Hospitalet DE LLOBregat ',
  'group': 'Fav SABADELL ave',
  'web': 'http://the-web.example.com/',
  'email': 'mailto:the-email@example.com',
  'active': true
};
const keys = Object.keys(place);

// untouched
console.log('Untouched:', JSON.stringify(place));

// trim
const trimmed = trim(place, keys);
console.log('Trimmed:', JSON.stringify(trimmed));

// capitalize
const exclude = ['AV', 'FAV', 'C/', 'S/N', 'i', 'de', 'del', 'la', 'l\''];
const capitalized = capitalize(place, keys, exclude);
console.log('Capitalized:', JSON.stringify(capitalized));

// replace
const only = ['AV', 'FAV', 'C/', 'S/N', 'i', 'de', 'del', 'la', 'l\''];
const replaced = replace(place, keys, only);
console.log('Replaced:', JSON.stringify(replaced));

// lowerCase
const lowerCased = lowerCase(place, keys, ['C/', 'S/N', 'AV', 'FAV']);
console.log('Lowercased:', JSON.stringify(lowerCased));

// transformations
const patterns = ['AV', 'FAV', 'C/', 'S/N', 'i', 'la', 'el', 'de', 'del', 'd\'', 'l\''];
const transformations = [
  { fn: trim, keys: Object.keys(place) },
  { fn: capitalize, keys: ['name', 'address', 'city', 'group', 'type'], patterns },
  { fn: replace, keys: ['name', 'address', 'city', 'group'], patterns },
  { fn: lowerCase, keys: ['email', 'web'] },
  { fn: unprotocol, keys: ['email', 'web'] },
  { fn: geoformat, keys: ['address'] },
];

const formatted = format(transformations)(place);
console.log('Formatted:', JSON.stringify(formatted));
