import dotenv from 'dotenv';

import { isTestEnv } from './utils/isTestEnv';

dotenv.config();

export interface Config {
  NODE_ENV: string;
  PAPERTRAIL_PORT: number;
  LOG_LEVEL: string;
  DB_NAME: string;
  DB_HOST: string;
  DB_PORT: number;
  DB_USER: string;
  DB_PASSWORD: string;
  FIREBASE_CONFIG: Record<string, string>;
  APP_URL: string;
  DEFAULT_ISSUER_DID: string;
  TEST_ISSUER_DID_1: string;
  TEST_ISSUER_DID_2: string;
}

const {
  NODE_ENV = 'development',
  PAPERTRAIL_PORT = '',
  LOG_LEVEL = 'debug',
  DB_NAME = '',
  DB_HOST = 'localhost',
  DB_PORT = '5432',
  DB_USER = '',
  DB_PASSWORD = '',
  TEST_DB_NAME = '',
  TEST_DB_HOST = 'localhost',
  TEST_DB_PORT = '5432',
  TEST_DB_USER = '',
  TEST_DB_PASSWORD = '',
  FIREBASE_CONFIG = '{}',
  APP_URL = 'api.corp.com',
  DEFAULT_ISSUER_DID = '',
  TEST_ISSUER_DID_1 = '',
  TEST_ISSUER_DID_2 = ''
} = process.env;

const dbConfig = isTestEnv(NODE_ENV)
  ? {
      DB_NAME: TEST_DB_NAME,
      DB_HOST: TEST_DB_HOST,
      DB_PORT: parseInt(TEST_DB_PORT, 10),
      DB_USER: TEST_DB_USER,
      DB_PASSWORD: TEST_DB_PASSWORD
    }
  : {
      DB_NAME,
      DB_HOST,
      DB_PORT: parseInt(DB_PORT, 10),
      DB_USER,
      DB_PASSWORD
    };

export const config: Config = {
  NODE_ENV,
  PAPERTRAIL_PORT: parseInt(PAPERTRAIL_PORT, 10),
  LOG_LEVEL,
  FIREBASE_CONFIG: JSON.parse(FIREBASE_CONFIG),
  APP_URL,
  DEFAULT_ISSUER_DID,
  TEST_ISSUER_DID_1,
  TEST_ISSUER_DID_2,
  ...dbConfig
};
