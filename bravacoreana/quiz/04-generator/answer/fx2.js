const range = (length) => {
  let i = -1;
  let res = [];
  while (++i < length) {
    res.push(i);
  }
  return res;
};

const take = curry((limit, iterable) => {
  let res = [];
  for (const a of iterable) {
    res.push(a);
    if (res.length === limit) return res;
  }
  return res;
});

L.range = function* (length) {
  let i = -1;
  while (++i < length) {
    yield i;
  }
};

const takeAll = take(Infinity);

L.map = curry(function* (f, iter) {
  for (const a of iter) yield f(a);
});

L.filter = curry(function* (f, iter) {
  for (const a of iter) if (f(a)) yield a;
});
