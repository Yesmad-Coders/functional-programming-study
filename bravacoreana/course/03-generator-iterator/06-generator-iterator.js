log("🔸 << 06. generator and iterator >> 🔸");

// 제너레이터:
// 이터레이터이자 이터러블을 생성하는 함수 -> 이터레이터를 리턴하는 함수

function* gen() {
  yield 1;
  yield 2;
  yield 3;
}

let iter = gen();

log(iter[Symbol.iterator]() === iter); // true  // * ====> #1
// log(iter.next());
// log(iter.next());
// log(iter.next());
// log(iter.next());

// * #1
// 제너레이터를 실행한 이터레이터(iter)는 심볼 이터레이터를 가지고 있고,
// 그 이터레이터의 실행 결과는 자기 자신이다. 그러므로 제너레이터는 well-formed iterator 를 리턴하는 함수

// ====================================

// 제너레이터의 실행결과가 이터레이터이자 이터러블이기 때문에 for of를 통한 순회가 가능

log("## gen()");
for (const a of gen()) log(a);
// 1
// 2
// 3

log("## iter");
for (const a of iter) log("iter: ", a);

// =====================================

// 리턴값도 만들 수 있음

function* gen2() {
  yield 1;
  yield 2;
  yield 3;
  return 100;
}

let iter2 = gen2();

// log(iter2.next());
// log(iter2.next());
// log(iter2.next());
// log(iter2.next()); // {value: 100, done: true}

for (const a of iter2) log(a); // * =====> #2
// 1
// 2
// 3

// * #2. 순회할 때는 리턴값이 나오지 않음에 주의

// =====================================

// 다음과 같이 문장으로도 만들 수 있음

function* gen3() {
  yield 1;
  if (false) yield 2;
  yield 3;
  return 100;
}

for (const a of gen3()) log(a);
// 1
// 3

// !
// 자바스크립트에서 이터러블이면 순회할 수 있다.
// 제너레이터는 문장을 값으로 만들 수 있고,
// 그 문장을 통해 순회하는 값을 만들 수 있기 때문에
// 자바스크립트에서는 제너레이터를 통해 어떤 상태나 어떤 값이든 순회할 수 있게 만들 수 있다.

// TODO: generator 공부!
