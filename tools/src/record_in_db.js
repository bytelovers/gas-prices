import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

import { GasPriceDb } from "gas-prices-db";

import { readFromFile } from "./helpers.js";
import { GAS_PRICES_DB_URL } from "./constants.js";

const readStreamData = async () => {
  const stream = readFromFile(
    `${dirname(fileURLToPath(import.meta.url))}/../resources/data_latest.json`
  );
  return stream;
};

export const init = async () => {
  const streamData = await readStreamData();
  let data = "";
  streamData.on("data", (chunk) => {
    data += chunk;
  });

  streamData.on("end", async () => {
    const res = JSON.parse(data);
    if (res.status === "OK") {
      try {
        const db = new GasPriceDb({
          connectionString: `${GAS_PRICES_DB_URL}/gas-prices`,
        });

        const { provinces, municipalities, stations, ccaas, prices} = res.data;

        const _prices = prices.map(p => ({
          ...p,
          date: res.date
        }));

        // await db.insertProvinces(provinces);
        // await db.insertMunicipalities(municipalities);
        // await db.insertCcaas(ccaas);
        // await db.insertStations(stations);
        // await db.insertStationPrices(_prices);
        // console.log(data)
      } catch (err) {
        console.error("Fallo en el stream", err.message);
      }
    }
  });
};

await init();
