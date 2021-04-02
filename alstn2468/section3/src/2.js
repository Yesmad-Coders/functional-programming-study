import 'regenerator-runtime/runtime';
import log from '../../lib/log';

// 이터러블 프로토콜을 따른 map의 다형성 1

/**
 * [map 함수]
 * @param {Iterable} iter [이터레이터]
 * @param {function} f    [위임할 보조함수]
 */
const map = (f, iter) => {
  let res = [];
  for (const a of iter) {
    res.push(f(a));
  }
  return res;
};

// NodeList에는 map 함수가 존재하지 않는다.
log(document.querySelectorAll('*').map); // undefined

// 직접 구현한 map함수는 document.querySelectorAll의 반환값에도 사용할 수 있다.
// document.querySelectorAll의 반환값은 이터러블 프로토콜을 따르고 있다.
log(map((el) => el.nodeName, document.querySelectorAll('*'))); // ["HTML", "SCRIPT", ...  "BODY", "SCRIPT"]

const iter = document.querySelectorAll('*')[Symbol.iterator]();
log(iter.next()); // {value: html, done: false}

// 이터러블 프로토콜을 따르는 모든 이터러블에 map을 사용할 수 있다.
// 따라서 구현한 map 함수는 다형성이 굉장히 높다.
// 이터러블 프로토콜을 따르는 함수를 사용하는 것은 앞으로 많은 헬퍼 함수를 사용할 수 있다.
function* gen() {
  yield 2;
  yield 3;
  yield 4;
}

log(map((a) => a * a, gen())); // [4, 9, 16]
