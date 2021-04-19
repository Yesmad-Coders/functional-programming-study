const add = (a, b) => a + b;

const range = (length) => {
  let i = -1;
  let res = [];
  while (++i < length) {
    res.push(i);
  }
  return res;
};

const L = {};

L.range = function* (length) {
  let i = -1;
  while (++i < length) {
    yield i;
  }
};

const take = (limit, iterable) => {
  let res = [];
  for (const a of iterable) {
    res.push(a);
    if (res.length === limit) return res;
  }
  return res;
};

// log(range(100)); // [0,1,2,...100];
console.time("");
log(take(5, range(100000))); // [0,1,2,3,4]
console.timeEnd("");

console.time("");
log(take(5, L.range(100000))); // [0,1,2,3,4] 훨씬 빠름
console.timeEnd("");

// console.time("");
// log(take(5, range(Infinity))); // 브라우저 뻗음
// console.timeEnd("");

console.time("");
log(take(5, L.range(Infinity))); // [0,1,2,3,4] 위와 비슷한 속도
console.timeEnd("");

// take 는 이터러블 프로토콜을 따름

// 아래 두 개를 비교 해 보자.

// log(take(5, range(1000000))); // [1]
// log(take(5, L.range(1000000))); // [2]

// [1]의 경우 백만개를 만들어 놓고 그 중에 다섯개를 뽑는 거지만
// [2]의 경우 최대 백만개를 만들건데, 그 중에 다섯개를 뽑아달라는 거고
// 실제로 배열을 만들어 놓고 그 중 다섯개를 뽑는게 아니라
// 다섯개를 뽑아서 배열을 만드는 것이기 때문에 그만큼 효율이 좋다
