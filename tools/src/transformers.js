import { CANONICAL_FIELDS, FIELDS } from './constants.js';
import { getCCAAData, getMunicipalityData, getProvinceData, getStationData, getStationPrices } from './helpers.js';

export const transformGasFields = (gasFields) => {
    const renamedObj = {};
    for (const [k, v] of Object.entries(gasFields)) {
      // if ( k.includes('Precio') ) {
      renamedObj[CANONICAL_FIELDS[k] || k] = v;
      // }
    }
    return renamedObj;
}

const orderById = map => new Map([...map.entries()].sort())

export const transformGasData = data => {
  const stations = new Map();
  const prices = new Map();
  const ccaa = new Map();
  const municipalities = new Map();
  const provinces = new Map();

  data.forEach(station => {
    const stationId = station[FIELDS.EESS_ID];
    const stationData = getStationData(station);
    const stationPrices = getStationPrices(station);
    const ccaaData = getCCAAData(station);
    const municipalityData = getMunicipalityData(station);
    const provinceData = getProvinceData(station);

    stations.set(stationId, stationData);
    prices.set(stationId, stationPrices);
    ccaa.set(station[FIELDS.CCAA_ID], ccaaData);
    municipalities.set(station[FIELDS.MUNICIPALITY_ID], municipalityData);
    provinces.set(station[FIELDS.PROVINCE_ID], provinceData);

  });

  return {
    stations: orderById(stations),
    prices: orderById(prices),
    ccaa: orderById(ccaa),
    municipalities: orderById(municipalities),
    provinces: orderById(provinces),
  };

}