import fs from "node:fs";

import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

import { Readable, Transform, pipeline } from "node:stream";
import { Parser as CSVParser } from "@json2csv/plainjs";

import { FIELDS, GAS_PRICES_URL } from "./constants.js";
import { formatDateStr, getGasDateTime } from "./helpers.js";
import { transformGasData, transformGasFields } from "./transformers.js";

const fetchFileStream = async () => {
  const stream = fs.readFileSync(
    `${dirname(fileURLToPath(import.meta.url))}/../resources/raw_data.json`,
    { encoding: "utf8" }
  );
  const data = JSON.parse(stream);

  return Readable.from(JSON.stringify(data, null, 2));
};

const fetchURLStream = async () => {
  try {
    const res = await fetch(GAS_PRICES_URL);
    const data = await res.json();
    return Readable.from(JSON.stringify(data, null, 2));
  } catch (error) {
    console.error(error);
  }
};

const fetchGasData = async ({ type }) => {
  try {
    const types = {
      'url': fetchURLStream,
      'file': fetchFileStream
    }
    const res = await types[type]();

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
        ResultadoConsulta: status,
      } = data;

      const eess = list
        .map(transformGasFields)
        // .filter((es) => es[FIELDS.EESS_ID] === "15667"); // EESS San fernando

      const response = {
        date: getGasDateTime(date).toISOString(),
        status,
        data: transformGasData(eess)
      };

      callback(null, JSON.stringify(response, null, 2));
    } catch (error) {
      console.error(error);
    }
  },
});

const generateGasData = async (dataStream) =>
  pipeline(dataStream, transformData, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("Data fetched and written to file");
    }
  });

export const init = async (options = {}) => {
  const gasData = await fetchGasData(options);
  const stream = Readable.from(await generateGasData(gasData));
  
  let data = '';
  stream.on('data', (chunk) => {
    data += chunk;
  });

  stream.on('end', () => {
    const jsonData = JSON.parse(data);
    const dateFile = formatDateStr(jsonData.date);

    fs.writeFileSync(`./resources/data_${dateFile}.json`, JSON.stringify(jsonData));
    fs.writeFileSync(`./resources/data_latest.json`, JSON.stringify(jsonData));
  });
};
