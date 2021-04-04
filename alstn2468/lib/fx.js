/**
 * [map 함수]
 * @param {function} f    [위임할 보조함수]
 * @param {Iterable} iter [이터레이터]
 */
const map = (f, iter) => {
  let res = [];
  for (const a of iter) {
    res.push(f(a));
  }
  return res;
};

/**
 * [filter 함수]
 * @param {function} f    [위임할 보조함수]
 * @param {Iterable} iter [이터레이터]
 */
const filter = (f, iter) => {
  let res = [];
  for (const a of iter) {
    if (f(a)) res.push(a);
  }
  return res;
};

/**
 * [reduce 함수]
 * @param {function} f    [위임할 보조함수]
 * @param {any} [acc]     [초기값]
 * @param {Iterable} iter [이터레이터]
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

export { map, filter, reduce };
