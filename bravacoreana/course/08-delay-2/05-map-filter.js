log("🔸 << 05.map-filter>> 🔸");

log(map((a) => a + 10, range(4))); //[10, 11, 12, 13]
log(map((a) => a + 10, L.range(4))); //[10, 11, 12, 13]

// // const takeAll = take(Infinity);

// // map 을 업그레이드 시킬 수 있다.

// const map_upgrade = curry((f, iter) => go(iter, L.map(f), takeAll));
// const map_upgrade2 = curry((f, iter) => go(L.map(f, iter), takeAll));
// const map_upgrade3 = curry(pipe(L.map, takeAll));

// log(
//   "map_upgrade: ",
//   map_upgrade((a) => a + 10, L.range(4))
// );
// log(
//   "map_upgrade2: ",
//   map_upgrade2((a) => a + 10, L.range(4))
// );
// log(
//   "map_upgrade3: ",
//   map_upgrade3((a) => a + 10, L.range(4))
// );

// // filter 도 업그레이드 시킬 수 있다.

// const filter_upgrade = curry(pipe(L.filter, takeAll));
// log(
//   "filter_upgrade: ",
//   filter_upgrade((a) => a % 2, L.range(4))
// ); // [1, 3]

log(filter((a) => a % 2, range(4))); // [1,3]

// // L.map upgrade
// // L.map = curry(function* (f, iter) {
// //   for (const a of iter) yield f(a);
// // });

// log(
//   "L.map: ",
//   map((a) => a + 10, L.range(4))
// );
