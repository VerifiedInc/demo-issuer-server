import { Credential } from '@unumid/types';

export const dummyCredential: Credential = {
  '@context': [
    'https://www.w3.org/2018/credentials/v1'
  ],
  credentialStatus: {
    id: 'https://api.dev-unumid.org//credentialStatus/9e90a492-3360-4beb-b3ca-e8eff1ec6e2a',
    type: 'CredentialStatus'
  },
  credentialSubject: {
    id: 'did:unum:54ca4b1f-fe7e-43ce-a4e4-8ec178f16a65',
    firstName: 'Wile',
    middleInitial: 'E.',
    lastName: 'Coyote',
    username: 'Central-value-added-908',
    ssn4: 4321,
    contactInformation: {
      emailAddress: 'AnvilAvoider@gmail.com',
      phoneNumber: '1234567890',
      homeAddress: {
        line1: '98765 Runner Rd.',
        city: 'Desert',
        state: 'AZ',
        zip: 12345,
        country: 'United States'
      }
    },
    driversLicense: {
      state: 'AZ',
      number: 'n-123456789',
      expiration: '2026-01-14T00:00:00.000Z'
    },
    accounts: {
      checking: {
        accountNumber: '543888430912',
        routingNumber: '021000021'
      }
    },
    confidence: '99%'
  },
  issuer: 'did:unum:2e05967f-216f-44c4-ae8e-d6f71cd17c5a',
  type: [
    'VerifiableCredential',
    'BankIdentityCredential'
  ],
  id: '9e90a492-3360-4beb-b3ca-e8eff1ec6e2a',
  issuanceDate: new Date('2021-02-08T21:18:23.403Z'),
  expirationDate: new Date('2022-02-08T00:00:00.000Z'),
  proof: {
    created: '2021-02-08T21:18:23.403Z',
    signatureValue: 'iKx1CJMheLAPr3H1T4TDH13h7xTVeunAhTy6ochNjxteHbb7X7J951idkvR8ZCxfvoz85JHwTpiNXFBYUB842UhWcTCS4JEhcf',
    unsignedValue: '{\'@context\':[\'https://www.w3.org/2018/credentials/v1\'],\'credentialStatus\':{\'id\':\'https://api.dev-unumid.org//credentialStatus/9e90a492-3360-4beb-b3ca-e8eff1ec6e2a\',\'type\':\'CredentialStatus\'},\'credentialSubject\':{\'accounts\':{\'checking\':{\'accountNumber\':\'543888430912\',\'routingNumber\':\'021000021\'}},\'confidence\':\'99%\',\'contactInformation\':{\'emailAddress\':\'AnvilAvoider@gmail.com\',\'homeAddress\':{\'city\':\'Desert\',\'country\':\'United States\',\'line1\':\'98765 Runner Rd.\',\'state\':\'AZ\',\'zip\':12345},\'phoneNumber\':\'1234567890\'},\'driversLicense\':{\'expiration\':\'2026-01-14T00:00:00.000Z\',\'number\':\'n-123456789\',\'state\':\'AZ\'},\'firstName\':\'Wile\',\'id\':\'did:unum:54ca4b1f-fe7e-43ce-a4e4-8ec178f16a65\',\'lastName\':\'Coyote\',\'middleInitial\':\'E.\',\'ssn4\':4321,\'username\':\'Central-value-added-908\'},\'expirationDate\':\'2022-02-08T00:00:00.000Z\',\'id\':\'9e90a492-3360-4beb-b3ca-e8eff1ec6e2a\',\'issuanceDate\':\'2021-02-08T21:18:23.403Z\',\'issuer\':\'did:unum:2e05967f-216f-44c4-ae8e-d6f71cd17c5a\',\'type\':[\'VerifiableCredential\',\'BankIdentityCredential\']}',
    type: 'secp256r1Signature2020',
    verificationMethod: 'did:unum:2e05967f-216f-44c4-ae8e-d6f71cd17c5a',
    proofPurpose: 'AssertionMethod'
  }
};
