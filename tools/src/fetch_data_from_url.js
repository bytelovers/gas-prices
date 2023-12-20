import fs from "node:fs";

import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

import { Readable, Transform, pipeline } from "node:stream";
import { Parser as CSVParser } from "@json2csv/plainjs";

import { GAS_PRICES_URL } from "./constants.js";
import { getGasDateTime } from "./helpers.js";
import { transformGasFields } from "./transformers.js";

const writeStream = fs.createWriteStream("data.json");

const fetchFileStream = async () => {
  const stream = fs.readFileSync(
    `${dirname(fileURLToPath(import.meta.url))}/../source.json`,
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

const fetchGasData = async () => {
  try {
    const res = await fetchURLStream();
    // const res = await fetchFileStream();

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
        .filter((es) => es.eessId === "15667")
        .map(transformGasFields);

      const response = {
        date: getGasDateTime(date).toISOString(),
        status,
        stations: eess,
      };
      // console.log(data, response);
      callback(null, JSON.stringify(response, null, 2));
    } catch (error) {
      console.error(error);
    }
  },
});

const generateGasData = async (dataStream) =>
  pipeline(dataStream, /*transformData,*/ writeStream, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("Data fetched and written to file");
    }
  });

export const init = async () => {
  const gasData = await fetchGasData();
  await generateGasData(gasData);
  // const stream = Readable.from(await generateGasData(gasData));
  
  let data = '';
  // stream.on('data', (chunk) => {
  //   data += chunk;
  // });

  // stream.on('end', () => {
  //   const jsonData = JSON.parse(data);
  //   // const parser = new CSVParser();
  //   // const csv = parser.parse(jsonData);
    
  //   fs.writeFileSync('test.json', JSON.stringify(jsonData));
  //   // fs.writeFileSync('data.csv', csv);
  //   //console.log(result);
  // });
  
};

