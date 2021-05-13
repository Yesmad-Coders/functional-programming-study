log("🔸 << 2. 이터러블 프로토콜을 따른 map의 다형성 1 >> 🔸");

log([1, 2, 3].map((a) => a + 1)); // [2,3,4]
log(document.querySelectorAll("*"));
// NodeList(10)
// 0: html
// 1: head
// 2: meta
// 3: meta
// 4: meta
// 5: title
// 6: body
// 7: script
// 8: script
// 9: script
// - array 처럼 생겼지만 map 함수를 쓸 수 없다, why?
// -> document.querySelector는 array를 상속받은 객체가 아니기 때문에
// -> map 함수가 구현되어 있지 않음

log(document.querySelectorAll("*").map); // undefined

log(map((el) => el.nodeName, document.querySelectorAll("*")));
// ["HTML", "HEAD", "META", "META", "META", "TITLE", "BODY", "SCRIPT", "SCRIPT", "SCRIPT"]
// - 앞에서 만든 map 함수로는 document.querySelectorAll의 값을 배열 형태로 가져올 수 있음, how?
// -> document.querySelector가 이터러블 프로토콜을 따르고 있기 때문
const it = document.querySelectorAll("*")[Symbol.iterator]();
log(it); // Array Iterator {}
log(it.next()); //{value: body, done: false}
log(it.next()); //{value: body, done: false}
log(it.next()); //{value: body, done: false}
log(it.next()); //{value: body, done: false}
log(it.next()); //{value: body, done: false}
log(it.next()); //{value: body, done: false}
log(it.next()); //{value: body, done: false}
log(it.next()); //{value: body, done: false}
log(it.next()); //{value: body, done: false}
log(it.next()); //{value: body, done: false}
log(it.next()); //{value: body, done: true}

// -> 우리가 만든 map 함수는 이터러블 프로토콜을 따르는 for of 문을 사용했기 때문에 순회가 가능
// -> 즉, map 함수는 단순한 배열 뿐만 아니라, 다른 이터러블 프로토콜을 따르는 많은 함수들을 사용할 수 있음

function* gen() {
  yield 1;
  if (false) yield 2;
  yield 3;
}
log(map((a) => a * a, gen())); // [1, 4, 9]

// -> 이렇게 generator 함수도 map 함수를 이용해 순회가 가능. ==> map 함수는 다형성이 높다!
