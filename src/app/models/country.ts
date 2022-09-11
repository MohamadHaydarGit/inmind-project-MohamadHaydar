export interface Country {
  name:         Name;
  tld?:         string[];
  cca2:         string;
  ccn3?:        string;
  cca3:         string;
  cioc?:        string;
  independent?: boolean;
  status:       Status;
  unMember:     boolean;
  currencies?:  Currencies;
  idd:          Idd;
  capital?:     string[];
  altSpellings: string[];
  region:       Region;
  subregion?:   string;
  languages?:   { [key: string]: string };
  translations: { [key: string]: Translation };
  latlng:       number[];
  landlocked:   boolean;
  borders?:     string[];
  area:         number;
  demonyms?:    Demonyms;
  flag:         string;
  maps:         Maps;
  population:   number;
  gini?:        { [key: string]: number };
  fifa?:        string;
  car:          Car;
  timezones:    string[];
  continents:   Continent[];
  flags:        CoatOfArms;
  coatOfArms:   CoatOfArms;
  startOfWeek:  StartOfWeek;
  capitalInfo:  CapitalInfo;
  postalCode?:  PostalCode;
}

export interface CapitalInfo {
  latlng?: number[];
}

export interface Car {
  signs?: string[];
  side:   Side;
}

export enum Side {
  Left = "left",
  Right = "right",
}

export interface CoatOfArms {
  png?: string;
  svg?: string;
}

export enum Continent {
  Africa = "Africa",
  Antarctica = "Antarctica",
  Asia = "Asia",
  Europe = "Europe",
  NorthAmerica = "North America",
  Oceania = "Oceania",
  SouthAmerica = "South America",
}

export interface Currencies {
  EUR?: Aed;
  GTQ?: Aed;
  CLP?: Aed;
  UYU?: Aed;
  KGS?: Aed;
  ZMW?: Aed;
  NZD?: Aed;
  GEL?: Aed;
  TTD?: Aed;
  KRW?: Aed;
  USD?: Aed;
  XOF?: Aed;
  MKD?: Aed;
  FJD?: Aed;
  MGA?: Aed;
  XCD?: Aed;
  AUD?: Aed;
  CRC?: Aed;
  DZD?: Aed;
  NIO?: Aed;
  ZWL?: Aed;
  RWF?: Aed;
  TRY?: Aed;
  TJS?: Aed;
  JMD?: Aed;
  GBP?: Aed;
  SHP?: Aed;
  AWG?: Aed;
  PKR?: Aed;
  BYN?: Aed;
  SBD?: Aed;
  SZL?: Aed;
  ZAR?: Aed;
  XPF?: Aed;
  MXN?: Aed;
  GGP?: Aed;
  CHF?: Aed;
  BWP?: Aed;
  ILS?: Aed;
  GNF?: Aed;
  KPW?: Aed;
  PHP?: Aed;
  TND?: Aed;
  XAF?: Aed;
  NGN?: Aed;
  JEP?: Aed;
  EGP?: Aed;
  JOD?: Aed;
  KMF?: Aed;
  LSL?: Aed;
  IDR?: Aed;
  CAD?: Aed;
  AMD?: Aed;
  FKP?: Aed;
  PAB?: Aed;
  LAK?: Aed;
  AZN?: Aed;
  KHR?: Aed;
  CUC?: Aed;
  CUP?: Aed;
  STN?: Aed;
  RSD?: Aed;
  VND?: Aed;
  LKR?: Aed;
  MAD?: Aed;
  MRU?: Aed;
  QAR?: Aed;
  SLL?: Aed;
  ISK?: Aed;
  GMD?: Aed;
  GYD?: Aed;
  ANG?: Aed;
  SEK?: Aed;
  TVD?: Aed;
  AED?: Aed;
  VES?: Aed;
  WST?: Aed;
  LBP?: Aed;
  TOP?: Aed;
  IMP?: Aed;
  BAM?: BAM;
  HTG?: Aed;
  SCR?: Aed;
  TZS?: Aed;
  DKK?: Aed;
  FOK?: Aed;
  ERN?: Aed;
  ETB?: Aed;
  MNT?: Aed;
  NPR?: Aed;
  SYP?: Aed;
  BND?: Aed;
  SGD?: Aed;
  SSP?: Aed;
  IQD?: Aed;
  ALL?: Aed;
  UGX?: Aed;
  BTN?: Aed;
  INR?: Aed;
  NAD?: Aed;
  OMR?: Aed;
  BDT?: Aed;
  DJF?: Aed;
  TWD?: Aed;
  MUR?: Aed;
  NOK?: Aed;
  THB?: Aed;
  HNL?: Aed;
  PYG?: Aed;
  LRD?: Aed;
  SOS?: Aed;
  GIP?: Aed;
  BSD?: Aed;
  MWK?: Aed;
  SAR?: Aed;
  LYD?: Aed;
  BOB?: Aed;
  PGK?: Aed;
  BBD?: Aed;
  BGN?: Aed;
  SDG?: BAM;
  TMT?: Aed;
  MMK?: Aed;
  BRL?: Aed;
  COP?: Aed;
  IRR?: Aed;
  MDL?: Aed;
  MOP?: Aed;
  CVE?: Aed;
  JPY?: Aed;
  BHD?: Aed;
  CKD?: Aed;
  MVR?: Aed;
  DOP?: Aed;
  CDF?: Aed;
  YER?: Aed;
  UAH?: Aed;
  CNY?: Aed;
  PEN?: Aed;
  SRD?: Aed;
  AFN?: Aed;
  HUF?: Aed;
  KWD?: Aed;
  KYD?: Aed;
  MYR?: Aed;
  GHS?: Aed;
  HRK?: Aed;
  CZK?: Aed;
  UZS?: Aed;
  BIF?: Aed;
  BZD?: Aed;
  KES?: Aed;
  KZT?: Aed;
  ARS?: Aed;
  HKD?: Aed;
  RON?: Aed;
  KID?: Aed;
  VUV?: Aed;
  AOA?: Aed;
  PLN?: Aed;
  MZN?: Aed;
  BMD?: Aed;
  RUB?: Aed;
}

export interface Aed {
  name:   string;
  symbol: string;
}

export interface BAM {
  name: string;
}

export interface Demonyms {
  eng:  Eng;
  fra?: Eng;
}

export interface Eng {
  f: string;
  m: string;
}

export interface Idd {
  root?:     string;
  suffixes?: string[];
}

export interface Maps {
  googleMaps:     string;
  openStreetMaps: string;
}

export interface Name {
  common:      string;
  official:    string;
  nativeName?: { [key: string]: Translation };
}

export interface Translation {
  official: string;
  common:   string;
}

export interface PostalCode {
  format: string;
  regex?: string;
}

export enum Region {
  Africa = "Africa",
  Americas = "Americas",
  Antarctic = "Antarctic",
  Asia = "Asia",
  Europe = "Europe",
  Oceania = "Oceania",
}

export enum StartOfWeek {
  Monday = "monday",
  Sunday = "sunday",
  Turday = "turday",
}

export enum Status {
  OfficiallyAssigned = "officially-assigned",
  UserAssigned = "user-assigned",
}
