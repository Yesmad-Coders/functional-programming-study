log("🔸 << 03.join >> 🔸");

// join 함수 : 원래는 배열에만 사용 가능
log([1, 2, 3, 4].join()); // 1,2,3,4
log([1, 2, 3, 4].join("-")); //1-2-3-4

// join 함수 확장 : 배열이 아닌 값도 사용 가능
// 이 join 함수는 이터러블 프로토콜을 따르고, 그렇다는 것은 join에게 가기 전에 만들어지는 값들을 지연할 수 있다는 얘기가 된다.
// 하나씩 next() 를 통해 꺼낼 수 있기 때문

const join = curry((seperator = ",", iterable) =>
  reduce((a, b) => `${a}${seperator}${b}`, iterable)
);

const queryStr3 = pipe(
  Object.entries,
  map(([k, v]) => `${k}=${v}`),
  join("&")
);

log(queryStr3({ limit: 10, offset: 10, type: "notice" })); //limit=10&offset=10&type=notice

// 배열이 아닌 값에 join 확장 함수 적용
function* a() {
  yield 10;
  yield 11;
  yield 12;
  yield 13;
}
// log(a().join("-")); //TypeError: a(...).join is not a function
log("join-basic: ", join("-", a())); //10-11-12-13

const queryStr4 = pipe(
  Object.entries,
  map(([k, v]) => `${k}=${v}`),
  function (a) {
    console.log(a); // ["limit=10", "offset=10", "type=notice"]
    return a;
  },
  join("&")
);

log("queryStr4: ", queryStr4({ limit: 10, offset: 10, type: "notice" })); //limit=10&offset=10&type=notice

// join 함수에 L.map 적용 (지연성 함수도 사용 가능)

const queryStr5 = pipe(
  Object.entries,
  L.map(([k, v]) => `${k}=${v}`),
  function (a) {
    console.log(a); // Generator {<suspended>}
    return a;
  },
  join("&")
);

log("queryStr5: ", queryStr5({ limit: 10, offset: 10, type: "notice" })); //limit=10&offset=10&type=notice

// - entries 도 다음과 같이 만들 수 있다.

L.entries = function* (obj) {
  for (const k in obj) yield [k, obj[k]];
};
const it = L.entries({ limit: 10, offset: 10, type: "notice" }); //L.entries {<suspended>}
log(it.next()); //{value: Array(2), done: false}
log(it.next()); //{value: Array(2), done: false}
log(it.next()); //{value: Array(2), done: false}
log(it.next()); //{value: undefined, done: true}

const queryStr6 = pipe(
  Object.entries,
  L.map(([k, v]) => `${k}=${v}`),
  function (a) {
    console.log(a); // Generator {<suspended>}
    return a;
  },
  join("&")
);
