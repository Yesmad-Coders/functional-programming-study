log("🔸 << . Generator & Iterator >> 🔸");

/*
- 제너레이터: 이터레이터이자 이터러블을 생성하는 함수(이터레이터를 리턴하는 함수)
- 마지막에 리턴값 순회도 됨
*/

function* gen() {
  yield 1;
  yield 2;
  yield 3;
  return 100;
}

let iterator = gen();

log(iterator[Symbol.iterator]() === iterator); // true
log(iterator.next()); //{value: 1, done: false}
log(iterator.next()); //{value: 2, done: false}
log(iterator.next()); //{value: 3, done: false}
log(iterator.next()); //{value: 100, done: true}

/*
- #1. 제너레이터를 사용하면 제너레이터의 실행결과가 이터레이터이자 이터러블 -> 따라서 순회 가능
- 단, 순회할 때는 리턴값 반환되지 않음
- #2. 순회할 값을 문장으로 표현할 수도 할 수 있음
*/

log("🔽 #1. 제너레이터:순회가능, 단 리턴값 반환 x");
for (const a of gen()) log(a);

function* gen_sentence() {
  yield 1;
  if (false) yield 2;
  yield 3;
}

let iter_sentence = gen_sentence();
log("🔽 #2. 순회할 값을 문장으로도 표현 가능");
log(iter_sentence.next());
log(iter_sentence.next());
log(iter_sentence.next());

/*
- 자바스크립트에서는 제너레이터를 이용해 어떤 상태나 어떤 값이든 순회할 수 있게 할 수 있다
- 문장을 통해 순회할 수 있는 값을 표현할 수 있기 때문

function test() {
  yield 1;
  if (false) yield 2;
  yield 3;
}

const testlog = test() // 제너레이터가 아닌 함수에서는 error 발생
*/
