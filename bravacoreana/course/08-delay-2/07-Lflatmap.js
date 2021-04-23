log("🔸 << 07.L.flatMap>> 🔸");

log([[1, 2], [3, 4], [5, 6, 7], 8, 9, [10]].flatMap((a) => a));
log(
  [
    [1, 2],
    [3, 4],
    [5, 6, 7],
  ].flatMap((a) => a.map((a) => a * a))
); // [1, 4, 9, 16, 25, 36, 49]

log(
  "map+map: ",
  [
    [1, 2],
    [3, 4],
    [5, 6, 7],
  ].map((a) => a.map((a) => a * a))
); // [Array(2), Array(2), Array(3)] - A

log(
  "flatten+map: ",
  flatten(
    [
      [1, 2],
      [3, 4],
      [5, 6, 7],
    ].map((a) => a.map((a) => a * a))
  )
); // [1, 4, 9, 16, 25, 36, 49] - B

// * map 과 flatten이 비효율적으로 동작하기 때문에 flatmap 이 있음
// A 처럼 안에 모든 값을 순회하며 새로운 배열을 만들고, 그 후 다시 전체를 순회하며 다시 배열을 담기 때문에 비효율적
// 순회하지 않아도 되는 부분이나, 연산이 불필요한 부분이 없기에 시간복잡도는 차이가 없음

L.flatMap = curry(pipe(L.map, L.flatten));

const it_flatMap = L.flatMap(
  map((a) => a * a),
  [
    [1, 2],
    [3, 4],
    [5, 6, 7],
  ]
);

log([...it_flatMap]); // [1, 4, 9, 16, 25, 36, 49]
// log(it_flatMap.next());
// log(it_flatMap.next());
// log(it_flatMap.next());
// log(it_flatMap.next());
// log(it_flatMap.next());
// log(it_flatMap.next());
// log(it_flatMap.next());
// log(it_flatMap.next());
