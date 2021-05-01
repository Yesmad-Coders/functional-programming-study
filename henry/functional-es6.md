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
  const apply1 = f => f(1);
  const add2 = a => a + 2;
  log(apply1(add2));
  log(apply1(a => a - 1));
  ```
  -times;
  ```js
  const times = (f, n) => {
    let i = -1;
    while (++i < n) f(i);
  };
  times(log, 3);
  times(a => log(a + 10), 3);
  ```
- 함수(Closure)를 만들어 리턴하는 함수(currying?)
  - addMaker
  ```js
  addMaker = a => b => a + b; // Closure: 기억 된 환경 a와 {a+b} 라는 함수를 통칭
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
console.log(map(p => p.name, products));
```

## Iterable map의 다형성

1. DOM 가능

```js
console.log(map(el => el.nodeName, document.querySelectorAll("*")));
```

2. generator도 가능

```js
function* gen() {
  yield 2;
  if (false) yield 3;
  yield 4;
}
console.log(map(a => a * a, gen()));

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

console.log(filter(p => p.price > 20000, products));
console.log(filter(n => n % 2, [1, 2, 3, 4]));
console.log(
  filter(
    n => n % 2,
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
      p => p.price,
      filter(p => p.price < 20000, products)
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
  a => a + 1,
  a => a + 10,
  a => a + 100,
  log
); // 111
const f = pipe(
  add,
  a => a + 1,
  a => a + 10,
  a => a + 100,
  log
);
f(0, 1); // 111

go(
  products,
  products => filter(p => p.price < 20000, products),
  products => map(p => p.price, products),
  prices => reduce(add, prices),
  log
);
```

## Curry

```js
const curry = f => (a, ..._) => (_.length ? f(a, ..._) : (..._) => f(a, ..._));

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
      p => p.price,
      filter(p => p.price < 20000, products)
    )
  )
);

// go 를 통해 순서를 바꿈
go(
  products,
  products => filter(p => p.price < 20000, products),
  products => map(p => p.price, products),
  prices => reduce(add, prices),
  log
);

// curry를 씌운 filter, map, reduce는 function return 하므로 앞의 array를 바로바로 받을 수 있다.
go(
  products,
  filter(p => p.price < 20000),
  map(p => p.price),
  reduce(add),
  log
);
```

## 함수 조합으로 함수 만들기

```js
const total_price = pipe(
  map(p => p.price),
  reduce(add)
);

const base_total_price = predicate => pipe(filter(predicate), total_price);

go(
  products,
  base_total_price(p => p.price < 20000),
  log
);

go(
  products,
  base_total_price(p => p.price >= 20000),
  log
);
```

## 총수량, 총가격

```js
const sum = curry((f, iter) => go(iter, map(f), reduce(add)));

const total_quantity = sum(p => p.quantity);
log(total_quantity(products));
const total_price = sum(p => p.price * p.quantity);
log(total_price(products));

log(sum(u => u.age)([{ age: 30 }, { age: 20 }, { age: 10 }]));
```

# 지연성1

## range와 느긋한 L.range

### range

```js
const add = (a, b) => a + b;
const range = l => {
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
var it = L.map(a => a + 10, [1, 2, 3, 4]);
log(it.next());
log(it.next().value);
log([...it]);
```

## L.filter

```js
L.filter = function* (f, iter) {
  for (const a of iter) if (f(a)) yield a;
};
var it = L.filter(a => a % 2, [1, 2, 3, 4]);
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
  map(n => n + 10),
  filter(n => n % 2),
  take(2),
  log
);
go(
  L.range(10),
  map(n => n + 10),
  filter(n => n % 2),
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
    a => {
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
log(find(u => u.age < 30)(users));

// +eg)
go(
  users,
  L.map(u => u.age),
  find(n => n < 30),
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
log(map(a => a + 10, L.range(4)));
log(filter(a => a % 2, L.range(4)));
```

## L.flatten, flatten, deepFlatten

```js
const isIterable = a => a && a[Symbol.iterator];

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
log([[1, 2], [3, 4], [5, 6, 7], [8]].flatMap(a => a));
// flat 내에서 map 사용
log([[1, 2], [3, 4], [5, 6, 7], [8]].flatMap(a => a.map(b => b * b)));
// 구현-1_map
log([[1, 2], [3, 4], [5, 6, 7], [8]].map(a => a.map(b => b * b)));
// 구현-2_map+flatten
log(flatten([[1, 2], [3, 4], [5, 6, 7], [8]].map(a => a.map(b => b * b)))); // 하지만 전체 순회를 두 번 하므로 비효율적

L.flatMap = curry(pipe(L.map, L.flatten));
const flatMap = curry(pipe(L.map, flatten)); // takeAll with flatten

log(...L.flatMap(a => a, [[1, 2], [3, 4], [5, 6, 7], [8]]));
log(flatMap(a => a, [[1, 2], [3, 4], [5, 6, 7], [8]]));

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
  L.filter(a => a % 2),
  L.map(a => a * a),
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
  L.flatMap(u => u.family),
  L.filter(u => u.age > 20),
  L.map(u => u.age),
  take(4),
  reduce(add),
  log
);
```

# 비동기:동시성 프로그래밍 1

## callback과 Promise

1. 전통적인 callback 패턴
2. Promise method chain을 통한 함수 합성
3. Promise 기반의 async, await

## 비동기를 값으로 만드는 Promise

```js
// 전통적인 callback 패턴
const add10 = (a, callback) => {
  setTimeout(() => callback(a + 10), 1000);
};
const a = add10(5, res => {
  add10(5, res => {
    add10(5, res => {
      log(res);
    });
  });
});
log(a); // => undefined
```

- setTimeout과 callback을 사용한다는 context만 남아있을 뿐 return value 가 없음

```js
// Promise를 'return'
const add20 = a => {
  return new Promise(resolve => setTimeout(() => resolve(a + 20), 1000));
};
const b = add20(5).then(add20).then(add20).then(log);
log(b); // => Promise <pending>
```

- Promise 방식이 chaining 하기 쉽다.
- 하지만 꺼내오기 쉬운게 중요한게 아니다 => `비동기 상황을 [대기,성공,실패]의 상태를 가지는 first-class value로 다룰 수 있다는 점이 중요`
- 즉시 Promise {<pending>} 을 return => `비동기상황을 값으로 다뤄서 resolve 이후 추가작업을 연결지어 할 수 있다.`
- `값으로 다룰 수 있다` => first-class

## 값으로서의 Promise 활용

```js
const go1 = (a, f) => (a instanceof Promise ? a.then(f) : f(a));
const add5 = a => a + 5;
const delay100 = a => new Promise(resolve => setTimeout(() => resolve(a), 100));

// 동기적으로 바로 값을 알 수 있어야 작동 (Promise가 아니여야)
// const r = go1(10, add5);
// log(r);
const n1 = 10;
go1(go1(n1, add5), log);

// Promise는 작동불가 => [object Promise]5
// const r2 = go1(delay100(10), add5);
// r2.then(log);
const n2 = delay100(10);
go1(go1(n2, add5), log);
```

## 합성 관점에서의 Promise와 모나드

- 모나드: 함수 합성을 상황에 따라 안전하게?
- [1] 박스안에서 함수 합성을 안전하게
- f . g = f(g(x))
- 그중에서도 비동기 상황을 안전하게 합성해주는것이 => Promise

```js
const g = a => a + 1;
const f = a => a * a;
log(f(g(1)));
log(f(g())); // 빈 값 전달시 에러, 잘못된 값을 그대로 log
// 들어올 값을 예측할 수 없을때 어떻게 안정성을 가질 것인가?
// [1] = Array.of(1)
Array.of(1)
  .map(g)
  .map(f)
  .forEach(r => log(r)); // 실제 사용자에게 효과를 전달하는것은 forEach
[]
  .map(g)
  .map(f)
  .forEach(r => log(r)); // elem 없으면 수행 안한다, 값이 몇개일지, 없을지 모르는 상황들에 대한 안정성

Promise.resolve(2)
  .then(g)
  .then(f)
  .then(r => log(r));

new Promise(resolve => setTimeout(() => resolve(2), 100))
  .then(g)
  .then(f)
  .then(r => log(r)); // 값이 있거나 없거나가 아닌 대기인지 성공인지의 상황들에 대한 안정성
```

## Kleisli Composition

- 오류가 있을 수 있는 상황에서의 안정적 함수 합성
- f . g
- f(g(x)) = f(g(x)) // 어느 시점에 수행하더라도 같아야 하지만.. state 등의 변화.
- f(g(x)) = g(x) // 어차피 g(x) 가 에러날거면 둘다 에러인건 같다?

```js
const users = [
  { id: 1, name: "aa" },
  { id: 2, name: "bb" },
  { id: 3, name: "cc" },
];
// const getUserById = id => find(u => u.id == id, users);
const getUserById = id =>
  find(u => u.id == id, users) || Promise.reject("없어요!");
const f = ({ name }) => name;
const g = getUserById;
// const fg = id => f(g(id));
// log(fg(2)); // => bb
// log(fg(2) == fg(2));

// const r = fg(2);
users.pop();
users.pop();
// const r2 = fg(2); // => undefined error

const fg = id =>
  Promise.resolve(id)
    .then(g)
    .then(f)
    .catch(e => e); // resolve 결과가 reject이면 다 건너뛰고 catch만 수행

fg(2).then(log); // 엉뚱한 결과 undefined를 받아들이지않고 그 다음함수 수행하지않으며 reject 함 log도 출력안함
```

## go, pipe, reduce에서 비동기 제어

1. go 중간에 Promise 있으면? => instanceof로 계속 ternary 하면 나머지는 다 비동기(Promise가 되어버림) => 재귀 유명함수 recur 사용
2. go 처음의 acc가 Promise면? 이때는 go1 을 recur에 씌워 한번만 instanceof로 ternary 하자
3. 중간에 Promise.reject있으면 ? go 마지막에 .catch 로 에러 잡아서 출력가능

```js
const go1 = (a, f) => (a instanceof Promise ? a.then(f) : f(a));

const reduce = curry((f, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  } else {
    iter = iter[Symbol.iterator]();
  }
  return go1(acc, function recur(acc) {
    // 함수를 값으로 다루면서 이름을 짓는 '유명함수'
    let cur;
    while (!(cur = iter.next()).done) {
      const a = cur.value;
      acc = f(acc, a);
      // acc = acc instanceof Promise ? acc.then(acc => f(acc, a)) : f(acc, a); // 해결은 되나 이후에는 계속 Promise 이므로 비효율적, 성능저하
      if (acc instanceof Promise) return acc.then(recur);
      // 일단 원래대로 실행 하고 Promise 이면 then 이후 재수행
      // 나머지는 하나의 콜스택에서 수행되므로 효율적
    }
    return acc;
  });
});

go(
  Promise.resolve(1), // 첫 acc가 Promise이면 어떻게할것이냐 => go1 사용
  a => a + 10,
  a => Promise.resolve(a + 100), // => [object Promise]
  a => a + 1000,
  a => Promise.reject("err"),
  a => log("---"),
  a => a + 100000,
  log
).catch(a => console.log(a));
```

## Promise.then의 중요한 규칙

- then 이 항상 Promise를 return 하지는 않는다.
- 중첩된 Promise 여도 한번의 then으로 꺼낼 수 있다.
- then의 cb는 Promise를 받는것이 아니라 가장 안쪽의 값을 받는다.

```js
Promise.resolve(Promise.resolve(1)).then(function (a) {
  log(a);
});
new Promise(resolve => resolve(new Promise(resolve => resolve(1)))).then(log);
```

# 비동기:동시성 프로그래밍 2

## 지연 평가 + Promise - L.map, map, take

- generator + promise
- To handle Promise at L.map: Use go1
- To handle Promise at take: Use recur()

```js
L.map = curry(function* (f, iter) {
  for (const a of iter) {
    yield go1(a, f);
  }
});

const take = curry((l, iter) => {
  let res = [];
  iter = iter[Symbol.iterator]();
  return (function recur() {
    let cur;
    while (!(cur = iter.next()).done) {
      const a = cur.value;
      if (a instanceof Promise)
        return a.then(a => ((res.push(a), res).length == l ? res : recur()));
      res.push(a);
      if (res.length == l) return res;
    }
    return res;
  })();
});

go(
  [Promise.resolve(1), 2, Promise.resolve(3)],
  L.map(a => Promise.resolve(a + 10)),
  takeAll,
  // map(a => Promise.resolve(a + 10)), // L.map + takeAll
  log
);
```

## Kleisli Composition - L.filter, filter, nop, take

- 목표: false 인 element에 대해서 불필요한 연산을 줄이고 바로 catch로 보내자
- `go1` 을 쓰더라도 f(a)의 값이 여전히 Promise: 한번더 then으로 풀어주고, false이면 사용자정의한 nop과함께 reject
- reject을 받아주기 위해 `take` 에서 catch 통해 nop 이라면 skip 하고 recur 재수행, 새로운 에러면 에러와 함께 reject

```js
const nop = Symbol("nop");

L.filter = curry(function* (f, iter) {
  for (const a of iter) {
    const b = go1(a, f);
    if (b instanceof Promise) yield b.then(b => (b ? a : Promise.reject(nop)));
    else if (b) yield a;
  }
});

const take = curry((l, iter) => {
  let res = [];
  iter = iter[Symbol.iterator]();
  return (function recur() {
    let cur;
    while (!(cur = iter.next()).done) {
      const a = cur.value;
      if (a instanceof Promise) {
        return a
          .then(a => ((res.push(a), res).length == l ? res : recur()))
          .catch(e => (e == nop ? recur() : Promise.reject(e))); // if user defined reject "nop"? skip and recur
      }
      res.push(a);
      if (res.length == l) return res;
    }
    return res;
  })();
});

go(
  [1, 2, 3, 4, 5, 6],
  L.map(a => Promise.resolve(a * a)),
  L.filter(a => a % 2),
  take(2),
  log
);
```

## reduce에서 nop 지원

- 복잡한 로직추가는 함수를 분리하자: 기존코드 그대로둘수있다. 가독성 좋다.
- while 내의 a는 아직 promise 핸들링이 안되고있다. => reduceF
- then() 의 두번째 인자로도 catch 가능
- !iter 일떄 acc[Symbol.iterator]().next() 역시 비동기일수 있으므로 => head로 뽑고 문장을 표현식으로 바꿈

```js
const reduceF = (acc, a, f) =>
  a instanceof Promise
    ? a.then(
        a => f(acc, a),
        e => (e == nop ? acc : Promise.reject(e))
      )
    : f(acc, a);

const head = iter => go1(take(1, iter), ([h]) => h);

const reduce = curry((f, acc, iter) => {
  if (!iter) return reduce(f, head((iter = acc[Symbol.iterator]())), iter);
  iter = iter[Symbol.iterator]();
  return go1(acc, function recur(acc) {
    let cur;
    while (!(cur = iter.next()).done) {
      acc = reduceF(acc, cur.value, f);
      if (acc instanceof Promise) return acc.then(recur);
    }
    return acc;
  });
});

go(
  [1, 2, Promise.resolve(3), 4, 5],
  L.map(a => Promise.resolve(a * a)),
  L.filter(a => Promise.resolve(a % 2)),
  reduce(add),
  log
);
```

## 지연 평가 + Promise의 효율성

- generator를 통해 필요한 값만 연산하기때문에 불필요한 비용을 줄일 수 있다.

```js
go(
  [1, 2, 3, 4, 5, 6, 7, 8],
  L.map(a => {
    log("map:", a);
    return new Promise(resolve => setTimeout(() => resolve(a * a), 1000));
  }),
  L.filter(a => {
    log("filter", a);
    return new Promise(resolve => setTimeout(() => resolve(a % 2), 1000));
  }),
  take(2), // vs takeAll
  log
);
```

## 지연된 함수열을 병렬적으로 평가하기 - C.reduce, C.take [1]

- js 보통 비동기i/o로 동작, single thread
- 하지만 DB(pg, redis)에 날리는 쿼리등 병렬로 수행할 필요 많다
- C.reduce를 통해 병렬로 처리하고 다시 좌에서 우로 모아서 갚을 도출
- generator 를 ... 로 풀면 알아서 병렬이돼? iter를 다 실행 시켜버리고 다시 순회하면서 reduce가 평가된다?

```js
const C = {}; // concurrency
C.reduce = curry((f, acc, iter) =>
  iter ? reduce(f, acc, [...iter]) : reduce(f, [...acc])
);
```

## 지연된 함수열을 병렬적으로 평가하기 - C.reduce, C.take [2]

- C.reduce with catchNoop
- C.take
- catch한 값을 전달하지 않고 평가만해야한다 => forEach 로 평가만 함

```js
const C = {}; // concurrency
function noop() {}
const catchNoop = arr => (
  arr.forEach(a => (a instanceof Promise ? a.catch(noop) : a)), arr
);
// catch 만 하고 catch 한값을 전달해서는 안된다. => 이미 catch했으면 또 catch할 수 없다.

C.reduce = curry((f, acc, iter) => {
  const iter2 = catchNoop(iter ? [...iter] : [...acc]);
  return iter ? reduce(f, acc, iter2) : reduce(f, iter2);
});

C.take = curry((l, iter) => take(l, catchNoop([...iter])));

const delay1000 = a =>
  new Promise(resolve => {
    console.log("hi~");
    setTimeout(() => resolve(a), 1000);
  });

console.time("");
go(
  [1, 2, 3, 4, 5, 6, 7, 8, 9],
  L.map(a => delay1000(a * a)),
  L.filter(a => delay1000(a % 2)),
  L.map(a => delay1000(a * a)),
  C.take(2),
  C.reduce(add),
  log,
  _ => console.timeEnd("")
);
```

## 즉시 병렬적으로 평가하기 - C.map, C.filter

- 즉시? 특정함수만 C로 변경하여 선택적 병렬 처리

```js
C.takeAll = C.take(Infinity);
C.map = curry(pipe(L.map, C.takeAll));
C.filter = curry(pipe(L.filter, C.takeAll));

C.map(a => delay1000(a * a), [1, 2, 3, 4]).then(log);
C.filter(a => delay1000(a % 2), [1, 2, 3, 4]).then(log);
```

## 즉시, 지연, Promise, 병렬적 조합하기

```js
const delay1000 = (a, name) =>
  new Promise(resolve => {
    log(`${name}: ${a}`);
    setTimeout(() => resolve(a), 1000);
  });

console.time("");
go(
  [1, 2, 3, 4, 5, 6, 7, 8],
  L.map(a => delay1000(a * a, "map1")),
  C.filter(a => delay1000(a % 2, "filter2")),
  L.map(a => delay1000(a + 1, "map3")),
  take(2),
  // C.reduce(add),
  log,
  _ => console.timeEnd("")
);
```

## 코드 간단히 정리

```js
const catchNoop = ([...arr]) => (
  arr.forEach(a => (a instanceof Promise ? a.catch(noop) : a)), arr
);

C.reduce = curry((f, acc, iter) =>
  iter ? reduce(f, acc, catchNoop(iter)) : reduce(f, catchNoop(acc))
);

C.take = curry((l, iter) => take(l, catchNoop(iter)));
```

## Node.js에서 SQL 병렬 평가로 얻은 효율

- https://github.com/marpple/FxSQL
