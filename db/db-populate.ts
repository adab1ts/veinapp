
import * as yargs from 'yargs';
import * as GeoFire from 'geofire';
import { initializeApp, app, database } from 'firebase';

import { initDatastore } from './db-utils';
import { Parser, Formatter, GeoProvider } from '../tools';


/**
 * Parse script arguments
 */
function parseArgs(): any {
  return yargs
    .usage('Usage: $0 -f data_file1 [data_file2] [-r] [-t] [-g] [-p]')
    .options({
      'files': {
        alias: 'f',
        type: 'array',
        requiresArg: true,
        describe: 'List of data files',
        demandOption: 'Provide your list of data files to parse.'
      },
      'format': {
        alias: 't',
        type: 'boolean',
        describe: 'Apply format transformations to your places properties'
      },
      'geocode': {
        alias: 'g',
        type: 'boolean',
        describe: 'Geocode your places'
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
    .example('npm run db:populate -- -f places-1.csv places-2.json -t -g -p')
    .fail((msg, err, yargs) => {
      console.error(yargs.help());
      console.error(msg);
      process.exit(0);
    })
    .help()
    .argv;
}

/**
 * Remove data from datastore if requested
 * @param datastore Datastore to remove data from
 * @param opts      Options
 */
function removeData(datastore: database.Database, opts: any): Promise<any> {
  let removed: Promise<any> = undefined;

  if (opts.reset) {
    console.log('Removing data from Firebase Database...');
    const removedPlaces: firebase.Promise<any> = datastore.ref('places').remove();
    const removedCoords: firebase.Promise<any> = datastore.ref('coords').remove();

    removed = Promise.all([removedCoords, removedPlaces]);
  } else {
    removed = Promise.resolve(false);
  }

  return removed;
}

/**
 * Apply a list of string transformations to a list of places
 * @param places The places to format
 * @param opts   Options
 */
function formatPlaces(places: any[], opts: any): Promise<any> {
  if (opts.format) {
    console.log('Applying transformations to places...');
    const formatted: any[] = places.map(formatPlace);

    return Promise.resolve(formatted);
  } else {
    return Promise.resolve(places);
  }
}

/**
 * Apply a list of string transformations to a place properties
 * @param place The place to format
 */
function formatPlace(place: any): any {
  const patterns = ['AV', 'FAV', 'C/', 'S/N', 'i', 'la', 'el', 'de', 'del', 'd\'', 'l\''];
  const transformations: Formatter.FormatTask[] = [
    { fn: Formatter.trim, keys: Object.keys(place) },
    { fn: Formatter.capitalize, keys: ['name', 'address', 'city', 'group', 'type'], patterns },
    { fn: Formatter.replace, keys: ['name', 'address', 'city', 'group'], patterns },
    { fn: Formatter.lowerCase, keys: ['email', 'web'] },
    { fn: Formatter.unprotocol, keys: ['email', 'web'] },
  ];

  const formatted = Formatter.format(transformations)(place);
  return formatted;
}

/**
 * Geocode places if requested
 * @param places Places to geocode
 * @param opts   Options
 */
function geocodePlaces(places: any[], opts: any): Promise<any> {
  let geocoded: Promise<any> = undefined;

  if (opts.geocode) {
    console.log('Geocoding places..');
    const geoservice = GeoProvider.geoserviceConfig(opts.prod);
    const placesGeocoded: Promise<any>[] = places.map((place, pos) => GeoProvider.geocodePlace(place, pos, geoservice));

    geocoded = Promise.all(placesGeocoded);
  } else {
    geocoded = Promise.resolve(places);
  }

  return geocoded;
}

/**
 * Load places to datastore
 * @param places    Places to load
 * @param datastore Datastore to load data to
 */
function loadPlaces(places: any[], datastore: database.Database): Promise<any> {
  console.log('Loading data to Firebase Database...');
  const dbPlaces: database.Reference = datastore.ref('places');
  const dbCoords: GeoFire = new GeoFire(datastore.ref('coords'));
  const placesLoaded: Promise<any>[] = places.map(place => loadPlace(place, dbPlaces, dbCoords));

  return Promise.all(placesLoaded);
}

/**
 * Load a place to datastore
 * @param place Place to load
 * @param dbPlaces Datastore places node
 * @param dbCoords Datastore coordinates node
 */
function loadPlace(place: any, dbPlaces: database.Reference, dbCoords: GeoFire): Promise<any> {
  const { name, address, zip, city, telephone, email, web, group, type, latitude, longitude } = place;

  // Load place data
  const placeId = dbPlaces.push({ name, address, zip, city, telephone, email, web, group, type }).key;

  // Load place location
  return dbCoords.set(placeId, [parseFloat(latitude), parseFloat(longitude)])
    .then(_ => console.log(`Loaded: '${name}'`))
    .catch(err => {
      console.error(`Failed to add location of '${name}'.`);
      console.error('Error:', err);
    });
}


// 1- Read args
const argv = parseArgs();

// 2- Parse data files
console.log('Parsing data files...');
const places: Parser.ParseResult = new Parser.DataParser().parse(argv.files);

// 3- Establish datastore connection
const datastore: database.Database = initDatastore(argv.prod);

// 4- Remove data from datastore if requested
removeData(datastore, argv)

// 5- Apply transformations to places if requested
  .then(_ => formatPlaces(places.data, argv))

// 6- Geocode places if requested
  .then(formattedPlaces => geocodePlaces(formattedPlaces, argv))

// 7- Load data to datastore
  .then(geoPlaces => loadPlaces(geoPlaces, datastore))

// 8- Finnish datastore connection
  .then(_ => {
    console.log(`${_.length} places have been loaded to Firebase Database!`);
    datastore.goOffline();
  })
  .catch(_ => {
    console.error('Something went wrong when loading places to Firebase Database. Check logs');
    datastore.goOffline();
  });
