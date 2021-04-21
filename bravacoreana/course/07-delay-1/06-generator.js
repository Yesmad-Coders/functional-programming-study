// > 이터러블 중심 프로그래밍에서 지연 평가 (Lazy Evaluation)

// - 졔때 계산법: 가장 필요할 때까지 미루다가 해당하는 코드들을 평가하면서 값들을 만들어 나가는 기법
// - 느긋한 계산법
// - 제너레이터/이터레이터 프로토콜을 기반으로 구현

// * L.map (지연성을 가진 map으로 만들기 - 제너레이터/이터레이터 프로토콜을 기반으로 구현!)

const L = {};
L.map = function* (f, iterator) {
  for (const a of iterator) yield f(a);
};

const it = L.map((a) => a + 10, [1, 2, 3]); // 여기까지는 아무것도 진행되지 않음

// log(it.next()); // next() 해줘야 함
// log(it.next());
// log(it.next());
log([...it]);

// * L.filter

L.filter = function* (f, iterator) {
  for (const a of iterator) if (f(a)) yield a;
};

const it2 = L.filter((a) => a % 2, [1, 2, 3, 4]);
// log(it2.next());
// log(it2.next());
// log(it2.next());
log([...it2]); // 1, 3

// > map, filter 계열 함수들이 가지는 결합 방식
// - 사용하는 데이터가 무엇이든지
// - 사용하는 보조 함수가 순수 함수라면 무엇이든지
// - 아래와 같이 결합한다면 둘 다 결과가 같다.
/*
[
  [mapping, mapping],
  [filtering, filtering],
  [mapping, mapping],
];
*/
