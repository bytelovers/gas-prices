import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

import { readFromFile } from './helpers.js';

const readStreamData = async () => {
  const stream = readFromFile(`${dirname(fileURLToPath(import.meta.url))}/../resources/data_latest.json`);
  return stream;
}

export const init = async() => {
  const streamData = await readStreamData()
  let data = '';
  streamData.on('data', chunk => {
    data += chunk;
  });

  streamData.on('end', () => {
    console.log(JSON.parse(data));
    console.log(data)
  })

}

await init();