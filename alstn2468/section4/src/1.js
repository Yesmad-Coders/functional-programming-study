import 'regenerator-runtime/runtime';
import log from '../../lib/log';
import { reduce } from '../../lib/fx';

// go

/**
 * [go 함수]
 * @template T, U
 * @param {[T, ...funcs: Array<Function>]} args [초기값, 보조함수 배열]
 * @returns {U}
 */
const go = (...args) => reduce((a, f) => f(a), args);

go(
  0,
  (a) => a + 1,
  (a) => a + 10,
  (a) => a + 100,
  log
); // 111
