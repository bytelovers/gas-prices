import { model } from 'mongoose';
import * as schemas from '../schemas/index.js';

export const Municipality = model('Municipality', schemas.MunicipalitySchema);
export const Ccaa = model('Ccaa', schemas.CcaaSchema);
export const Province = model('Province', schemas.ProvinceSchema);
export const Station = model('Station', schemas.StationSchema);
export const StationPrice = model('StationPrice', schemas.StationPriceSchema);