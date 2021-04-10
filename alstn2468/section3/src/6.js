import 'regenerator-runtime/runtime';
import log from '../../lib/log';

// reduce2
const products = [
  { name: '반팔티', price: 15000 },
  { name: '긴팔티', price: 20000 },
  { name: '핸드폰케이스', price: 15000 },
  { name: '후드티', price: 30000 },
  { name: '바지', price: 25000 },
];

/**
 * [reduce 함수]
 * @template T, U
 * @param {function} f       [위임할 보조함수]
 * @param {any} [acc]        [초기값]
 * @param {Iterable<T>} iter [이터레이터]
 * @returns {Iterable<U>}
 */
const reduce = (f, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  }
  for (const a of iter) {
    acc = f(acc, a);
  }
  return acc;
};

// 보조함수를 통해 안쪽의 값의 다형성을 지원한다.
// 이터러블을 통해 외부 값의 다형성 또한 지원한다.
log(reduce((totalPrice, product) => totalPrice + product.price, 0, products)); // 105000
