
import * as yargs from 'yargs';
import * as GeoFire from 'geofire';
import { app, database } from 'firebase';

import { initDatastore } from './db-utils';
import { DataParser, ParseResult } from '../tools';


/**
 * Parse script arguments
 */
function parseArgs(): any {
  return yargs
    .usage('Usage: $0 -f data_file [-p]')
    .options({
      'file': {
        alias: 'f',
        type: 'string',
        requiresArg: true,
        describe: 'Filename of exported data (.json | .csv)',
        demandOption: 'Provide exported data filename.'
      },
      'prod': {
        alias: 'p',
        type: 'boolean',
        describe: 'Export your data from production'
      }
    })
    .example('npm run db:export -- -f places.csv')
    .example('npm run db:export -- -f places.json -p')
    .fail((msg, err, yargs) => {
      console.error(yargs.help());
      console.error(msg);
      process.exit(0);
    })
    .help()
    .argv;
}

/**
 * Fetch all data from datastore
 * @param datastore Datastore to export data from
 */
function fetchPlaces(datastore: database.Database): firebase.Promise<any> {
  const dbPlaces: database.Reference = datastore.ref('places');
  const dbCoords: GeoFire = new GeoFire(datastore.ref('coords'));
  const places = [];

  const placesFetched: firebase.Promise<any> = dbPlaces
    .orderByChild('name')
    .once('value')
    .then((snapshot: database.DataSnapshot) => {
      snapshot.forEach((childSnapshot: database.DataSnapshot) => {
        const placeId = childSnapshot.key;
        const { name, address, zip, city, telephone, email, web, group, type } = childSnapshot.val();

        const place = { id: placeId, name, address, zip, city, telephone, email, web, group, type };
        places.push(place);

        return false;
      });
    })
    .then(_ => {
      const fetchedCoords = places.map(place => {
        return dbCoords
          .get(place.id)
          .then((coords: number[]) => {
            const latitude  = coords[0];
            const longitude = coords[1];

            console.log(`Place: '${place.name}' => Location: [${latitude}, ${longitude}]`)
            return Object.assign({}, place, { latitude, longitude });
          });
      });

      return Promise.all(fetchedCoords);
    });

  return placesFetched;
}


// 1- Read args
const argv = parseArgs();

// 2- Establish datastore connection
const datastore: database.Database = initDatastore(argv.prod);

// 3- Fetch data from datastore
console.log('Fetching data from Firebase Database...');
const placesFetched: firebase.Promise<any> = fetchPlaces(datastore);

placesFetched.then(places => {
  // 4- Finnish datastore connection
  console.log(`${places.length} places have been fetched from Firebase Database!`);
  datastore.goOffline();

  // 5- Save data to disk
  console.log('Saving data to file...');
  new DataParser().unparse(places, argv.file);
}).catch(_ => {
  console.log('Something went wrong when fetching places from Firebase Database. Check logs');
  datastore.goOffline();
});


