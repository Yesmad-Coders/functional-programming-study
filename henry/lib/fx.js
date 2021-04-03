const { log } = console;

// const products = [
//   { name: "반팔티", price: 15000, quantity: 1, is_selected: false },
//   { name: "긴팔티", price: 20000, quantity: 2, is_selected: false },
//   { name: "핸드폰케이스", price: 15000, quantity: 3, is_selected: false },
//   { name: "후드티", price: 30000, quantity: 4, is_selected: false },
//   { name: "바지", price: 25000, quantity: 5, is_selected: false },
// ];

const curry = (f) => (a, ..._) =>
  _.length ? f(a, ..._) : (..._) => f(a, ..._);

const map = curry((f, iter) => {
  let res = [];
  for (const a of iter) {
    res.push(f(a));
  }
  return res;
});

const filter = curry((f, iter) => {
  let res = [];
  for (const a of iter) {
    if (f(a)) res.push(a);
  }
  return res;
});

const reduce = curry((f, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  }
  for (const x of iter) {
    acc = f(acc, x);
  }
  return acc;
});

const go = (...args) => reduce((a, f) => f(a), args);
const pipe = (f, ...fs) => (...args) => go(f(...args), ...fs); // fs = functions...
