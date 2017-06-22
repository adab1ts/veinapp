
import { Formatter } from './formatter';

/**
 * Returns an object whose properties have been capitalized
 * @param o         Target object
 * @param keys      Properties to capitalize
 * @param exclude   Fragments excluded from capitalization
 */
const capitalize: Formatter = (o: any, keys: string[], exclude: string[] = []) => {
  const capitalized = JSON.parse(JSON.stringify(o));
  const pattern = new RegExp(exclude.map(str => `\\b${str}\\b`).join('|'), 'i');

  keys.forEach(key => {
    if (typeof o[key] === 'string') {
      capitalized[key] = o[key].replace(/\w\S*/g, word => {
        return pattern.test(word) ? word : `${word.charAt(0).toUpperCase()}${word.slice(1).toLowerCase()}`;
      });
    }
  });

  return capitalized;
};

/**
 * Returns an object whose properties have been lowercased
 * @param o         Target object
 * @param keys      Properties to lowercase
 * @param exclude   Fragments excluded from being lowercased
 */
const lowerCase: Formatter = (o: any, keys: string[], exclude: string[] = []) => {
  const lowercased = JSON.parse(JSON.stringify(o));
  const pattern = new RegExp(exclude.map(str => `\\b${str}\\b`).join('|'), 'i');

  keys.forEach(key => {
    if (typeof o[key] === 'string') {
      lowercased[key] = o[key].replace(/\w\S*/g, word => {
        return pattern.test(word) ? word : word.toLowerCase();
      });
    }
  });

  return lowercased;
};

/**
 * Returns an object whose properties have been replaced
 * @param o     Target object
 * @param keys  Properties to replace
 * @param only  Matching fragments to be replaced
 */
const replace: Formatter = (o: any, keys: string[], only: string[] = []) => {
  const replaced = JSON.parse(JSON.stringify(o));

  const s_only = only.join(' ');
  const pattern = new RegExp(only.map(str => `\\b${str}\\b`).join('|'), 'ig');

  keys.forEach(key => {
    if (typeof o[key] === 'string') {
      replaced[key] = o[key].replace(pattern, word => {
        return s_only.match(new RegExp(word, 'i'))[0];
      });
    }
  });

  return replaced;
};

/**
 * Returns an object whose properties have been trimmed
 * @param o         Target object
 * @param keys      Properties to trim
 * @param exclude   Fragments excluded from trimming
 */
const trim: Formatter = (o: any, keys: string[], exclude: string[] = []) => {
  const trimmed = JSON.parse(JSON.stringify(o));

  keys.forEach(key => {
    if (typeof o[key] === 'string') {
      trimmed[key] = o[key].replace(/\s+/g, ' ').trim();
    }
  });

  return trimmed;
};

/**
 * Removes the protocols from uri-formatted properties of an object
 * @param o     Target object
 * @param keys  Properties to format
 * @param only  Matching protocols to be removed
 */
const unprotocol: Formatter = (o: any, keys: string[], only: string[] = ['http://', 'https://', 'mailto:']) => {
  const formatted = JSON.parse(JSON.stringify(o));
  const pattern = new RegExp(only.map(str => `${str}`).join('|'), 'ig');

  keys.forEach(key => {
    if (typeof o[key] === 'string') {
      formatted[key] = o[key].replace(pattern, '').replace(/\/$/, '');
    }
  });

  return formatted;
};

/**
 * Returns an object whose properties have been formatted for geocoding
 * @param o     Target object
 * @param keys  Properties to format
 * @param only  Unused
 */
const geoformat: Formatter = (o: any, keys: string[] = ['address'], only: string[] = []) => {
  const formatted = JSON.parse(JSON.stringify(o));

  keys.forEach(key => {
    if (typeof o[key] === 'string') {
      formatted[key] = o[key]
        .replace(/(Carrer|Calle)\s+(de\s+|d\')?/i, 'Cl ')
        .replace(/(Cl\s+)?([^,]*),\s*(\d+|s\/n).*/i, '$3 $1$2')
        .replace(/(s\/n)\s+/i, '');
    }
  });

  return formatted;
};

export {
  capitalize,
  geoformat,
  lowerCase,
  replace,
  trim,
  unprotocol,
};
