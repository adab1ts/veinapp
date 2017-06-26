
import { initializeApp, app, database } from 'firebase';
import * as GeoFire from 'geofire';

/**
 * Initialize datastore connection
 * @param prod Whether to populate production or development datastore
 */
function initDatastore(prod: boolean): database.Database {
  let config = undefined;

  if (prod) {
    config = require('../../src/config/firebase.prod');
  } else {
    config = require('../../src/config/firebase');
  }

  const { firebaseConfig } = config;
  const app: app.App = initializeApp(firebaseConfig);
  const db: database.Database = app.database();

  return db;
}

/**
 * Release connection to Firebase Realtime Database
 * @param datastore Datastore
 */
function closeConnection(datastore: database.Database): any {
  return datastore.goOffline();
}

/**
 * Remove places from datastore if requested
 * @param datastore Datastore to remove places from
 * @param opts      Options
 */
function removePlaces(datastore: database.Database, opts: any): Promise<any> {
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
 * Fetch all data from datastore
 * @param datastore Datastore to export data from
 */
function fetchPlaces(datastore: database.Database): firebase.Promise<any> {
  console.log('Fetching data from Firebase Database...');
  const dbPlaces: database.Reference = datastore.ref('places');
  const dbCoords: GeoFire = new GeoFire(datastore.ref('coords'));

  const placesFetched: firebase.Promise<any> = dbPlaces
    .orderByChild('name')
    .once('value')
    .then((snapshot: database.DataSnapshot) => {
      const places = [];

      snapshot.forEach((childSnapshot: database.DataSnapshot) => {
        const placeId = childSnapshot.key;
        const { name, address, zip, city, telephone, email, web, group, type } = childSnapshot.val();

        const place = { id: placeId, name, address, zip, city, telephone, email, web, group, type };
        places.push(place);

        return false;
      });

      return places;
    })
    .then(places => {
      const fetchedCoords = places.map(place => {
        return dbCoords
          .get(place.id)
          .then((coords: number[]) => {
            const latitude  = coords[0];
            const longitude = coords[1];

            console.log(`[${latitude}, ${longitude}] '${place.address}, ${place.city}' => '${place.name}'`);
            return Object.assign({}, place, { latitude, longitude });
          });
      });

      return Promise.all(fetchedCoords);
    });

  return placesFetched;
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


export { initDatastore, closeConnection, fetchPlaces, loadPlaces, removePlaces };
