import log from '../../lib/log';

// 사용자 정의 이터러블을 통해 알아보기
const iterable = {
  // 이터러블은 Symbol.iterator 메서드를 구현하고 있어야한다.
  [Symbol.iterator]() {
    let i = 3;
    return {
      // 이터레이터는 next 메서드를 가지고 있어야한다.
      // next 메서드는 value와 done을 갖는 객체를 반환해야한다.
      next() {
        return i == 0
          ? { done: true }
          : {
              value: i--,
              done: false,
            };
      },
    };
  },
};

let iterator = iterable[Symbol.iterator]();
log(iterator.next()); // {value: 3, done: false}
log(iterator.next()); // {value: 3, done: false}
log(iterator.next()); // {value: 3, done: false}
log(iterator.next()); // {done: true}

// Symbol.iterator가 구현되어 있어 for-of 구문으로 순회 가능
for (const a of iterable) log(a);
// 3
// 2
// 1

const arr = [1, 2, 3];
for (const a of arr) log(a);
// 1
// 2
// 3

// 잘 구현된 이터러블은 이터레이터를 만들어 for-of로 순회할 수 있다.
// 또한 next 메서드 호출로 이미 순회된 이터레이터 이후의 값만 순회한다.
let iter2 = arr[Symbol.iterator]();
iter2.next();
for (const a of iter2) log(a);
// 2
// 3

// Symbol.iterator를 실행했을 때 자기 자신을 반환하는 이터레이터를 웰 폼드 이터러블, 이터레이터라고 할 수 있다.
log(iter2[Symbol.iterator]() == iter2); // true

const iterable2 = {
  [Symbol.iterator]() {
    let i = 3;
    return {
      next() {
        return i == 0
          ? { done: true }
          : {
              value: i--,
              done: false,
            };
      },
      // 웰 폼드 이터레이터를 반환하기 위해 추가
      // 자기 자신 또한 이터러블이며 Symbol.iterator를 실행할 경우 자기 자신을 반환하도록 한다.
      [Symbol.iterator]() {
        return this;
      },
    };
  },
};

let iterator2 = iterable2[Symbol.iterator]();
// 이터러블을 넣어도 이터레이터를 넣어도 순회가 된다.
// 중간부터 순회 또한 가능하다.
log(iterator2.next()); // {value: 3, done: false}
for (const a of iterator2) log(a);
// 2
// 1

// 많은 Web API또한 이터러블로 구현되어 있다.
for (const a of document.querySelectorAll('*')) log(a);
const all = document.querySelectorAll('*');
log(all); // NodeList() [...]
log(all[Symbol.iterator]()); // Array Iterator {}

let iterator3 = all[Symbol.iterator]();
log(iterator3.next()); // {value: html, done: false}
log(iterator3.next()); // {value: head, done: false}
log(iterator3.next()); // {value: meta, done: false}
