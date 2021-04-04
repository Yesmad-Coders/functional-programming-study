import 'regenerator-runtime/runtime';
import log from '../../lib/log';

// reduce
// 값을 하나로 축약하는 함수
const nums = [1, 2, 3, 4, 5];
let total = 0;
for (const n of nums) {
  total = total + n;
}
log(total); // 15

/**
 * [reduce 함수]
 * @param {function} f    [위임할 보조함수]
 * @param {any} [acc]     [초기값]
 * @param {Iterable} iter [이터레이터]
 */
const reduce = (f, acc, iter) => {
  if (!iter) {
    // acc가 없을 경우 iter가 acc자리에 들어오게 된다.
    // 따라서 acc의 이터레이터를 실행해 iter에 넣고
    // 이러테이터의 next 메서드로 첫 값을 acc에 넣는다.
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  }
  for (const a of iter) {
    acc = f(acc, a);
  }
  return acc;
};

const add = (a, b) => a + b;
log(reduce(add, 0, [1, 2, 3, 4, 5])); // 15

// 위의 reduce 함수는 아래와 같이 동작해야 한다.
log(add(add(add(add(add(0, 1), 2), 3), 4), 5)); // 15

log(reduce(add, [1, 2, 3, 4, 5])); // 15
