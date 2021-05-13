log("🔸 << 4. reduce >> 🔸");

// * reduce: 값을 축약하는 함수
// - iterable 값을 다른 하나의 값으로 축약해 나가는 함수
// - (예: 배열 내 모든 값을 더해 하나의 값으로 만든다)

const nums = [1, 2, 3, 4, 5];
let total = 0;
for (const n of nums) {
  total = total + n;
}
log(total); // 15

// < reduce - 초기값을 주는 경우 >
// * reduce(add, 0, [1, 2, 3, 4, 5])
const reduce_with_init_value = (f, acc, iter) => {
  for (const a of iter) {
    acc = f(acc, a);
  }
  return acc;
};

const add = (a, b) => a + b;
log(reduce_with_init_value(add, 0, [1, 2, 3, 4, 5])); // 15
// (add(add(add(add(add(0, 1), 2), 3), 4), 5));

// < reduce - 초기값을 주지 않는 경우 >
// * reduce(add, [1, 2, 3, 4, 5]);

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

log(reduce(add, [1, 2, 3, 4, 5])); // 15
