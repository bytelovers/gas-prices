import { STATION_FIELDS } from './constants.js';
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

export const getStationPrices = station => {
  const _result = {}
  for (const k of Object.keys(station)) {
    if (k.toLowerCase().includes('price')) {
      _result[k] = station[k] === ''
        ? 0
        : parseFloat(station[k].replace(',', '.'));
    }
  }
  return _result;
}

export const getStationData = station => {
  const _result = {};
  STATION_FIELDS.forEach(field => {
    _result[field] = station[field]
  })
  return _result;
}
