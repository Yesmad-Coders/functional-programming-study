import 'regenerator-runtime/runtime';
import log from '../../lib/log';
import {
  go,
  filter as baseFilter,
  map as baseMap,
  reduce as baseReduce,
} from '../../lib/fx';

// go+curry를 사용하여 더 읽기 좋은 코드로 만들기
// curry 함수는 함수를 받아 함수를 원하는 시점에 평가하도록 한다.
// 함수를 받아 함수를 반환한다.
// 함수가 실행되었을 떄 인자가 2개 이상이라면 즉시 실행한다.
// 인자가 2개보다 작다면 함수를 반환하고 이후의 인자를 합쳐 실행한다.
const curry = (f) => (a, ..._) =>
  _.length ? f(a, ..._) : (..._) => f(a, ..._);

const mult = curry((a, b) => a * b);
log(mult); // (a, ..._) => _.length ? f(a, ..._) : (..._) => f(a, ..._)
log(mult(1)); // (..._) => f(a, ..._)
log(mult(1)(2)); // 2

const mult3 = mult(3);
log(mult3(10)); // 30
log(mult3(5)); // 15
log(mult3(3)); // 9

// curry를 적용해 인자를 모두 받을 때 까지 평가를 지연할 수 있다.
const map = curry(baseMap);
const filter = curry(baseFilter);
const reduce = curry(baseReduce);

const products = [
  { name: '반팔티', price: 15000 },
  { name: '긴팔티', price: 20000 },
  { name: '핸드폰케이스', price: 15000 },
  { name: '후드티', price: 30000 },
  { name: '바지', price: 25000 },
];

// 전과 동일한 결과를 얻을 수 있다.
const add = (a, b) => a + b;
go(
  products,
  (products) => filter((p) => p.price < 20000)(products),
  (products) => map((p) => p.price)(products),
  (prices) => reduce(add)(prices),
  log
); // 30000
// 위의 코드도 정상적으로 동작하지만 아래와 같이 커링을 이용해 더 간단하게 작성할 수 있다.
go(
  products,
  filter((p) => p.price >= 20000),
  map((p) => p.price),
  reduce(add),
  log
); // 75000
