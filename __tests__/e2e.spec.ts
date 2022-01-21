import { ends, maskJSON, MaskKeyFn, portion } from '../src';

describe('e2e', () => {
  const json = {
    person: {
      dni: '123456789',
      address: {
        street: 'This is a fake address',
        streetNumber: '50',
      },
    },
    cardNumber: '1234567890',
  };

  const keys: MaskKeyFn = {
    dni: (value: string) => ends(value, 2, 2, '#'),
    street: (value: string) => portion(value, 7),
    cardNumber: (value: string) => portion(value, -4),
  };
  const result = maskJSON(json, keys);
  const expected = {
    person: {
      dni: '12#####89',
      address: {
        street: 'This is***************',
        streetNumber: '50',
      },
    },
    cardNumber: '******7890',
  };

  it('export as JSON string', () => {
    expect(result.toString()).toStrictEqual(JSON.stringify(expected));
  });

  it('export as JSON', () => {
    expect(result.toJSON<Record<string, unknown>>()).toStrictEqual(expected);
  });
});
