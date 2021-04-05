/**
 * [map 함수]
 * @template T, U
 * @param {function} f       [위임할 보조함수]
 * @param {Iterable<T>} iter [이터레이터]
 * @returns {Iterable<U>}
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
 * @template T, U
 * @param {function} f       [위임할 보조함수]
 * @param {Iterable<T>} iter [이터레이터]
 * @returns {Iterable<U>}
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
 * @template T, U
 * @param {function} f       [위임할 보조함수]
 * @param {any} [acc]        [초기값]
 * @param {Iterable<T>} iter [이터레이터]
 * @returns {Iterable<U>}
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

/**
 * [go 함수]
 * @template T, U
 * @param {[T, ...funcs: Array<Function>]} args [초기값, 보조함수 배열]
 * @returns {U}
 */
const go = (...args) => reduce((a, f) => f(a), args);

/**
 * [pipe 함수]
 * @template T, U
 * @param {Function} f            [첫 번째 보조함수]
 * @param {Array<Function>} funcs [나머지 보조함수]
 * @returns {(...args: T) => U}
 */
const pipe = (f, ...funcs) => (...args) => go(f(...args), ...funcs);

export { map, filter, reduce, go, pipe };
