import 'regenerator-runtime/runtime';
import log from '../../lib/log';

// filter
const products = [
  { name: '반팔티', price: 15000 },
  { name: '긴팔티', price: 20000 },
  { name: '핸드폰케이스', price: 15000 },
  { name: '후드티', price: 30000 },
  { name: '바지', price: 25000 },
];

// 명령형으로 작성한 가격이 20000 미만인 상품만 찾는 코드
let under20000 = [];
for (const p of products) {
  if (p.price < 20000) under20000.push(p);
}
log(...under20000);
// {name: "반팔티", price: 15000} {name: "핸드폰케이스", price: 15000}

// 명령형으로 작성한 가격이 20000 이상인 상품만 찾는 코드
let over20000 = [];
for (const p of products) {
  if (p.price >= 20000) over20000.push(p);
}
log(...over20000);
// {name: "긴팔티", price: 20000} {name: "후드티", price: 30000} {name: "바지", price: 25000}

/**
 * [filter 함수]
 * @param {function} f    [위임할 보조함수]
 * @param {Iterable} iter [이터레이터]
 */
const filter = (f, iter) => {
  let res = [];
  for (const a of iter) {
    if (f(a)) res.push(a);
  }
  return res;
};

// filter 함수를 사용해 동일하게 작동하는 코드를 작성할 수 있다.
log(...filter((p) => p.price < 20000, products));
// {name: "반팔티", price: 15000} {name: "핸드폰케이스", price: 15000}
log(...filter((p) => p.price >= 20000, products));
// {name: "긴팔티", price: 20000} {name: "후드티", price: 30000} {name: "바지", price: 25000}

// 내부에 있는 값의 다형성은 보조함수를 이용해 지원한다.
// 외부의 다형성은 이터러블 프로토콜을 따르는 것으로 다형성을 지원할 수 있다.
log(filter((n) => n % 2, [1, 2, 3, 4]));
// [1, 3]

// 제너레이터 또한 이용가능하므로 filter함수 역시 이터러블 프로토콜을 따른다.
log(
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
// [1, 3, 5]
