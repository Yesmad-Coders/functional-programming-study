# 함수형 자바스크립트 기본기

## 평가(Evaluation)

- 코드가 계산되어 값을 만듬

## 일급(First-class)

- 값으로 다룰수 있음
- 변수에 담을 수 있음
- 함수의 인자로 사용가능
- 함수의 결과로 사용가능

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

```ts
const arr = [1, 2, 3];
for (const a of arr) log(a);
let iter1 = arr[Symbol.iterator]();
for (const a of iter1) log(a);

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
const it = map.values();
it2 = it[Symbol.iterator];
```

## Iterable/Iterator Protocol

- Iterable: Iterator 를 리턴하는 [Symbol.iterator]() 를 가진 값
- Iterator: {value, done} 객체를 리턴하면 next() 를 가진 값
- Iterable/Iterator Protocol: Iterable을 for...of, 전개 연산자 등과 함께 동작하도록 한 규약
