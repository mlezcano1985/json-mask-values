import { ends, maskJSON, MaskKeyFn, portion, date, email } from '../src';

describe('e2e', () => {
  const json = {
    person: {
      dni: '123456789',
      address: {
        street: 'This is a fake address',
        streetNumber: '50',
      },
      birthdate: '1990-09-10',
      email: 'test@email.com',
    },
    cardNumber: '1234567890',
    expireIn: '1/3/2024',
  };

  const keys: MaskKeyFn = {
    dni: (value: string) => ends(value, 2, 2, '#'),
    street: (value: string) => portion(value, 7),
    cardNumber: (value: string) => portion(value, -4),
    birthdate: (value: string) => date(value),
    expireIn: (value: string) => date(value, '#'),
    email: (value: string) => email(value),
  };
  const result = maskJSON(json, keys);
  const expected = {
    person: {
      dni: '12#####89',
      address: {
        street: 'This is***************',
        streetNumber: '50',
      },
      birthdate: '***0-*9-*0',
      email: 'te**@e****.c**',
    },
    cardNumber: '******7890',
    expireIn: '1/3/###4',
  };

  it('export as JSON string', () => {
    expect(result.toString()).toStrictEqual(JSON.stringify(expected));
  });

  it('export as JSON', () => {
    expect(result.toJSON<Record<string, unknown>>()).toStrictEqual(expected);
  });
});
