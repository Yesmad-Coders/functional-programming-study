import 'regenerator-runtime/runtime';
import log from '../../lib/log';
import { reduce, filter, map, go } from '../../lib/fx';

// go를 사용하여 읽기 좋은 코드로 만들기

const products = [
  { name: '반팔티', price: 15000 },
  { name: '긴팔티', price: 20000 },
  { name: '핸드폰케이스', price: 15000 },
  { name: '후드티', price: 30000 },
  { name: '바지', price: 25000 },
];

const add = (a, b) => a + b;

// go 함수를 이용해 아래와 같이 조금 더 읽기 쉬운 코드로 작성할 수 있다.
go(
  products,
  (products) => filter((p) => p.price < 20000, products),
  (products) => map((p) => p.price, products),
  (prices) => reduce(add, prices),
  log
); // 30000
