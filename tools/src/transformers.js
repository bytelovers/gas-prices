import { CANONICAL_FIELDS, FIELDS } from './constants.js';
import { getStationData, getStationPrices } from './helpers.js';

export const transformGasFields = (gasFields) => {
    const renamedObj = {};
    for (const [k, v] of Object.entries(gasFields)) {
      // if ( k.includes('Precio') ) {
      renamedObj[CANONICAL_FIELDS[k] || k] = v;
      // }
    }
    return renamedObj;
}

export const transformGasData = data => {
  const result = {};
  const stations = new Map();
  const prices = new Map();

  data.forEach(station => {
    const stationId = station[FIELDS.EESS_ID];
    const stationData = getStationData(station);
    const stationPrices = getStationPrices(station);

    stations.set(stationId, stationData);
    prices.set(stationId, stationPrices);
  });

  result.stations = stations;
  result.prices = prices;

  return result;

}