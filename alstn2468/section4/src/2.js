import 'regenerator-runtime/runtime';
import log from '../../lib/log';
import { reduce } from '../../lib/fx';

// pipe

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

// pipe함수는 함수를 반환하는 함수다.
const f = pipe(
  (a) => a + 1,
  (a) => a + 10,
  (a) => a + 100
);
log(f(0)); // 111

const f2 = pipe(
  (a, b) => a + b,
  (a) => a + 10,
  (a) => a + 100
);
log(f2(0, 1)); // 111
