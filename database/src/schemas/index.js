import { Schema, } from "mongoose";

export const Municipality = new Schema({
  id: String,
  name: String,
});

export const Ccaa = new Schema({
  id: String,
  name: String,
});

export const Province = new Schema({
  id: String,
  name: String,
});

export const Station = new Schema({
  address: String,
  ccaa: String,
  id: String,
  label: String,
  latitude: String,
  loingitude: String,
  municipality: Object,
  postalCode: String,
  province: String,
  remission: String,
  saleType: String,
  schedule: String,
});

export const StationPrice = new Schema({
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
