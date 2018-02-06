
import * as yargs from 'yargs';

import {
  Datastore,
  Formatter,
  GeoProvider,
  Parser } from '../lib';


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
    const config = GeoProvider.Mapbox.geoserviceConfig(opts.prod);
    const placesGeocoded: Promise<any>[] = places.map((place, pos) => GeoProvider.Mapbox.geocodePlace(place, pos, config));

    geocoded = Promise.all(placesGeocoded);
  } else {
    geocoded = Promise.resolve(places);
  }

  return geocoded;
}


// 1- Read args
const argv = parseArgs();

// 2- Parse data files
const places: Parser.ParseResult = new Parser.DataParser().parse(argv.files);

// 3- Establish datastore connection
const datastore = Datastore.Firebase.initDatastore(argv.prod);

// 4- Remove data from datastore if requested
Datastore.Firebase.removePlaces(datastore, argv)

// 5- Apply transformations to places if requested
  .then(_ => formatPlaces(places.data, argv))

// 6- Geocode places if requested
  .then(formattedPlaces => geocodePlaces(formattedPlaces, argv))

// 7- Load data to datastore
  .then(geoPlaces => Datastore.Firebase.loadPlaces(geoPlaces, datastore))

// 8- Finnish datastore connection
  .then(_ => {
    console.log(`${_.length} places have been loaded to Database!`);
    Datastore.Firebase.closeConnection(datastore);
  })
  .catch(_ => {
    console.error('Something went wrong when loading places to Database. Check logs');
    Datastore.Firebase.closeConnection(datastore);
  });
