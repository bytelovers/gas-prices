import { model } from 'mongoose';
import * as schemas from '../schemas';

export const MunicipalityModel = model('Municipality', schemas.Municipality);
export const CcaaModel = model('Ccaa', schemas.Ccaa);
export const ProvinceModel = model('Province', schemas.Province);
export const StationModel = model('Station', schemas.Station);
export const StationPriceModel = model('StationPrice', schemas.StationPrice);