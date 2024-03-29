import { Hook } from '@feathersjs/feathers';
import { BadRequest } from '@feathersjs/errors';
import { registerIssuer } from '@unumid/server-sdk';

import { IssuerEntityOptions } from '../../../entities/Issuer';
import logger from '../../../logger';
import { config } from '../../../config';
import { VersionInfo } from '@unumid/types/build/protos/verifier';

export const validateIssuerCreateOptions: Hook<IssuerEntityOptions> = (ctx) => {
  const { data } = ctx;

  if (!data) {
    throw new BadRequest('data is required.');
  }

  const { apiKey, issuerCustomerUuid } = data;

  if (!apiKey) {
    throw new BadRequest('apiKey is required.');
  }

  if (!issuerCustomerUuid) {
    throw new BadRequest('issuerCustomerUuid is required.');
  }

  return ctx;
};

export const registerIssuerHook: Hook<IssuerEntityOptions> = async (ctx) => {
  const { data } = ctx;

  // this shouldn't be necessary at runtime, as the validateIssuerCreateOptions hook should always be run first
  // but we do need it as a typeguard to tell the compiler that data is guaranteed to be defined for the rest of the function
  if (!data) {
    throw new BadRequest();
  }
  const { apiKey } = data;

  try {
    // use the server sdk to generate keys and register the issuer with the saas
    const response = await registerIssuer(apiKey, config.APP_URL);
    const { body, authToken } = response;

    // format the response from the sdk to match the way we represent issuers in this application
    const {
      uuid,
      customerUuid,
      did,
      name,
      createdAt,
      updatedAt,
      isAuthorized,
      keys
    } = body;

    const issuerEntityOptions = {
      issuerUuid: uuid,
      issuerCustomerUuid: customerUuid,
      issuerDid: did,
      issuerName: name,
      issuerCreatedAt: createdAt,
      issuerUpdatedAt: updatedAt,
      issuerIsAuthorized: isAuthorized,
      privateKey: keys.signing.privateKey,
      authToken,
      apiKey
    };

    return {
      ...ctx,
      data: issuerEntityOptions
    };
  } catch (e) {
    logger.error('error registering issuer', e);
    throw e;
  }
};

export const hooks = {
  before: {
    create: [validateIssuerCreateOptions, registerIssuerHook]
  }
};
