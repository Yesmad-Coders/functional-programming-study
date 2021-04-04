import 'regenerator-runtime/runtime';
import { map, filter, reduce } from '../../lib/fx';
import log from '../../lib/log';

// map+filter+reduce 중첩 사용과 함수형 사고

const products = [
  { name: '반팔티', price: 15000 },
  { name: '긴팔티', price: 20000 },
  { name: '핸드폰케이스', price: 15000 },
  { name: '후드티', price: 30000 },
  { name: '바지', price: 25000 },
];

// map을 이용해 가격을 추출하는 로직
log(map((p) => p.price, products)); // [15000, 20000, 15000, 30000, 25000]

// 2만원 이하의 상품만 추출하는 로직
log(
  map(
    (p) => p.price,
    filter((p) => p.price < 20000, products)
  )
); // [15000, 15000]

const add = (a, b) => a + b;

// 2만원 이하의 상품의 가격 총합을 추출하는 로직
log(
  reduce(
    add,
    map(
      (p) => p.price,
      filter((p) => p.price < 20000, products)
    )
  )
); // 30000
log(
  reduce(
    add,
    filter(
      (n) => n < 20000,
      map((p) => p.price, products)
    )
  )
); // 30000
