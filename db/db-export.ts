
import * as yargs from 'yargs';

import { Datastore, Parser } from '../lib';


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


// 1- Read args
const argv = parseArgs();

// 2- Establish datastore connection
const datastore = Datastore.Firebase.initDatastore(argv.prod);

// 3- Fetch data from datastore
const placesFetched = Datastore.Firebase.fetchPlaces(datastore);

placesFetched.then(places => {
  // 4- Finnish datastore connection
  console.log(`${places.length} places have been fetched from Database!`);
  Datastore.Firebase.closeConnection(datastore);

  // 5- Save data to disk
  console.log('Saving data to file...');
  new Parser.DataParser().unparse(places, argv.file);
}).catch(_ => {
  console.error('Something went wrong when fetching places from Database. Check logs');
  Datastore.Firebase.closeConnection(datastore);
});
