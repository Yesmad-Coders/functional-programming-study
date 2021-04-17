// > [1]
// go(
//   range(10000), // 미리 10000개를 가지는 배열을 만듬
//   take(5),
//   reduce(add),
//   log
// ); // 10

// > [2] Correct error with L.range
// go(
//   range(10003), // 미리 10003개를 가지는 배열을 만듬
//   take(5),
//   reduce(add),
//   log
// );

// go(
//   L.range(10003), // 미리 10003개를 가지는 배열을 만듬
//   take(5),
//   reduce(add),
//   console.log
// ); // 10

// > [3] Lazy
// ? purpose
// go(L.range(10000), L.reduce(add), log);

// > [4] Lazy map, filter
// go(
//   L.range(Infinity),
//   L.map((n) => n + 10),
//   L.filter((n) => n % 2),
//   take(10),
//   console.log
// ); // [11, 13, 15, 17, 19, 21, 23, 25, 27, 29]
