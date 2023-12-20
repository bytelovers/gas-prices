import fs from "node:fs";

import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

import { Readable, Transform, pipeline } from "node:stream";
import { Parser as CSVParser } from "@json2csv/plainjs";

import { getGasDateTime } from "./helpers.js";
import { transformGasData, transformGasFields } from "./transformers.js";
import { FIELDS } from "./constants.js";

//const writeStream = fs.createWriteStream("data.json");

const fetchFileStream = async () => {
  const stream = fs.readFileSync(
    `${dirname(fileURLToPath(import.meta.url))}/../resources/raw_data.json`,
    { encoding: "utf8" }
  );
  const data = JSON.parse(stream);

  return Readable.from(JSON.stringify(data, null, 2));
};

const fetchGasData = async () => {
  try {
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

      for (const [k, v] of Object.entries(response.data)) {
        if (v instanceof Map) {
          response.data[k] = Array.from(v)
        }
      }

      // console.log(data, response);
      callback(null, JSON.stringify(response, null, 2));
    } catch (error) {
      console.error(error);
    }
  },
});

const generateGasData = async (dataStream) =>
  pipeline(dataStream, transformData, /*writeStream,*/ (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("Data fetched and written to file");
    }
  });

export const init = async () => {
  const gasData = await fetchGasData();
  const stream = Readable.from(await generateGasData(gasData));
  
  let data = '';
  stream.on('data', (chunk) => {
    data += chunk;
  });

  stream.on('end', () => {
    const jsonData = JSON.parse(data);
    const dateFile = new Intl.DateTimeFormat('default',jsonData.date)
      .format().split('/').reverse().join('');
    // // const parser = new CSVParser();
    // // const csv = parser.parse(jsonData);
    
    fs.writeFileSync(`./resources/data_${dateFile}.json`, JSON.stringify(jsonData));
    // fs.writeFileSync('data.csv', csv);
    //console.log(result);
  });

  
};
