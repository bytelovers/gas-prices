import { GAS_PRICES_FIELDS } from './constants.js';

export const transformGasFields = (gasFields) => {
    const renamedObj = {};
    for (const [k, v] of Object.entries(gasFields)) {
      renamedObj[GAS_PRICES_FIELDS[k] || k] = v;
    }
    return renamedObj;
}