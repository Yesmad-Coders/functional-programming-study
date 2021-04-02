import 'regenerator-runtime/runtime';
import log from '../../lib/log';

// map
const products = [
  { name: '반팔티', price: 15000 },
  { name: '긴팔티', price: 20000 },
  { name: '핸드폰케이스', price: 15000 },
  { name: '후드티', price: 30000 },
  { name: '바지', price: 25000 },
];

// products 배열에서 상품의 이름만 뽑아 저장
let names = [];
for (const p of products) {
  names.push(p.name);
}
log(names); // ["반팔티", "긴팔티", "핸드폰케이스", "후드티", "바지"]

// products 배열에서 상품의 가격만 뽑아 저장
let prices = [];
for (const p of products) {
  prices.push(p.price);
}
log(prices); // [15000, 20000, 15000, 30000, 25000]

// 이런 코드를 작성할 떄 사용할 수 있는 함수가 map 함수

/**
 * [map 함수]
 * @param {Iterable} iter [이터레이터]
 * @param {function} f    [위임할 보조함수]
 */
const map = (f, iter) => {
  let res = [];
  for (const a of iter) {
    res.push(f(a));
  }
  return res;
};

log(map((p) => p.name, products)); // ["반팔티", "긴팔티", "핸드폰케이스", "후드티", "바지"]
log(map((p) => p.price, products)); // [15000, 20000, 15000, 30000, 25000]
