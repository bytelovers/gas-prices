import { Schema, } from "mongoose";

export const MunicipalitySchema = new Schema({
  municipalityId: String,
  municipality: String,
});

export const CcaaSchema = new Schema({
  ccaaId: String,
  // name: String,
});

export const ProvinceSchema = new Schema({
  provinceId: String,
  province: String,
});

export const StationSchema = new Schema({
  address: String,
  ccaaId: String,
  eessId: String,
  label: String,
  latitude: String,
  longitude: String,
  municipalityId: String,
  postalCode: String,
  provinceId: String,
  remission: String,
  saleType: String,
  schedule: String,
});

export const StationPriceSchema = new Schema({
  id: String,
  date: String,
  biodieselPrice: String,
  bioethanolPrice: String,
  compressedNaturalGasPrice: String,
  liquefiedNaturalGasPrice: String,
  liquefiedPetroleumGasesPrice: String,
  gasoleoAPrice: String,
  gasoleoBPrice: String,
  gasoleoPremiumPrice: String,
  gasoline95E10Price: String,
  gasoline95E5Price: String,
  gasoline95E5PremiumPrice: String,
  gasoline98E10Price: String,
  gasoline98E5Price: String,
  hydrogenPrice: String,
});
