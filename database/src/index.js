import mongoose from "mongoose";

import * as models from './models/index.js';

class MongoDatabase {
  constructor(options) {
    this._options = options;
    this.isConnected = false;
  }

  async connect(uri) {
    try {
      const _uri = uri || this._options.connectionString;
      await mongoose.connect(_uri);
      this.isConnected = true;
      console.log('Connected to the database');
    } catch (error) {
      console.error('Error connecting to the database:', error.message);
      throw error;
    }
  }

  async disconnect() {
    await mongoose.disconnect();
    this.isConnected = false;
  }
}

export class GasPriceDb extends MongoDatabase {
  constructor(options) {
    super(options);
  }

  async insertProvinces(provinces = []) {
    try {
      await this.connect();
      await models.Province.createCollection();
      await models.Province.insertMany(provinces);
    } catch (err) {
      this.onError(err);
    } finally {
      await this.disconnect();
    }
  }

  async insertMunicipalities(municipalities = []) {
    try {
      await this.connect();
      await models.Municipality.createCollection();
      await models.Municipality.insertMany(municipalities);
    } catch (err) {
      this.onError(err);
    } finally {
      await this.disconnect();
    }
  }

  async insertStations(stations = []) {
    try {
      await this.connect();
      await models.Station.createCollection();
      await models.Station.insertMany(stations);
    } catch (err) {
      this.onError(err);
    } finally {
      await this.disconnect();
    }
  }

  async insertStationPrices(stations = []) {
    try {
      await this.connect();
      await models.StationPrice.createCollection();
      await models.StationPrice.insertMany(stations);
    } catch (err) {
      this.onError(err);
    } finally {
      await this.disconnect();
    }
  }

  async insertCcaas(ccaas = []) {
    try {
      await this.connect();
      await models.Ccaa.updateMany({}, {})
      await models.Ccaa.insertMany(ccaas);
    } catch (err) {
      this.onError(err);
    } finally {
      await this.disconnect();
    }
  }

  onError(err) {
    console.error('Algo fallo', err.message)
  }
}
