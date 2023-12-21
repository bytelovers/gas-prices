import { CANONICAL_FIELDS, FIELDS } from "./constants.js";
import {
  getCCAAData,
  getMunicipalityData,
  getProvinceData,
  getStationData,
  getStationPrices,
} from "./helpers.js";

export const transformGasFields = (gasFields) => {
  const renamedObj = {};
  for (const [k, v] of Object.entries(gasFields)) {
    // if ( k.includes('Precio') ) {
    renamedObj[CANONICAL_FIELDS[k] || k] = v;
    // }
  }
  return renamedObj;
};

const orderByField = (obj, field) =>
  field ? obj.sort() : obj.sort((a, b) => a[field] - b[field]);

const getUniqueArrayObjectValuesByField = (arr, field) =>
  Array.from(new Set(arr.map((item) => item[field]))).map((itemField) =>
    arr.find((item) => item[field] === itemField)
  );

export const transformGasData = (data) => {
  const stations = [];
  const prices = [];
  const ccaa = [];
  const municipalities = [];
  const provinces = [];

  data.forEach((station) => {
    const stationData = getStationData(station);
    const stationPrices = getStationPrices(station);
    const ccaaData = getCCAAData(station);
    const municipalityData = getMunicipalityData(station);
    const provinceData = getProvinceData(station);

    stations.push(stationData);
    prices.push(stationPrices);
    ccaa.push(ccaaData);
    municipalities.push(municipalityData);
    provinces.push(provinceData);
  });

  return {
    stations: orderByField(
      getUniqueArrayObjectValuesByField(stations, FIELDS.EESS_ID),
      FIELDS.EESS_ID
    ),
    prices: orderByField(
      getUniqueArrayObjectValuesByField(prices, FIELDS.EESS_ID),
      FIELDS.EESS_ID
    ),
    ccaas: orderByField(getUniqueArrayObjectValuesByField(ccaa, FIELDS.CCAA_ID)),
    municipalities: orderByField(
      getUniqueArrayObjectValuesByField(municipalities, FIELDS.MUNICIPALITY_ID)
    ),
    provinces: orderByField(
      getUniqueArrayObjectValuesByField(provinces, FIELDS.PROVINCE_ID)
    ),
  };
};
