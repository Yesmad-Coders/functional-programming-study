log("🔸 << 04. iterable-protocol 2 >> 🔸");

// > 사용자 정의 이터러블을 통해 알아보기

// 이터러블 값 정의

const iterable_sample = {
  [Symbol.iterator]() {
    // #1
    return {
      // #2
      next() {
        return { value, done };
      },
    };
  },
};

// #1. 이터러블은 [Symbol.iterator]() 메소드를 구현해야 함.
// #2. Symbol.iterator 메소드는 이터레이터를 반환해야 함.
// 그 이터레이터는 next()를 메소드를 가지고 있으며 next는 value와 done을 가지고 있는 객체를 리턴해야 함.

// ================================

// 3, 2, 1 을 리턴하는 이터러블을 만들어 보자

log("## 3,2,1 을 리턴하는 이터러블 만들기");
const iterable_incomplete = {
  [Symbol.iterator]() {
    let i = 3;
    return {
      next() {
        return i === 0 ? { done: true } : { value: i--, done: false };
      },
    };
  },
};

let iterator_incomplete = iterable_incomplete[Symbol.iterator]();
// log(iterator_incomplete.next());
// log(iterator_incomplete.next());
// log(iterator_incomplete.next());
// log(iterator_incomplete.next());

for (const a of iterable_incomplete) log(a);
// 3
// 2
// 1

// iterable에 Symbol.iterator 가 구현되었기 때문에 for of 문에도 들어갈 수 있음
// 하지만 이것도 아직 미완성 작

// ==================================

// array를 통해 위의 iterable이 왜 미완성인지 살펴보자

// 잘 구현된 iterable은 이터레이터를 만들었을 때 이터레이터를 진행하다가 순회할 수도 있고
// 이터레이터를 그대로 for of 문에 넣었을 때 모든 값을 순회할 수 있기도 함

log("## array를 통해 iterable 살펴보기");
const arr2 = [1, 2, 3];
let iter2 = arr2[Symbol.iterator]();
// iter2.next(); // #1
log(iter2[Symbol.iterator]);
// [Symbol.iterator]() { [native code] }
log(iter2[Symbol.iterator]() === iter2); // #2
// true
for (const a of iter2) log(a);
// 2
// 3

// #1. 일부를 진행한 이후의 값들로도 순회 가능
// #2. symbol.iterator()를 실행한 값은 자기 자신

// > 이터레이터가 자기 자신을 반환하는 symbol.iterator()를 가지고 있을 때
// > well-formed iterator, well-formed iterable 이라고 할 수 있다.

// 따라서 이터레이터가 자기 자신을 반환하는 symbol.iterator()를 갖게 하기 위해
// 다음과 같이 이터러블을 완성 시킨다.

// ====================================

log("## 이터러블 완성하기");

const iterable = {
  [Symbol.iterator]() {
    let i = 3;
    return {
      next() {
        return i == 0 ? { done: true } : { value: i--, done: false };
      },
      [Symbol.iterator]() {
        // #2
        return this;
      },
    };
  },
};

let iterator = iterable[Symbol.iterator](); // #3
for (const a of iterator) log(a); // #1

// #1. iterable이 아니라 iterator를 돌림에 주의하자!!!
// #2. iterator도 iterable이 되게 만듦!
// #3. #2 덕분에 iterator로 반환한 값을 #1 에서처럼 순회해도 값이 반환 됨.
// 따라서
//
//   [Symbol.iterator]() {
//     return this;
//   },
//
// 이거 주석처리하면 타입에러남 -> why? "이터러블"은 iterable이 아니므로!

// 결론
// well-formed iterator 란?
// 이터러블을 넣어서 순회해도 순회가 되고
// 이터러블을 이터레이터로 만든 상태에서 순회를 해도 순회가 되고
// 일정 부분 이터레이터를 진행한 후에 실행을 해도 순회가 되도록 하는 것

/*
## 빌트인 이터러블
- Array
- String
- Map
- Set
- TypedArray(Int8Array, Uint8Array, Uint8ClampedArray, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array)
- DOM data structure(NodeList, HTMLCollection)
- Arguments
*/

// ======================================

log("## 빌트인 이터러블 예: DOM data structure");

for (const a of document.querySelectorAll("*")) log(a); // #1
const all = document.querySelectorAll("*");
log(all); // #2
log(all[Symbol.iterator]); // #3
// values() { [native code] }
log(all[Symbol.iterator]()); // #4
//Array Iterator {}

let iter3 = all[Symbol.iterator]();
log(iter3.next()); // #5
log(iter3.next());
log(iter3.next());
for (const a of iter3) log(a);

// #1 이 가능한 이유는 #2에서 보는 것처럼 얘가 배열이라서 그런 것이 아니라(NodeList임)
// #3 처럼 Symbol.iterator가 구현되어 있기 때문이다
// #4 그리고 #3을 실행했을 때 이터레이터를 만들고,
// #5 안에 있는 값들을 리턴해줌
