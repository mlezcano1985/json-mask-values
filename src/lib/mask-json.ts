interface MaskKeyFn {
  [k: string]: (value: string) => string;
}

interface Mask {
  toString(): string;
  toJSON<T>(): T;
}

const toString = (value: string) => (): string => value;

const toJSON =
  <T>(value: string) =>
  (): T =>
    JSON.parse(value) as T;

/**
 * Find keys into a JSON and mask its values.
 * @see {@link https://github.com/mlezcano1985/json-mask-values}
 * @example
 *```ts
 * import { ends, maskJSON, MaskKeyFn, portion } from '@mlezcano1985/json-mask-values';
 *
 * const json = {
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
 * const result = maskJSON(json, keys);
 * console.log(result.toJSON<Record<string, unknown>>());
 * console.log(result.toString());
 * ```
 * 
 * Output JSON:
 * ```json
 * {
     "person": {
       "dni": "12#####89",
       "address": {
         "street": "This is***************",
         "streetNumber": "50",
        },
       },
     "cardNumber": "******7890",
    }
 * ```
 *
 * Output JSON String:
 * ```
 * "{\"person\":{\"dni\":\"12#####89\",\"address\":{\"street\":\"This is***************\",\"streetNumber\":\"50\"}},\"cardNumber\":\"******7890\"}"
 * ```
 * 
 */
const maskJSON = (json: Record<string, unknown>, keys: MaskKeyFn): Mask => {
  let value = JSON.stringify(json);

  Object.keys(keys).forEach(k => {
    const pattern = `"${k}":"(.*?)"`;
    const regex = new RegExp(pattern, 'g');
    const r = regex.exec(value);
    if (r !== null) {
      const [, replace] = r;
      const maskValue = keys[k](replace);
      value = value.replace(replace, maskValue);
    }
  });

  return {
    toJSON: toJSON(value),
    toString: toString(value),
  };
};

export { maskJSON, Mask, MaskKeyFn };
