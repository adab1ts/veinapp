
import { firebaseConfig } from '../config/firebase.prod';
import { mapzenConfig } from '../config/mapzen.prod';

export const environment = {
  production: true,
  firebase: firebaseConfig,
  mapzen: mapzenConfig
};
