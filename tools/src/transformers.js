import { GAS_PRICES_FIELDS } from './constants.js';

export const transformGasFields = (gasFields) => {
    const renamedObj = {};
    const prices = {};
    for (const [k, v] of Object.entries(gasFields)) {
      if ( k.includes('Precio') ) {
        prices[GAS_PRICES_FIELDS[k] || k] = v;
      } else {
        renamedObj[GAS_PRICES_FIELDS[k] || k] = v;
      }
    }
    return { ...renamedObj, prices };
}