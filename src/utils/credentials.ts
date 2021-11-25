import { UnumDto, issueCredentials as sdkIssueCredentials, issueCredentials } from '@unumid/server-sdk';
import { CredentialData, CredentialPb, CredentialSubject } from '@unumid/types';
import { IssuerEntity } from '../entities/Issuer';
import logger from '../logger';
import { formatBearerToken } from './formatBearerToken';

export interface EmailCredentialSubject extends CredentialSubject {
    type: 'EmailCredential'
    email: string;
  }

export interface AuthCredentialSubject extends CredentialSubject {
    type: 'DemoAuthCredential'
    isAuthorized: true;
    userUuid: string;
    userEmail: string;
}

export interface KYCCredentialSubject extends CredentialSubject {
    type: 'KYCCredential',
    firstName: string;
    lastName: string;
    ssn4: number;
    contactInformation: {
        emailAddress: string;
        phoneNumber: string;
        homeAddress: {
        line1: string;
        city: string;
        state: string;
        zip: number;
        country: string;
        }
    },
    driversLicense: {
        state: string;
        number: string;
        expiration: string;
    },
    accounts: {
        checking: {
        accountNumber: string;
        routingNumber: string;
        }
    },
    confidence: string;
}

export type ValidCredentialTypes = EmailCredentialSubject | AuthCredentialSubject | KYCCredentialSubject;

export const buildAuthCredentialSubject = (did: string, userUuid: string, userEmail: string): AuthCredentialSubject => ({
  type: 'DemoAuthCredential',
  id: did,
  isAuthorized: true,
  userUuid,
  userEmail
});

export const buildEmailCredentialSubject = (did: string, userEmail: string): EmailCredentialSubject => ({
  type: 'EmailCredential',
  id: did,
  email: userEmail
});

export const buildKYCCredentialSubject = (did: string, firstName: string): KYCCredentialSubject => ({
  type: 'KYCCredential',
  id: did,
  firstName,
  lastName: 'Hendricks',
  ssn4: 4321,
  contactInformation: {
    emailAddress: 'richard@piedpiper.net',
    phoneNumber: '1073741824',
    homeAddress: {
      line1: '5320 Newell Rd',
      city: 'Palo Alto',
      state: 'CA',
      zip: 94303,
      country: 'United States'
    }
  },
  driversLicense: {
    state: 'CA',
    number: '6383736743891101',
    expiration: '2026-01-14T00:00:00.000Z'
  },
  accounts: {
    checking: {
      accountNumber: '543888430912',
      routingNumber: '021000021'
    }
  },
  confidence: '99%'
});

export const issueCredentialsHelper = async (
  issuerEntity: IssuerEntity,
  credentialSubject: string,
  credentialDataList: CredentialData[]
): Promise<UnumDto<CredentialPb[]>> => {
  let authCredentialResponse;

  try {
    authCredentialResponse = await issueCredentials(
      formatBearerToken(issuerEntity.authToken),
      issuerEntity.issuerDid,
      credentialSubject,
      credentialDataList,
      issuerEntity.privateKey
    );

    return authCredentialResponse as UnumDto<CredentialPb[]>;
  } catch (e) {
    logger.error(`issueCredentials caught an error thrown by the server sdk. ${e}`);
    throw e;
  }
};