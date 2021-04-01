import log from '../../lib/log';

// Array를 통해 알아보기
// Array는 인덱스를 이용해 값에 접근할 수 있다.
log('Arr ----------');
const arr = [1, 2, 3];
for (const a of arr) log(a);
// 1
// 2
// 3

// Symbol은 어떤 객체의 키로 사용될 수 있다.
// log(arr[Symbol.iterator]); // 어떤 함수가 들어있다 -> ƒ values() { [native code] }
// arr[Symbol.iterator] = null; // Array의 Symbol.iterator를 지우면 순회가 안된다.
// for (const a of arr) log(a); // arr is not iterable 오류 발생

// Set을 통해 알아보기
// Set은 인덱스를 이용해 Array와 같이 접근할 수 없다.
log('Set ----------');
const set = new Set([1, 2, 3]);
for (const a of set) log(a);
// 1
// 2
// 3

log(set[Symbol.iterator]); // 마찬 가지로 함수에 접근 가능 -> ƒ values() { [native code] }

// Map을 통해 알아보기
// Map은 인덱스를 이용해 Array와 같이 접근할 수 없다.
log('Map ----------');
const map = new Map([
  ['a', 1],
  ['b', 2],
  ['c', 3],
]);
for (const a of map) log(a);
// ['a', 1]
// ['b', 2]
// ['c', 3]

log(map[Symbol.iterator]); // 마찬 가지로 함수에 접근 가능 -> ƒ entries() { [native code] }

// 이터러블/이터레이터 프로토콜
// - 이터러블: 이터레이터를 반환하는 [Symbol.iterator]()를 가진 값
// - 이터레이터: { value, code } 객체를 반환하는 next()를 가진 값
// - 이터러블/이터레이터 프로토콜: 이터러블을 for...of, 전개 연산자 등과 함께 동작하도록한 규약
arr[Symbol.iterator]; // Array는 이터레이터를 반환하는 Symbol.iterator를 가지므로 이터러블이다.
let iterator = arr[Symbol.iterator](); // 이터레이터가 반환되었다.
log(iterator); // 이터레이터 -> Array Iterator {}

// 이터레이터의 next메서드는 { value, done }형태의 값을 반환한다.
log(iterator.next()); // {value: 1, done: false}
log(iterator.next()); // {value: 2, done: false}
log(iterator.next()); // {value: 3, done: false}
log(iterator.next()); // {value: undefined, done: true}

// for-of문은 done이 true이고 value가 비어있을 경우 반복문을 탈출한다.
let iter1 = arr[Symbol.iterator]();
iter1.next();
iter1.next();
for (const a of iter1) log(a);
// 3

// Set또한 이터러블 프로토콜을 따르므로 for-of 구문 사용 가능
let iter2 = set[Symbol.iterator]();
log(iter2.next()); // {value: 1, done: false}
log(iter2.next()); // {value: 2, done: false}
log(iter2.next()); // {value: 3, done: false}
log(iter2.next()); // {value: undefined, done: true}

// Map또한 이터러블 프로토콜을 따르므로 for-of 구문 사용 가능
let iter3 = map[Symbol.iterator]();
log(iter3.next()); // {value: ['a', 1], done: false}
log(iter3.next()); // {value: ['b', 2], done: false}
log(iter3.next()); // {value: ['c', 3], done: false}
log(iter3.next()); // {value: undefined, done: true}

// Map의 keys, values, entries 메서드는 이터레이터를 반환한다.
log(map.keys()); // MapIterator {"a", "b", "c"}
for (const a of map.keys()) log(a);
// a
// b
// c

log(map.values()); // MapIterator {1, 2, 3}
for (const a of map.values()) log(a);
// 1
// 2
// 3
log(map.entries()); // MapIterator {"a" => 1, "b" => 2, "c" => 3}
for (const a of map.entries()) log(a);
// ['a', 1]
// ['b', 2]
// ['c', 3]

// 이터러블인 values 함수의 반환값의 Symbol.iterator 호출로 반환된 이터레이터
let iter4 = map.values()[Symbol.iterator]();
log(iter4.next()); // {value: 1, done: false}
log(iter4.next()); // {value: 2, done: false}
log(iter4.next()); // {value: 3, done: false}
log(iter4.next()); // {value: undefined, done: true}
