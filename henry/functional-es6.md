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