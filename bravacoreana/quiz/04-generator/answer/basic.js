import L from "./lazy";

const curry = (f) => (a, ..._) =>
  _.length ? f(a, ..._) : (..._) => f(a, ..._);

export const map = curry((f, iter) => {
  let res = [];
  iter = iter[Symbol.iterator]();
  let cur;
  while (!(cur = iter.next()).done) {
    const a = cur.value;
    res.push(f(a));
  }
  return res;
});

const filter = curry((f, iter) => {
  let res = [];
  iter = iter[Symbol.iterator]();
  let cur;
  while (!(cur = iter.next()).done) {
    const a = cur.value;
    if (f(a)) res.push(a);
  }
  return res;
});

export const reduce = curry((f, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  } else {
    iter = iter[Symbol.iterator]();
  }
  let cur;
  while (!(cur = iter.next()).done) {
    const a = cur.value;
    acc = f(acc, a);
  }
  return acc;
});

export const go = (...args) => reduce((acc, f) => f(acc), args);

export const pipe = (f, ...fs) => (...args) => go(f(...args), ...fs);

export const add = (a, b) => a + b;

/**
 * 문제 1. 안 느긋한 range take 구현
 */

// export const take = curry();

// export const range = ;

// export const takeAll = take(Infinity);

export const take = (length, iterable) => {
  let res = [];
  iterable = iterable[Symbol.iterator]();
  let cur;
  while (!(cur = iterable.next()).done) {
    const a = cur.value;
    res.push(a);
    if (res.length === length) return res;
  }
  return res;
};

export const range = (length) => {
  let i = -1;
  let res = [];
  while (++i < length) {
    res.push(i);
  }
  return res;
};
