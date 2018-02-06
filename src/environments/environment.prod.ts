
import { firebaseConfig } from '../config/firebase.prod';
import { mapboxConfig } from '../config/mapbox.prod';

export const environment = {
  production: true,
  firebase: firebaseConfig,
  mapbox: mapboxConfig
};
