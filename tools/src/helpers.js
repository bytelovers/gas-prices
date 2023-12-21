import fs from "node:fs";

import { Readable } from "node:stream";

import {
  CCAA_FIELDS,
  FIELDS,
  MUNICIPALITY_FIELDS,
  PROVINCE_FIELDS,
  STATION_FIELDS,
} from "./constants.js";

const extractFields = (fields = [], data) => {
  const _result = {};
  fields.forEach((field) => {
    _result[field] = data[field];
  });
  return _result;
};

export const formatDateStr = (dateStr) =>
  new Intl.DateTimeFormat("default", dateStr)
    .format()
    .split("/")
    .reverse()
    .join("");

export const readFromFile = (path) => {
  const contents = fs.readFileSync(path, { encoding: "utf-8" });
  return Readable.from(contents);
};

export const getGasDateTime = (str) => {
  // Dividir la cadena en componentes de fecha y hora
  const [date, time] = str.split(" ");

  // Extraer los componentes de fecha y hora
  const [day, month, year] = date.split("/");
  const [hour, mins, sec] = time.split(":");

  // Crear el objeto Date
  const dateTime = new Date(year, month - 1, day, hour, mins, sec);

  return dateTime;
};

export const getStationPrices = (station) => {
  const _result = {};
  for (const k of Object.keys(station)) {
    if (k.toLowerCase().includes("price")) {
      _result[k] =
        station[k] === "" ? 0 : parseFloat(station[k].replace(",", "."));
    }
  }
  return { [FIELDS.EESS_ID]: station[FIELDS.EESS_ID], ..._result };
};

export const getStationData = (station) =>
  extractFields(STATION_FIELDS, station);
export const getCCAAData = (station) => extractFields(CCAA_FIELDS, station);
export const getMunicipalityData = (station) =>
  extractFields(MUNICIPALITY_FIELDS, station);
export const getProvinceData = (station) =>
  extractFields(PROVINCE_FIELDS, station);
