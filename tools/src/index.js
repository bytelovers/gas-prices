import fs from "node:fs";

import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

import { Readable, Transform, pipeline } from "node:stream";

import { GAS_PRICES_URL, } from "./constants.js";
import { transformGasFields } from "./transformers.js";

const writeStream = fs.createWriteStream("data.json");

const fetchFileStream = async () => {
  const stream = fs.readFileSync(
    `${dirname(fileURLToPath(import.meta.url))}/../source.json`,
    { encoding: 'utf8' });
  const data = JSON.parse(stream);

  return Readable.from(JSON.stringify(data, null, 2));
}

const fetchURLStream = async () => {
  try {
    const res = await fetch(GAS_PRICES_URL);
    const data = await res.json();
    return Readable.from(JSON.stringify(data, null, 2));
  } catch (error) {
    console.error(error);
  }
}

const fetchGasData = async () => {
  try {
    // const res = await fetchURLStream();
    const res = await fetchFileStream();
    
    return res;
  } catch (error) {
    console.error(error);
  }
};

const transformData = new Transform({
  transform(chunk, encoding, callback) {
    try {
      const data = JSON.parse(chunk);
      const {
        Fecha: date,
        ListaEESSPrecio: list,
        ResultadoConsulta: status
      } = data;

      const eess = list.filter((es) => es.IDEESS === "15667")
        .map(transformGasFields);

      const response = {
        date: new Date(date).toISOString(),
        status,
        stations: eess,
      };
      console.log(data, response);
      callback(null, JSON.stringify(response, null, 2));
    } catch (error) {
      console.error(error);
    }
  }
});


const transformGasData = async (dataStream) => {
  try {
    pipeline(
      dataStream,
      transformData,
      writeStream,
      (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log("Data fetched and written to file");
        }
      });
  } catch (error) {
    console.error(error);
  }
};

const init = async () => {
  const gasData = await fetchGasData();
  await transformGasData(gasData);
};

await init();
