# 함수형 자바스크립트 기본기

## 평가(Evaluation)

- 코드가 계산되어 값을 만듬

## 일급(First-class)

- 값으로 다룰수 있음
- 변수에 담을 수 있음
- 함수의 인자로 사용 가능
- 함수의 결과로 사용 가능

## 일급 함수(First-class function)

- 함수도 하나의 값으로 다룰 수 있다.
- 조합성과 추상화?

## 고차 함수(Higher-order function)

- 함수를 값으로 다루는 함수
- 함수를 인자로 받아서 실행하는 함수
  - apply1
  ```js
  const apply1 = (f) => f(1);
  const add2 = (a) => a + 2;
  log(apply1(add2));
  log(apply1((a) => a - 1));
  ```
  -times;
  ```js
  const times = (f, n) => {
    let i = -1;
    while (++i < n) f(i);
  };
  times(log, 3);
  times((a) => log(a + 10), 3);
  ```
- 함수(Closure)를 만들어 리턴하는 함수(currying?)
  - addMaker
  ```js
  addMaker = (a) => (b) => a + b; // Closure: 기억 된 환경 a와 {a+b} 라는 함수를 통칭
  const add10 = addMaker(10);
  log(add10(5));
  log(add10(10));
  ```

# ES6에서의 순회와 이터러블:이터레이터 프로토콜

## for ~ of

```js
for (const a of list) {
  log(a);
}
```

## Iterable Objects - Array, Set, Map

- Symbol.iterator를 key 로 사용하여 접근 가능

```ts
const arr = [1, 2, 3];
let iter1 = arr[Symbol.iterator]();
iter1.next();
for (const a of iter1) log(a);
// => 2, 3

const set = new Set([1, 2, 3]);
for (const a of set) log(a);

const map = new Map([
  ["a", 1],
  ["b", 2],
  ["c", 3],
]);
for (const a of map.keys()) log(a);
for (const a of map.values()) log(a);
for (const a of map.entries()) log(a);
const it = map.values(); // return 값이 array 이고 Symbol.iterator를 key로 가짐
it2 = it[Symbol.iterator](); // 다시 iterator return 가능
for (const a of it2) log(a);
```

## Iterable/Iterator Protocol

- Iterable: [Symbol.iterator]() method 통해 Iterator를 return
- Iterator: next() method를 통해 {value, done} object를 return
- Iterable/Iterator Protocol: Iterable을 for...of, 전개 연산자 등과 함께 동작하도록 한 규약
- ImmutableJs(Facebook), DOM 등 많은 Open source 들도 iterable protocol을 따르고 있음
  - eg) `for (const a of document.querySelectorAll('*')) log(a);`
- 전개연산자(Spread syntax) ... 역시 Iterable

## 사용자 정의 iterable

```js
const iterable = {
  [Symbol.iterator]() {
    let i = 3;
    return {
      next() {
        return i === 0 ? { done: true } : { value: i--, done: false };
      },
      [Symbol.iterator]() {
        return this;
      }, // 자기 자신을 iterable하게 반환할 수 있어야 진정한 iterable => next로 진행 되던 상태를 기억
    };
  },
};
let iterator = iterable[Symbol.iterator]();
log(iterator.next());
log(iterator.next());
for (const a of iterator) log(a);
```

# 제너레이터와 이터레이터

## Generator

- Iterator인 Iterable(Well-formed iterator)을 생성하는 함수
- 문장 처럼 순회, 산출 한다 => 어떠한 값도 generator 통해 순회할 수 있다.(다형성⬆️)

```js
function* gen() {
  yield 1;
  if (false) yield 2;
  yield 3;
  return 100;
}
let iter = gen();
log(iter[Symbol.iterator]() == iter);
log(iter.next());
```

## odds with generator

```js
function* infinity(i = 0) {
  while (true) yield i++;
}
function* limit(l, iter) {
  for (const a of iter) {
    yield a;
    if (a == l) return;
  }
}
function* odds(l) {
  for (const a of limit(l, infinity(1))) {
    if (a % 2) yield a;
  }
}
let iter2 = odds(10);
console.log(iter2.next());
for (const a of iter2) console.log(a);
```

## for of, spread, Destructuring, rest 모두 사용 가능

```ts
// spread
console.log(...odds(10));
console.log([...odds(10), ...odds(20)]);

const [head, ...tail] = odds(5);
console.log(head);
console.log(tail);

// destructuring with rest
const [a, b, ...rest] = odds(10);
console.log(a);
console.log(b);
console.log(rest);
```

# map, filter, reduce

## map

### 함수형프로그래밍은...

- 외부의 함수를 호출하는 것이 아니라
- 인자와 return 앞으로 소통하는 것을 권장한다.

```js
const products = [
  { name: "반팔티", price: 15000 },
  { name: "긴팔티", price: 20000 },
  { name: "핸드폰케이스", price: 15000 },
  { name: "후드티", price: 30000 },
  { name: "바지", price: 25000 },
];

// legacy iteration
let names = [];
for (const p of products) {
  names.push(p.name);
}
console.log(names);

// functional map
const map = (f, iter) => {
  let res = [];
  for (const a of iter) {
    res.push(f(a));
  }
  return res;
};
console.log(map((p) => p.name, products));
```

## Iterable map의 다형성

1. DOM 가능

```js
console.log(map((el) => el.nodeName, document.querySelectorAll("*")));
```

2. generator도 가능

```js
function* gen() {
  yield 2;
  if (false) yield 3;
  yield 4;
}
console.log(map((a) => a * a, gen()));

let m = new Map();
m.set("a", 10);
m.set("b", 20);
console.log(new Map(map(([k, a]) => [k, a * 2], m)));
```

## Filter

```js
const products = [
  { name: "반팔티", price: 15000 },
  { name: "긴팔티", price: 20000 },
  { name: "핸드폰케이스", price: 15000 },
  { name: "후드티", price: 30000 },
  { name: "바지", price: 25000 },
];

const filter = (f, iter) => {
  let res = [];
  for (const a of iter) {
    if (f(a)) res.push(a);
  }
  return res;
};

console.log(filter((p) => p.price > 20000, products));
console.log(filter((n) => n % 2, [1, 2, 3, 4]));
console.log(
  filter(
    (n) => n % 2,
    (function* () {
      yield 1;
      yield 2;
      yield 3;
      yield 4;
      yield 5;
    })()
  )
);
```

## Reduce

```js
const nums = [1, 2, 3, 4, 5];
let total = 0;
for (const n of nums) {
  total = total + n;
}
console.log(total);

const reduce = (f, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  }
  for (const x of iter) {
    acc = f(acc, x);
  }
  return acc;
};
console.log(reduce((a, b) => a + b, nums));

const products = [
  { name: "반팔티", price: 15000 },
  { name: "긴팔티", price: 20000 },
  { name: "핸드폰케이스", price: 15000 },
  { name: "후드티", price: 30000 },
  { name: "바지", price: 25000 },
];
console.log(
  reduce((total_price, product) => total_price + product.price, 0, products)
  // products[0] 은 object이므로 init acc 지정 필요
);
```

## map + fileter + reduce

```js
const add = (a, b) => a + b;
log(
  reduce(
    add,
    map(
      (p) => p.price,
      filter((p) => p.price < 20000, products)
    )
  )
);
```

# 코드를 값으로 다루어 표현력 높이기

## go & pipe

- 코드를 값으로: 평가하는 시점을 원하는 대로 다룰 수 있다 => 코드의 표현력, 가독성을 높임

```js
const go = (...args) => reduce((a, f) => f(a), args);
const pipe = (f, ...fs) => (...args) => go(f(...args), ...fs); // fs = functions...
const add = (a, b) => a + b;
go(
  add(0, 1),
  (a) => a + 1,
  (a) => a + 10,
  (a) => a + 100,
  log
); // 111
const f = pipe(
  add,
  (a) => a + 1,
  (a) => a + 10,
  (a) => a + 100,
  log
);
f(0, 1); // 111

go(
  products,
  (products) => filter((p) => p.price < 20000, products),
  (products) => map((p) => p.price, products),
  (prices) => reduce(add, prices),
  log
);
```

## Curry

```js
const curry = (f) => (a, ..._) =>
  _.length ? f(a, ..._) : (..._) => f(a, ..._);

const mult = curry((a, b) => a * b);
log(mult(3)(2));
const mult3 = mult(3);
log(mult3(5));
log(mult3(10));
```

### 3단변화 reduce => go => curry

```js
// reduce로 묶어 처리
log(
  reduce(
    add,
    map(
      (p) => p.price,
      filter((p) => p.price < 20000, products)
    )
  )
);

// go 를 통해 순서를 바꿈
go(
  products,
  (products) => filter((p) => p.price < 20000, products),
  (products) => map((p) => p.price, products),
  (prices) => reduce(add, prices),
  log
);

// curry를 씌운 filter, map, reduce는 function return 하므로 앞의 array를 바로바로 받을 수 있다.
go(
  products,
  filter((p) => p.price < 20000),
  map((p) => p.price),
  reduce(add),
  log
);
```

## 함수 조합으로 함수 만들기

```js
const total_price = pipe(
  map((p) => p.price),
  reduce(add)
);

const base_total_price = (predicate) => pipe(filter(predicate), total_price);

go(
  products,
  base_total_price((p) => p.price < 20000),
  log
);

go(
  products,
  base_total_price((p) => p.price >= 20000),
  log
);
```

## 총수량, 총가격

```js
const sum = curry((f, iter) => go(iter, map(f), reduce(add)));

const total_quantity = sum((p) => p.quantity);
log(total_quantity(products));
const total_price = sum((p) => p.price * p.quantity);
log(total_price(products));

log(sum((u) => u.age)([{ age: 30 }, { age: 20 }, { age: 10 }]));
```

# 지연성1

## range와 느긋한 L.range

### range

```js
const add = (a, b) => a + b;
const range = (l) => {
  let i = -1;
  let res = [];
  while (++i < l) {
    // log(i, "range"); // 선언하는 순간 이미 평가되어버린다. 사실은 불필요한데도..
    // Array => Array Iteator
    res.push(i);
  }
  return res;
};
const list = range(4);
log(list);
log(reduce(add, list));
```

### 느긋한 L.range

```js
const L = {};
L.range = function* (l) {
  let i = -1;
  while (++i < l) {
    // log(i, "L.range"); // iterable.next 하기 전까지는 실제로 실행을 안한다
    // L.range {<suspended>} (Generator and iterable) => 자기자신을 return
    yield i;
  }
};
L.list = L.range(4);
log(L.list);
log(reduce(add, L.list));
```

### testing

```js
const test = (name, time, f) => {
  console.time(name);
  while (time--) f();
  console.timeEnd(name);
};
// test("range", 10, () => reduce(add, range(1000000)));
// test("L.range", 10, () => reduce(add, L.range(1000000))); // 처음에는 더 빨랐는데..
```

## Take

```js
const take = curry((l, iter) => {
  let res = [];
  for (const a of iter) {
    res.push(a);
    if (res.length == l) return res;
  }
  return res;
});
console.time("");
go(range(1000000), take(5), reduce(add), log);
console.timeEnd("");
console.time("");
go(L.range(1000000), take(5), reduce(add), log); // 배열이 커질 수록 지연성 iterator가 유리
console.timeEnd("");
```

# 제너레이터/이터레이터 프로토콜로 구현하는 지연 평가 (Lazy Evalution)

- 제때 계산법
- 느긋한 계산법
- 제너레이터/이터레이터 프로토콜을 기반으로 구현

## L.map

```js
L = {};
L.map = function* (f, iter) {
  for (const a of iter) yield f(a);
};
var it = L.map((a) => a + 10, [1, 2, 3, 4]);
log(it.next());
log(it.next().value);
log([...it]);
```

## L.filter

```js
L.filter = function* (f, iter) {
  for (const a of iter) if (f(a)) yield a;
};
var it = L.filter((a) => a % 2, [1, 2, 3, 4]);
log(it.next());
log(it.next());
```

## try manual `for ~ of`

```js
const map = curry((f, iter) => {
  let res = [];
  // for (const a of iter) {
  // <==== convert to manual for ~ of
  iter = iter[Symbol.iterator]();
  let cur;
  while (!(cur = iter.next()).done) {
    const a = cur.value;
    // ====>
    res.push(f(a));
  }
  return res;
});
```

## range 와 L.range의 실행 순서 차이

```js
go(
  range(10),
  map((n) => n + 10),
  filter((n) => n % 2),
  take(2),
  log
);
go(
  L.range(10),
  map((n) => n + 10),
  filter((n) => n % 2),
  take(2),
  log
);
```

### range

- 가로로 모두 평가하고 ([1..10]) 다음 함수로 내려간다.

### L.range

- 세로로평가한다.

1. range, map, filter는 모두 generator를 받으므로 평가를 지연시킨다.(suspended)
2. take에서 처음으로 iter.next()를 수행 시 그 iter를 보낸 filter로 올라간다.
3. filter에서 iter.next() 수행 시 map으로 올라감
4. map에서 iter.next() 수행 시 range로 가서 최초의 yield 수행
5. yield된 값을 map, filter, take 순으로 내려서 평가한다.

## 엄격한 계산과 느긋한 계산의 효율성 비교

- 느긋한 계산의 경우 배열이 커지더라도, 심지어 Infinity 여도 2개 take 할때까지만 실행하므로 성능상의 차이가 없다.

## map, filter 계열 함수들이 가지는 결함 법칙

- 사용하는 데이터가 무엇이든지
- 사용하는 보조 함수가 순수 함수라면 무엇이든지
- 아래와 같이 결합한다면 둘 다 결과가 같다.
  [[mapping, mapping], [filtering, filtering], [mapping, mapping]]
  =
  [[mapping, filtering, mapping], [mapping, filtering, mapping]]

## ES6의 기본 규악을 통해 구현하는 지연 평가의 장점

- 각 library별로 별도의 지연성을 구현하지 않고 JS의 규약을 통해 데이터와 함수 모두 서로 호환 가능

# 지연성 2

## 결과를 만드는 함수 reduce, take

- map, filter 이후에 연산의 시작점을 알리는 함수

## QueryStr 함수 만들기

```js
const join = curry((sep = ",", iter) =>
  reduce((a, b) => `${a}${sep}${b}`, iter)
);

// array가 아니여도 모든 iterable에 사용 가능한 join => 지연성을 가진 L.map도 사용가능하게 함
// function* a() {
//   yield 10;
//   yield 11;
// }
// log(join("-", a()));

const queryStr =
  //  (obj) =>
  // go(
  //   obj,
  // 그대로 obj 전달하기때문에 pipe 사용도 가능
  pipe(
    L.entries, // Object.entries,
    L.map(([k, v]) => `${k}=${v}`), // use L.map instread of Array.map
    (a) => {
      // Generator {<suspended>} 확인 가능
      console.log(a);
      return a;
    },
    join("&")
  );
log(queryStr({ limit: 10, offset: 10, type: "notice" }));
```

## take, find

```js
const users = [{ age: 28 }, { age: 29 }, { age: 30 }, { age: 31 }];
const find = curry((f, iter) => go(iter, L.filter(f), take(1), ([a]) => a));
log(find((u) => u.age < 30)(users));

// +eg)
go(
  users,
  L.map((u) => u.age),
  find((n) => n < 30),
  log
);
```

## L.map, L.filter로 map과 filter 만들기

```js
const takeAll = take(Infinity);
// const map = curry((f, iter) => go(iter, L.map(f), takeAll));
// const map = curry((f, iter) => go(L.map(f, iter), takeAll)); // args 를 그대로 사용하므로 pipe가자
const map = curry(pipe(L.map, takeAll));
const filter = curry(pipe(L.filter, takeAll));
log(map((a) => a + 10, L.range(4)));
log(filter((a) => a % 2, L.range(4)));
```

## L.flatten, flatten, deepFlatten

```js
const isIterable = (a) => a && a[Symbol.iterator];

L.flatten = function* (iter) {
  for (const a of iter) {
    // if (isIterable(a)) for (const b of a) yield b;
    if (isIterable(a)) yield* a;
    else yield a;
  }
};
const it = L.flatten([[1, 2], 3, 4, [5, 6], [7, 8, 9]]);
log(it.next());
log([...it]);
log(take(3, L.flatten([[1, 2], 3, 4, [5, 6], [7, 8, 9]])));

const flatten = pipe(L.flatten, takeAll);
log(flatten([[1, 2], 3, 4, [5, 6], [7, 8]]));

L.deepFlat = function* f(iter) {
  for (const a of iter) {
    if (isIterable(a)) yield* f(a);
    else yield a;
  }
};
log([...L.deepFlat([1, [2, [3, 4], [[5]]]])]);
```

## flatMap

```js
// 기본 flat 사용법
log([[1, 2], [3, 4], [5, 6, 7], [8]].flatMap((a) => a));
// flat 내에서 map 사용
log([[1, 2], [3, 4], [5, 6, 7], [8]].flatMap((a) => a.map((b) => b * b)));
// 구현-1_map
log([[1, 2], [3, 4], [5, 6, 7], [8]].map((a) => a.map((b) => b * b)));
// 구현-2_map+flatten
log(flatten([[1, 2], [3, 4], [5, 6, 7], [8]].map((a) => a.map((b) => b * b)))); // 하지만 전체 순회를 두 번 하므로 비효율적

L.flatMap = curry(pipe(L.map, L.flatten));
const flatMap = curry(pipe(L.map, flatten)); // takeAll with flatten

log(...L.flatMap((a) => a, [[1, 2], [3, 4], [5, 6, 7], [8]]));
log(flatMap((a) => a, [[1, 2], [3, 4], [5, 6, 7], [8]]));

log(...L.flatMap(L.range, [1, 2, 3])); // 단순히 조회하는게 아니라 추가 함수 적용
```

## 2차원 배열 다루기

```js
const arr = [
  [1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [9, 10],
];
go(
  arr,
  L.flatten,
  L.filter((a) => a % 2),
  L.map((a) => a * a),
  take(4),
  reduce(add),
  log
);
```

## 지연성 / 이터러블 중심 프로그래밍 실무적인 코드

```js
var users = [
  {
    name: "a",
    age: 21,
    family: [
      { name: "a1", age: 53 },
      { name: "a2", age: 47 },
      { name: "a3", age: 16 },
      { name: "a4", age: 15 },
    ],
  },
  {
    name: "b",
    age: 24,
    family: [
      { name: "b1", age: 58 },
      { name: "b2", age: 51 },
      { name: "b3", age: 19 },
      { name: "b4", age: 22 },
    ],
  },
  {
    name: "c",
    age: 31,
    family: [
      { name: "c1", age: 64 },
      { name: "c2", age: 62 },
    ],
  },
  {
    name: "d",
    age: 20,
    family: [
      { name: "d1", age: 42 },
      { name: "d2", age: 42 },
      { name: "d3", age: 11 },
      { name: "d4", age: 7 },
    ],
  },
];

go(
  users,
  L.flatMap((u) => u.family),
  L.filter((u) => u.age > 20),
  L.map((u) => u.age),
  take(4),
  reduce(add),
  log
);
```
