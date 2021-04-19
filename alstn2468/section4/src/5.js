import 'regenerator-runtime/runtime';
import log from '../../lib/log';
import { go, pipe, filter, map, reduce } from '../../lib/fx';

// 함수 조합으로 함수 만들기
const products = [
  { name: '반팔티', price: 15000 },
  { name: '긴팔티', price: 20000 },
  { name: '핸드폰케이스', price: 15000 },
  { name: '후드티', price: 30000 },
  { name: '바지', price: 25000 },
];
const add = (a, b) => a + b;

// totalPrice라는 함수를 뽑아 중복을 제거할 수 있다.
const totalPrice = pipe(
  map((p) => p.price),
  reduce(add)
);
go(
  products,
  filter((p) => p.price < 20000),
  totalPrice,
  log
); // 30000
go(
  products,
  filter((p) => p.price >= 20000),
  totalPrice,
  log
); // 75000

// 중복을 제거하는 함수를 더 구현해 간단히 표현할 수 있다.
const baseTotalPrice = (predicate) => pipe(filter(predicate), totalPrice);
go(
  products,
  baseTotalPrice((p) => p.price < 20000),
  log
); // 30000
go(
  products,
  baseTotalPrice((p) => p.price >= 20000),
  log
); // 75000
