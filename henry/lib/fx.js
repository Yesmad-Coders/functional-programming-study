const { log } = console;

// const products = [
//   { name: "반팔티", price: 15000, quantity: 1, is_selected: false },
//   { name: "긴팔티", price: 20000, quantity: 2, is_selected: false },
//   { name: "핸드폰케이스", price: 15000, quantity: 3, is_selected: false },
//   { name: "후드티", price: 30000, quantity: 4, is_selected: false },
//   { name: "바지", price: 25000, quantity: 5, is_selected: false },
// ];

const add = (a, b) => a + b;

const curry = f => (a, ..._) => (_.length ? f(a, ..._) : (..._) => f(a, ..._));

const map_1 = curry((f, iter) => {
  let res = [];
  // for (const a of iter) {
  // <==== convert to manual for ~ of
  iter = iter[Symbol.iterator]();
  let cur;
  while (!(cur = iter.next()).done) {
    const a = cur.value;
    // ====>
    res.push(f(a));
  }
  return res;
});

const filter_1 = curry((f, iter) => {
  let res = [];
  // for (const a of iter) {
  iter = iter[Symbol.iterator]();
  let cur;
  while (!(cur = iter.next()).done) {
    const a = cur.value;
    if (f(a)) res.push(a);
  }
  return res;
});

// const reduce = curry((f, acc, iter) => {
//   if (!iter) {
//     iter = acc[Symbol.iterator]();
//     acc = iter.next().value;
//   } else {
//     iter = iter[Symbol.iterator]();
//   }
//   // for (const a of iter) {
//   let cur;
//   while (!(cur = iter.next()).done) {
//     const a = cur.value;
//     acc = f(acc, a);
//   }
//   return acc;
// });

const reduceF = (acc, a, f) =>
  a instanceof Promise
    ? a.then(
        a => f(acc, a),
        e => (e == nop ? acc : Promise.reject(e))
      )
    : f(acc, a);

const head = iter => go1(take(1, iter), ([h]) => h);

// reduce with Promise + reduceF + head
const reduce = curry((f, acc, iter) => {
  if (!iter)
    // {
    return reduce(f, head((iter = acc[Symbol.iterator]())), iter);
  // iter = acc[Symbol.iterator]();
  // acc = iter.next().value;
  // } else {
  iter = iter[Symbol.iterator]();
  // }
  return go1(acc, function recur(acc) {
    // 함수를 값으로 다루면서 이름을 짓는 '유명함수'
    let cur;
    while (!(cur = iter.next()).done) {
      // const a = cur.value;
      // acc = f(acc, a);
      acc = reduceF(acc, cur.value, f);
      // acc = acc instanceof Promise ? acc.then(acc => f(acc, a)) : f(acc, a); // 해결은 되나 이후에는 계속 Promise 이므로 비효율적, 성능저하
      if (acc instanceof Promise) return acc.then(recur);
      // 일단 원래대로 실행 하고 Promise 이면 then 이후 재수행
      // 나머지는 하나의 콜스택에서 수행되므로 효율적
    }
    return acc;
  });
});

const go = (...args) => reduce((a, f) => f(a), args);
const go1 = (a, f) => (a instanceof Promise ? a.then(f) : f(a));
const pipe = (f, ...fs) => (...args) => go(f(...args), ...fs); // fs = functions...

const range = l => {
  let i = -1;
  let res = [];
  while (++i < l) {
    res.push(i);
  }
  return res;
};

const L = {};
L.range = function* (l) {
  let i = -1;
  while (++i < l) {
    yield i;
  }
};

const take = curry((l, iter) => {
  let res = [];
  // for (const a of iter) {
  iter = iter[Symbol.iterator]();
  return (function recur() {
    let cur;
    while (!(cur = iter.next()).done) {
      const a = cur.value;
      if (a instanceof Promise) {
        return a
          .then(a => ((res.push(a), res).length == l ? res : recur()))
          .catch(e => (e == nop ? recur() : Promise.reject(e))); // if user defined reject "nop"? skip and recur
      }
      res.push(a);
      if (res.length == l) return res;
    }
    return res;
  })();
});

const find = curry((f, iter) => go(iter, L.filter(f), take(1), ([a]) => a));

L.map = curry(function* (f, iter) {
  for (const a of iter) {
    // iter = iter[Symbol.iterator]();
    // let cur;
    // while (!(cur = iter.next()).done) {
    //   const a = cur.value;
    // yield f(a);
    yield go1(a, f);
  }
});

const nop = Symbol("nop");

L.filter = curry(function* (f, iter) {
  for (const a of iter) {
    // iter = iter[Symbol.iterator]();
    // let cur;
    // while (!(cur = iter.next()).done) {
    //   const a = cur.value;
    // if (f(a)) yield a;
    const b = go1(a, f);
    if (b instanceof Promise) yield b.then(b => (b ? a : Promise.reject(nop)));
    else if (b) yield a;
  }
});

L.entries = function* (obj) {
  for (const k in obj) yield [k, obj[k]];
};

const takeAll = take(Infinity);
const map = curry(pipe(L.map, takeAll));
const filter = curry(pipe(L.filter, takeAll));

const isIterable = a => a && a[Symbol.iterator];

L.flatten = function* (iter) {
  for (const a of iter) {
    // if (isIterable(a)) for (const b of a) yield b;
    if (isIterable(a)) yield* a;
    else yield a;
  }
};

const flatten = pipe(L.flatten, takeAll);

L.deepFlat = function* f(iter) {
  for (const a of iter) {
    if (isIterable(a)) yield* f(a);
    else yield a;
  }
};

L.flatMap = curry(pipe(L.map, L.flatten));
const flatMap = curry(pipe(L.map, flatten)); // takeAll with flatten

const C = {}; // concurrency
function noop() {}
const catchNoop = ([...arr]) => (
  arr.forEach(a => (a instanceof Promise ? a.catch(noop) : a)), arr
);

C.reduce = curry((f, acc, iter) =>
  iter ? reduce(f, acc, catchNoop(iter)) : reduce(f, catchNoop(acc))
);

C.take = curry((l, iter) => take(l, catchNoop(iter)));

C.takeAll = C.take(Infinity);
C.map = curry(pipe(L.map, C.takeAll));
C.filter = curry(pipe(L.filter, C.takeAll));
