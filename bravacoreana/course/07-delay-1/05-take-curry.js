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

const take = curry((limit, iterable) => {
  let res = [];
  for (const a of iterable) {
    res.push(a);
    if (res.length === limit) return res;
  }
  return res;
});

// console.time("");
// take(5, range(100000));
// console.timeEnd("");
console.time("range");
go(range(10000), take(5), reduce(add), log);
console.timeEnd("range");
console.time("L.range");
go(L.range(10000), take(5), reduce(add), log); // 훠어어어얼씬 빠름
console.timeEnd("L.range");
