# helplib

`helplib` is a modern, lightweight npm toolkit that provides useful utility functions for dates, formatting, and data generation.

## Installation

You can install the module using the [npm](https://www.npmjs.com/):

```sh
npm install helplib
```

## Table of Contents

- [Functions](#functions)
  - [Date functions](#date-functions)
    - [formatDate(date, format)](#formatdatedate-format)
    - [getDayOfWeek(date, locale)](#getdayofweekdate-locale)
    - [getMonthName(date, locale)](#getmonthnamedate-locale)
    - [getYearAndWeekNumber(date)](#getyearandweeknumberdate)
  - [Formatting functions](#formatting-functions)
    - [formatData(data, text)](#formatdatadata-text)
    - [formatString(text, ...params)](#formatstringtext-params)
  - [Generation functions](#generation-functions)
    - [generateId(length)](#generateidlength)
    - [generatePassword(length)](#generatepasswordlength)

---

## Functions

The module includes functions that are grouped into different categories. You can import them using ES Modules or CommonJS:

```typescript
// ES Modules / TypeScript
import { formatDate, generateId } from 'helplib';

// CommonJS
const { formatDate, generateId } = require('helplib');
```

### Date functions

#### `formatDate(date, format)`

Formats the given date object as a string using the specified format.

- **`date`**: The date object to format. If not provided, the current date and time will be used.
- **`format`**: The format string to use. Defaults to `M/d/y H:m:s`. *(M: Month, d: day, H: Hours, m: minutes, s: seconds, f: miliseconds, y: year)*

```javascript
console.log(formatDate()); // 02/19/2023 17:04:1
console.log(formatDate(new Date(), 'd/MM/y H:mm:s')); // 19/02/2023 17:04:1
console.log(formatDate(undefined, 'd/MM/y H:mm:s:f')); // 19/02/2023 17:04:1:95
```

#### `getDayOfWeek(date, locale)`

Gets the name of the day of the week for the given date object.

- **`date`**: The date object to get the day of the week for. If not provided, the current date.
- **`locale`**: The locale to use for the day of the week name. Defaults to `"en-US"`.

```javascript
console.log(getDayOfWeek()); // Sunday
console.log(getDayOfWeek(new Date(), 'en-US')); // Sunday
console.log(getDayOfWeek(undefined, 'tr-TR')); // Pazar
```

#### `getMonthName(date, locale)`

Gets the name of the month for the given date object.

- **`date`**: The date object to get the month name for. If not provided, the current date.
- **`locale`**: The locale to use for the month name. Defaults to `"en-US"`.

```javascript
console.log(getMonthName()); // February
console.log(getMonthName(new Date(), 'en-US')); // February
console.log(getMonthName(undefined, 'tr-TR')); // Şubat
```

#### `getYearAndWeekNumber(date)`

Gets the year and week number for the given date object.

- **`date`**: The date object to get the year and week number for. If not provided, the current date.

```javascript
console.log(getYearAndWeekNumber()); // { year: 2023, weekNumber: 7 }
```

### Formatting functions

#### `formatData(data, text)`

Replaces placeholders in a string with corresponding values from an object.

- **`data`**: The object containing the data to replace the placeholders with.
- **`text`**: The string containing placeholders.

```javascript
const data = { name: 'John Doe', age: 32, city: 'New York' };
const text = 'Hi, my name is {name} and I am {age} years old. I live in {city}.';

console.log(formatData(data, text)); 
// Hi, my name is John Doe and I am 32 years old. I live in New York.
```

#### `formatString(text, ...params)`

Replaces numbered placeholders in a string with values.

- **`text`**: The string containing placeholders (e.g., `{0}`, `{1}`).
- **`...params`**: The values to replace the placeholders with.

```javascript
const result = formatString("My name is {0}, I am {1} years old and I live in {2}.", "John Doe", 30, "USA");
console.log(result); // My name is John Doe, I am 30 years old and I live in USA.
```

### Generation functions

#### `generateId(length)`

Generates a unique ID.

- **`length`**: The length of the generated ID. Default is `11`. *(Note: Minimum length is 6, maximum length is 15).*

```javascript
console.log(generateId()); // 47545019992 => length = 11;
console.log(generateId(5)); // 014915 => length = 6;
console.log(generateId(16)); // 226306621525260 => length = 15;
```

#### `generatePassword(length)`

Generates a random password.

- **`length`**: The length of the generated password. Default is `8`. *(Note: Minimum length is 8).*

```javascript
console.log(generatePassword()); // i2o2a3My => length = 8;
console.log(generatePassword(7)); // fUYzWVZ0 => length = 8;
```

---

## License

`helplib` is released under the [MIT License](https://opensource.org/licenses/MIT).
