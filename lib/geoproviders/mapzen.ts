
import * as request from 'request-promise-native';

import { Formatter } from '../../lib';

/**
 * Initialize configuration of geocoding service provider
 * @param prod Whether to use production or development config
 */
function geoserviceConfig(prod: boolean): any {
  let config = undefined;

  if (prod) {
    config = require('../../src/config/mapzen.prod');
  } else {
    config = require('../../src/config/mapzen');
  }

  const { mapzenConfig } = config;

  return {
    searchURL: `${mapzenConfig.apiURL}/search`,
    reverseURL: `${mapzenConfig.apiURL}/reverse`,
    searchParams: {
      'api_key': mapzenConfig.apiKey,
      'boundary.country': 'ES',
      'sources': 'oa',
      'layers': 'address',
      'size': '1'
    }
  };
}

/**
 * Geocode a place
 * @param place  Place to geocode
 * @param delta  Correction parameter to defer geocoding request
 * @param config Service provider configuration
 */
function geocodePlace(place: any, delta: number, config: any): Promise<any> {
  const formattedPlace = Formatter.format([{fn: Formatter.geoformat, keys: ['address']}])(place);

  const searchTerm = `${formattedPlace.address}, ${formattedPlace.city}`;
  const query = Object.assign({}, config.searchParams, { 'text': searchTerm });
  const opts = {
    uri: config.searchURL,
    qs: query,
    json: true
  };

  const geocoded = new Promise<any>((resolve, reject) => {
    setTimeout(function() {
      request(opts)
        .then(response => {
          const result = response.features[0];
          const coords = result['geometry']['coordinates']; // [long, lat]
          const geoplace = Object.assign({}, place, { latitude: coords[1], longitude: coords[0] });

          console.log(`[${geoplace.latitude}, ${geoplace.longitude}] '${searchTerm}' => '${geoplace.name}'`);
          resolve(geoplace);
        })
        .catch(err => {
          console.error(`Failed to geocode location of '${place.name}'.`);
          console.error('Error:', err.message);
          reject(err);
        });
    }, delta * 250);
  });

  return geocoded;
}

export { geoserviceConfig, geocodePlace };
