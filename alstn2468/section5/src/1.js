import 'regenerator-runtime/runtime';
import log from '../../lib/log';
import { go, reduce, map, curry } from '../../lib/fx';

// 총 수량, 총 가격

const products = [
  { name: '반팔티', price: 15000, quantity: 1 },
  { name: '긴팔티', price: 20000, quantity: 2 },
  { name: '핸드폰케이스', price: 15000, quantity: 3 },
  { name: '후드티', price: 30000, quantity: 4 },
  { name: '바지', price: 25000, quantity: 5 },
];

// 총 수량
go(
  products,
  map((p) => p.quantity),
  reduce((a, b) => a + b),
  log
); // 15

const add = (a, b) => a + b;
const sum = curry((f, iter) => go(iter, map(f), reduce(add)));

// 총 수량을 반환하는 totalQuantity 함수
const totalQuantity = (products) => sum((p) => p.quantity, products);
// 분리한 함수를 사용해 더 간단히 사용할 수 있다.
log(totalQuantity(products)); // 15

// 총 가격을 반환하는 totalPrice 함수
const totalPrice = (products) => sum((p) => p.price * p.quantity, products);
log(totalPrice(products)); // 345000

// sum 함수에 curry를 이용할 경우 더 간결하게 표현할 수 있다.
const curriedTotalQuantity = sum((p) => p.quantity);
const curriedTotalPrice = sum((p) => p.price * p.quantity);
log(curriedTotalQuantity(products)); // 15
log(curriedTotalPrice(products)); // 345000

// products외의 다른 곳에도 사용할 수 있다.
log(sum((u) => u.age, [{ age: 30 }, { age: 20 }, { age: 10 }])); // 60
