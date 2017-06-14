
import { initializeApp, app, database } from 'firebase';

/**
 * Initialize datastore connection
 * @param prod Whether to populate production or development datastore
 */
function initDatastore(prod: boolean): database.Database {
  let config = undefined;

  if (prod) {
    config = require('../src/config/firebase.prod');
  } else {
    config = require('../src/config/firebase');
  }

  const { firebaseConfig } = config;
  const app: app.App = initializeApp(firebaseConfig);
  const db: database.Database = app.database();

  return db;
}

export { initDatastore };
