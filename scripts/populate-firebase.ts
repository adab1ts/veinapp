import { database, initializeApp } from 'firebase';
import { firebaseConfig } from '../src/config/firebase';
import * as Geofire from 'geofire';

initializeApp(firebaseConfig);

const dbData = require("../data/places.json");
const placesList = JSON.parse(JSON.stringify(dbData));
const placesRef = database().ref('places');
const gf = new Geofire(database().ref('coords'));

placesList.forEach(place => {
  let { name, address, zip, city, latitude, longitude, telephone, email, web } = place;
  let placeKey = placesRef
    .push({ name, address, zip, city, telephone, email, web }).key;

    gf.set(placeKey, [ parseFloat(latitude), parseFloat(longitude) ])
    .then(function () {
      console.log('Current place ' + name + ' location has been added to GeoFire');
    })
    .catch(function (error) {
      console.error(error);
      console.error('Error adding place ' + name + ' location to GeoFire');
    });
});
