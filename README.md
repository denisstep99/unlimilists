# Unlimilists
Unlimilists is a way to create unlimited array-like objects. 
All objects created using Unlimilsts constructor don't store their values but calculate at the moment of accessing the array field. 

## Getting started
This section explains how to get started with Unlimilists. First of all install it.

```
npm i unlimilists
```

Then you can import it.

```javascript
import {Ulist} from 'unlimilists';
```

Create a new Ulist by passing a formula to the constructor. You can use `n` variable in your 
formula, and it will be changed to current array index.

```javascript
import {Ulist} from "./index.js";

const ulist = new Ulist('2*n + 1*n^3 - 0.2*n^4');

// calculate element of Ulist with index 10
const tenthElement = ulist[10]; // 2*10 + 10**3 - 0.2*10**4 = -980
```

## API Ulist

#### constructor
Gets an initial formula which is calculated every time the user tries to get an element by index. 
The second parameter turns on memoization.

Available operations:
- `*` - multiply
- `+` - add
- `-` - subtract
- `/` - divide
- `^` - power

**Examples**
```javascript
const ulist_1 = new Ulist('2 * (2 - 4)'); // [-4, -4, -4, ....]
const ulist_2 = new Ulist('2*n + 1*n^3 - 0.2*n^4'); // [0, 2.8, 8.8, 16.8, ....]

const ulist_3 = new Ulist('2*n', true); // [0, 2, 4, 6, ...] memoization is turned on
```

#### getFormula
Returns an initial formula.

**Example**
```javascript
const ulist_1 = new Ulist('2 * (2 - 4)'); // [-4, -4, -4, ....]
const formula = ulist_1.getFormula(); // 2 * (2 - 4)
```

#### slice

firstIndex: number  
lastIndex: number  
step?: number (default = 1)

Returns an array with elements from firstIndex to lastIndex (lastIndex is not included).

**Example**
```javascript
const ulist_1 = new Ulist('2 * (2 - 4*n)'); 

const array_1 = ulist_1.slice(0, 5); // [ 4, -4, -12, -20, -28 ]
const array_2 = ulist_1.slice(0, 10, 2); // [ 4, -12, -28, -44, -60 ]
```

#### power, divide, multiply, subtract, add

anotherList: Ulist | number;

Modifies the current Ulist's formula.