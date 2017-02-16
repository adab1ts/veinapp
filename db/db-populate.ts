
import * as Geofire from 'geofire';
import { database, initializeApp } from 'firebase';

/*
 * In order to load your data in your production datastore
 * add the flag --prod or -p to the calling command as seen below:
 *
 * $ npm run db:populate -- -p
 */
function loadFirebaseConfig(arg: string): any {
  let config = undefined;
  const flags = ['--prod', '-p'];

  if (flags.includes(arg)) {
    config = require('../src/config/firebase.prod');
  } else {
    config = require('../src/config/firebase');
  }

  const { firebaseConfig } = config;
  return firebaseConfig;
}

const firebaseConfig = loadFirebaseConfig(process.argv[2]);
initializeApp(firebaseConfig);

const placesRef = database().ref('places');
const gf = new Geofire(database().ref('coords'));
const data = require('./data/places.json');
const places = JSON.parse(JSON.stringify(data));

places.forEach(place => {
  const { name, address, zip, city, latitude, longitude, telephone, email, web } = place;
  const placeKey = placesRef.push({ name, address, zip, city, telephone, email, web }).key;

  gf.set(placeKey, [parseFloat(latitude), parseFloat(longitude)])
    .then(() => console.log(`Current place ${name} location has been added to GeoFire`))
    .catch(error => console.error(`Error adding place ${name} location to GeoFire:`, error));
});
