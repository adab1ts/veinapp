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
  const flags = [ '--prod', '-p' ];

  if (flags.includes(arg)) {
    config = require('../src/config/firebase.prod');
  } else {
    config = require('../src/config/firebase');
  }

  const { firebaseConfig } = config;
  return firebaseConfig;
}

const firebaseConfig = loadFirebaseConfig(process.argv[ 2 ]);
initializeApp(firebaseConfig);

const placesRef = database().ref('places');
const gf = new Geofire(database().ref('coords'));
const data = require('./data/places.json');
const places = JSON.parse(JSON.stringify(data));
/**
 * Capitalize places names before inserting in firebase,
 * except the word in exceptions array
 */
const exceptions = [ 'AV ' ];
/**
 * Capitalizer
 * @param str
 * @param except
 * @returns {string|void}
 */
const capitalizer = (str, except) => {
  const matcher = new RegExp(except.join('|'), 'gi');
  return str
    .replace(/\w\S*/g, (txt) =>
      txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    )
    .replace(matcher, str.match(matcher)[ 0 ]);
};

places.forEach(place => {
  const { name, address, zip, city, latitude, longitude, telephone, email, web } = place;
  const capitalizedName = capitalizer(name, exceptions);
  const placeKey = placesRef.push({ name: capitalizedName, address, zip, city, telephone, email, web }).key;

  gf.set(placeKey, [ parseFloat(latitude), parseFloat(longitude) ])
    .then(() => console.log(`Current place ${name} location has been added to GeoFire`))
    .catch(error => console.error(`Error adding place ${name} location to GeoFire:`, error));
});
