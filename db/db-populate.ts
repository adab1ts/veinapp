
import * as yargs from 'yargs';
import * as GeoFire from 'geofire';
import { initializeApp, app, database } from 'firebase';

import { initDatastore } from './db-utils';
import {
  DataParser,
  ParseResult,
  FormatTask,
  format,
  capitalize,
  lowerCase,
  replace,
  trim,
  unprotocol } from '../tools';


/**
 * Parse script arguments
 */
function parseArgs(): any {
  return yargs
    .usage('Usage: $0 -f data_file1 [data_file2] [-p] [-r]')
    .options({
      'files': {
        alias: 'f',
        type: 'array',
        requiresArg: true,
        describe: 'List of data files',
        demandOption: 'Provide your list of data files to parse.'
      },
      'prod': {
        alias: 'p',
        type: 'boolean',
        describe: 'Load your data in production'
      },
      'reset': {
        alias: 'r',
        type: 'boolean',
        describe: 'Remove existing data first'
      }
    })
    .example('npm run db:populate -- -f places.json -r')
    .example('npm run db:populate -- -f places-1.csv places-2.json -p')
    .fail((msg, err, yargs) => {
      console.error(yargs.help());
      console.error(msg);
      process.exit(0);
    })
    .help()
    .argv;
}

/**
 * Applies a list of string transformations to a place properties
 * @param place The place to format
 */
function formatPlace(place: any): any {
  const patterns = ['AV', 'FAV', 'C/', 'S/N', 'i', 'la', 'el', 'de', 'del', 'd\'', 'l\''];
  const transformations: FormatTask[] = [
    { fn: trim, keys: Object.keys(place) },
    { fn: capitalize, keys: ['name', 'address', 'city', 'group', 'type'], patterns },
    { fn: replace, keys: ['name', 'address', 'city', 'group'], patterns },
    { fn: lowerCase, keys: ['email', 'web'] },
    { fn: unprotocol, keys: ['email', 'web'] },
  ];

  const formatted = format(transformations)(place);
  return formatted;
}

/**
 * Loads a place in datastore
 * @param place Place to load
 * @param dbPlaces Datastore places node
 * @param dbCoords Datastore coordinates node
 */
function loadPlace(place: any, dbPlaces: database.Reference, dbCoords: GeoFire): Promise<any> {
  const { name, address, zip, city, latitude, longitude, telephone, email, web, group, type } = place;

  // Load place in datastore
  const placeId = dbPlaces.push({ name, address, zip, city, telephone, email, web, group, type }).key;

  // Load place geocoordinates in datastore
  return dbCoords.set(placeId, [parseFloat(latitude), parseFloat(longitude)])
    .then(() => console.log(`Place: '${name}' => Location: [${latitude}, ${longitude}]`))
    .catch(error => console.error(`Failed to add location of '${name}':`, error));
}


// 1- Read args
const argv = parseArgs();

// 2- Parse data files
console.log('Parsing data files...');
const places: ParseResult = new DataParser().parse(argv.files);

// 3- Establish datastore connection
const datastore: database.Database = initDatastore(argv.prod);
const dbPlaces: database.Reference = datastore.ref('places');
const dbCoords: GeoFire = new GeoFire(datastore.ref('coords'));

// 4- Remove data from datastore if requested
let removed: Promise<any> = undefined;
if (argv.reset) {
  console.log('Removing data from Firebase Database...');
  const removedPlaces: firebase.Promise<any> = dbPlaces.remove();
  const removedCoords: firebase.Promise<any> = dbCoords.ref().remove();
  removed = Promise.all([removedCoords, removedPlaces]);
} else {
  removed = Promise.resolve(false);
}

removed
  .then(() => {
    // 5- Load data to datastore
    console.log('Loading data to Firebase Database...');
    const loadedPlaces: Promise<any>[] = places.data.map(place => loadPlace(formatPlace(place), dbPlaces, dbCoords));

    // 6- Finnish datastore connection
    Promise.all(loadedPlaces).then(() => {
      console.log(`${loadedPlaces.length} places have been loaded to Firebase Database!`);
      datastore.goOffline();
    }).catch(() => {
      console.log('Something went wrong when loading places to Firebase Database. Check logs');
      datastore.goOffline();
    });
  })
  .catch(() => {
    console.log('Something went wrong when removing places from Firebase Database. Check logs');
  });
