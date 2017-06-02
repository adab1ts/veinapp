
import * as GeoFire from 'geofire';
import { initializeApp, app, database } from 'firebase';

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
 * Initialize datastore connection
 * @param env Environment of the datastore to populate
 */
function initDatastore(env: string): database.Database {
  let config = undefined;
  const flags = ['--prod', '-p'];

  if (flags.includes(env)) {
    config = require('../src/config/firebase.prod');
  } else {
    config = require('../src/config/firebase');
  }

  const { firebaseConfig } = config;
  const app: app.App = initializeApp(firebaseConfig);
  const db: database.Database = app.database();

  return db;
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
const files: string[] = process.argv[2].split(',');
const env: string = process.argv[3];

// 2- Parse data files
console.log('Parsing data files...');
const places: ParseResult = new DataParser().parse(files);

// 3- Establish datastore connection
const datastore: database.Database = initDatastore(env);
const dbPlaces: database.Reference = datastore.ref('places');
const dbCoords: GeoFire = new GeoFire(datastore.ref('coords'));

// 4- Load data to datastore
console.log('Loading data to Firebase Database...');
const loadedPlaces: Promise<any>[] = places.data.map(place => loadPlace(formatPlace(place), dbPlaces, dbCoords));

// 5- Finnish datastore connection
Promise.all(loadedPlaces).then(() => {
  console.log('All places have been loaded to Firebase Database!');
  datastore.goOffline();
}).catch(() => {
  console.log('Something went wrong when loading places to Firebase Database. Check logs');
  datastore.goOffline();
});
