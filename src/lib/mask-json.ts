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
