# JSON-MASK-VALUES

![GitHub Workflow Status](https://github.com/mlezcano1985/json-mask-values/actions/workflows/npm-publish.yml/badge.svg)
![GitHub release (latest by date including pre-releases)](https://img.shields.io/github/v/release/mlezcano1985/json-mask-values?include_prereleases)
![npm](https://img.shields.io/npm/v/@mlezcano1985/json-mask-values)
![GitHub](https://img.shields.io/github/license/mlezcano1985/json-mask-values)

Find keys into a JSON and mask its values.

:white_check_mark: JS and TS compatibility.

## How to mask values inside a JSON?

You need to create a dictionary where the key is the name of the key in the json and the value is the function that is going to mask the value in the JSON. This function receives as a parameter the value of the JSON key to mask.

The functions to mask json values is called _plugins_. This tools has two plugins:

- portion: Masks a section of the string. You must specify how many characters you want to leave visible. If the value is positive it will be to the left and if it is negative it will be to the right.
- ends: Masks the center of the string. You must specify how many characters you want to leave visible on the right and on the left.
- date: Masks a date string.
- email: Masks an email address.

All plugins use the default character `*` to mask the string. But you can use whatever you want. See [How to use it?](#how-to-use-it) section.

You may use custom functions to mask a string.

## How to install?

```sh
npm i -P @mlezcano1985/json-mask-values
```

## How to use it?

```ts
import {
  ends,
  maskJSON,
  MaskKeyFn,
  portion,
  date,
  email,
} from '@mlezcano1985/json-mask-values';

// Original JSON
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

// Dictionary of keys to mask
const keys: MaskKeyFn = {
  dni: (value: string) => ends(value, 2, 2, '#'), // Mask the dni value in the JSON. The value parameter is "123456789". The character # is used to mask the string. Leave visible the 2 first and 2 last characters.
  street: (value: string) => portion(value, 7), // Mask the street value in the JSON. The value parameter is "This is a fake address". Leave visible the first 7 characters
  cardNumber: (value: string) => portion(value, -4), // Mask the cardNumber value in the JSON. The value parameter is "1234567890". Leave visible the last 4 characters.
  birthdate: (value: string) => date(value),
  expireIn: (value: string) => date(value, '#'),
  email: (value: string) => email(value),
};

const result = maskJSON(json, keys);
console.log(result.toJSON<Record<string, unknown>>()); // Export result as JSON
console.log(result.toString()); // Export result as json string
```

Output JSON:

```json
{
  "person": {
    "dni": "12#####89",
    "address": {
      "street": "This is***************",
      "streetNumber": "50"
    },
    "birthdate": "***0-*9-*0",
    "email": "te**@e****.c**"
  },
  "cardNumber": "******7890",
  "expireIn": "1/3/###4"
}
```

Output String:

```
{"person":{"dni":"12#####89","address":{"street":"This is***************","streetNumber":"50"},"birthdate":"***0-*9-*0","email":"te**@e****.c**"},"cardNumber":"******7890","expireIn":"1/3/###4"}
```

## Feedbacks

Something to report? let me know here :point_right: [Twitter](https://twitter.com/mlezcano1985).

If you believe you have found an issue, please report it using the [GitHub issue tracker](https://github.com/mlezcano1985/rut/issues), or better yet, create a PR with the changes.

If you're using this package, I'd love to hear your thoughts. Thanks!
