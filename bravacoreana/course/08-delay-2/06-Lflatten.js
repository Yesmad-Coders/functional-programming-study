log("🔸 << 06.flatten>> 🔸");
// L.flatten : 다 펼쳐서 리턴되는데 지연되는 함수
log("spread: ", [...[1, 2], 3, 4, ...[5, 6], ...[7, 8, 9]]);
//  [1, 2, 3, 4, 5, 6, 7, 8, 9] ==> 마치 이것처럼 출력

// 이터러블 프로토콜을 이용한 지연적으로 동작하는 함수를 만들기 위해
// 제너레이터로 함수를 선언

const isIterable = (a) => a && a[Symbol.iterator];

L.flatten_old = function* (iter) {
  for (const a of iter) {
    if (isIterable(a)) for (const b of a) yield b;
    else yield a;
  }
};
const iterator_old = L.flatten_old([[1, 2], 3, 4, [5, 6], [7, 8, 9]]);
log("L.flatten_old: ", [...iterator_old]);

// yield*
// yield *iterable 은 for(const val of iterable) yield val; 과 같다
L.flatten = function* (iter) {
  for (const a of iter) {
    if (isIterable(a)) yield* a;
    else yield a;
  }
};
const iterator = L.flatten([[1, 2], 3, 4, [5, 6], [7, 8, 9]]);
log("L.flatten: ", [...iterator]);
log(
  "L.flatten, take(3): ",
  take(3, L.flatten([[1, 2], 3, 4, [5, 6], [7, 8, 9]]))
);
// log(iterator.next());
// log(iterator.next());
// log(iterator.next());
// log(iterator.next());
// log(iterator.next());
// log(iterator.next());
// log(iterator.next());
// log(iterator.next());
// log(iterator.next());
// log(iterator.next());

const flatten = pipe(L.flatten, takeAll);
log("flatten: ", flatten([[1, 2], 3, 4, [5, 6], [7, 8, 9]]));
log("flatten: ", flatten([[1, 2], 3, 4, [5, 6], [7, 8, 9]]));

log("🔸 << 06-1.L.deelflat>> 🔸");

// L.deepFlat
// 깊은 iterable을 모두 펼치고 싶다면 L.deelFlat을 쓴다

L.deepFlat = function* f(iter) {
  for (const a of iter) {
    if (isIterable(a)) yield* f(a);
    else yield a;
  }
};

log([...L.deepFlat([1, [2, [3, 4], [[5]]]])]); // [1,2,3,4,5]
