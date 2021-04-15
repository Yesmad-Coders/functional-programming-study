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

function test(name, time, func) {
  console.time(name);
  while (time--) func();
  console.timeEnd(name);
}

test("range", 10, () => reduce(add, range(1000000))); // 살짝 더 빠름
test("L.range", 10, () => reduce(add, L.range(1000000)));
