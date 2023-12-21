export const GAS_PRICES_URL = new URL(
  "https://sedeaplicaciones.minetur.gob.es/ServiciosRESTCarburantes/PreciosCarburantes/EstacionesTerrestres/"
);
export const GAS_PRICES_FILE =
  "file:///Users/e058901/Workspace/sideprojects/gas-prices/tools/source.json";


export const GAS_PRICES_DB_URL = 'mongodb://127.0.0.1:27017';


export const CANONICAL_FIELDS = {
  "% BioEtanol": "bioethanolPercentage",
  "% Éster metílico": "methylEsterPercentage",
  "C.P.": "postalCode",
  Dirección: "address",
  Horario: "schedule",
  IDCCAA: "ccaaId",
  IDEESS: "eessId",
  IDMunicipio: "municipalityId",
  IDProvincia: "provinceId",
  Latitud: "latitude",
  Localidad: "city",
  "Longitud (WGS84)": "longitude",
  Margen: "margin",
  Municipio: "municipality",
  "Precio Biodiesel": "biodieselPrice",
  "Precio Bioetanol": "bioethanolPrice",
  "Precio Gas Natural Comprimido": "compressedNaturalGasPrice",
  "Precio Gas Natural Licuado": "liquefiedNaturalGasPrice",
  "Precio Gases licuados del petróleo": "liquefiedPetroleumGasesPrice",
  "Precio Gasoleo A": "gasoleoAPrice",
  "Precio Gasoleo B": "gasoleoBPrice",
  "Precio Gasoleo Premium": "gasoleoPremiumPrice",
  "Precio Gasolina  98 Protección": "gasoline98ProtectionPrice",
  "Precio Gasolina  98": "gasoline98Price",
  "Precio Gasolina 95 E10": "gasoline95E10Price",
  "Precio Gasolina 95 E5 Premium": "gasoline95E5PremiumPrice",
  "Precio Gasolina 95 E5": "gasoline95E5Price",
  "Precio Gasolina 95 Protección": "gasoline95ProtectionPrice",
  "Precio Gasolina 95": "gasoline95Price",
  "Precio Gasolina 98 E10": "gasoline98E10Price",
  "Precio Gasolina 98 E5": "gasoline98E5Price",
  "Precio Hidrogeno": "hydrogenPrice",
  "Precio Nuevo Gasoleo A": "newGasoleoAPrice",
  Provincia: "province",
  Remisión: "remission",
  Rótulo: "label",
  "Tipo Venta Recomendado": "recommendedSaleType",
  "Tipo Venta": "saleType",
};

export const FIELDS = {
  ADDRESS: "address",
  BIODIESEL_PRICE: "biodieselPrice",
  BIOETHANOL_PERCENTAGE: "bioethanolPercentage",
  BIOETHANOL_PRICE: "bioethanolPrice",
  CCAA_ID: "ccaaId",
  CITY: "city",
  COMPRESSED_NATURAL_GAS_PRICE: "compressedNaturalGasPrice",
  EESS_ID: "eessId",
  GASOLEO_A_PRICE: "gasoleoAPrice",
  GASOLEO_B_PRICE: "gasoleoBPrice",
  GASOLEO_PREMIUM_PRICE: "gasoleoPremiumPrice",
  GASOLINE95_PRICE: "gasoline95Price",
  GASOLINE95E10_PRICE: "gasoline95E10Price",
  GASOLINE95E5_PRICE: "gasoline95E5Price",
  GASOLINE95E5PREMIUM_PRICE: "gasoline95E5PremiumPrice",
  GASOLINE95PROTECTION_PRICE: "gasoline95ProtectionPrice",
  GASOLINE98_PRICE: "gasoline98Price",
  GASOLINE98E10_PRICE: "gasoline98E10Price",
  GASOLINE98E5_PRICE: "gasoline98E5Price",
  GASOLINE98PROTECTION_PRICE: "gasoline98ProtectionPrice",
  HYDROGEN_PRICE: "hydrogenPrice",
  LABEL: "label",
  LATITUDE: "latitude",
  LIQUEFIED_NATURAL_GAS_PRICE: "liquefiedNaturalGasPrice",
  LIQUEFIED_PETROLEUM_GASES_PRICE: "liquefiedPetroleumGasesPrice",
  LONGITUDE: "longitude",
  MARGIN: "margin",
  METHYL_ESTER_PERCENTAGE: "methylEsterPercentage",
  MUNICIPALITY_ID: "municipalityId",
  MUNICIPALITY: "municipality",
  NEW_GASOLEO_A_PRICE: "newGasoleoAPrice",
  POSTAL_CODE: "postalCode",
  PROVINCE_ID: "provinceId",
  PROVINCE: "province",
  RECOMMENDED_SALE_TYPE: "recommendedSaleType",
  REMISSION: "remission",
  SALE_TYPE: "saleType",
  SCHEDULE: "schedule",
};

export const STATION_FIELDS = [
  FIELDS.ADDRESS,
  FIELDS.CCAA_ID,
  // FIELDS.CITY,
  FIELDS.EESS_ID,
  FIELDS.LABEL,
  FIELDS.LATITUDE,
  FIELDS.LONGITUDE,
  FIELDS.MUNICIPALITY_ID,
  // FIELDS.MUNICIPALITY,
  FIELDS.POSTAL_CODE,
  FIELDS.PROVINCE_ID,
  // FIELDS.PROVINCE,
  FIELDS.RECOMMENDED_SALE_TYPE,
  FIELDS.REMISSION,
  FIELDS.SALE_TYPE,
  FIELDS.SCHEDULE,
];

export const CCAA_FIELDS = [
  FIELDS.CCAA_ID,
];

export const MUNICIPALITY_FIELDS = [
  FIELDS.MUNICIPALITY_ID,
  FIELDS.MUNICIPALITY,
];

export const PROVINCE_FIELDS = [
  FIELDS.PROVINCE_ID,
  FIELDS.PROVINCE,
];


/*
{
      "C.P.": "02250",
      "Dirección": "AVENIDA CASTILLA LA MANCHA, 26",
      "Horario": "L-D: 07:00-22:00",
      "Latitud": "39,211417",
      "Localidad": "ABENGIBRE",
      "Longitud (WGS84)": "-1,539167",
      "Margen": "D",
      "Municipio": "Abengibre",
      "Precio Biodiesel": "",
      "Precio Bioetanol": "",
      "Precio Gas Natural Comprimido": "",
      "Precio Gas Natural Licuado": "",
      "Precio Gases licuados del petróleo": "",
      "Precio Gasoleo A": "1,449",
      "Precio Gasoleo B": "1,059",
      "Precio Gasoleo Premium": "",
      "Precio Gasolina 95 E10": "",
      "Precio Gasolina 95 E5": "1,549",
      "Precio Gasolina 95 E5 Premium": "",
      "Precio Gasolina 98 E10": "",
      "Precio Gasolina 98 E5": "",
      "Precio Hidrogeno": "",
      "Provincia": "ALBACETE",
      "Remisión": "dm",
      "Rótulo": "Nº 10.935",
      "Tipo Venta": "P",
      "% BioEtanol": "0,0",
      "% Éster metílico": "0,0",
      "IDEESS": "4375",
      "IDMunicipio": "52",
      "IDProvincia": "02",
      "IDCCAA": "07"
    },
    */