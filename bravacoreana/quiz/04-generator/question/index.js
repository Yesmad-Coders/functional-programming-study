import { range, take, go, reduce, add, map } from "./basic";
import L from "./lazy";
/**
 * 문제 1. 안 느긋한 range take 구현
 */

// go(
//   range(10000), // 미리 10000개를 가지는 배열을 만듬
//   take(5),
//   reduce(add),
//   console.log
// );
// 10 출력

/**
 * 문제 2. 느긋한 range 구현으로 에러 해결하기
 */

// 이 친구는 에러난다
// go(
//   range(10003), // 미리 10003개를 가지는 배열을 만듬
//   take(5),
//   reduce(add),
//   console.log
// );

// go(
//   L.range(10003), // 미리 10003개를 가지는 배열을 만듬
//   take(5),
//   reduce(add),
//   console.log
// );
// 10 출력

/**
 * 문제 3. 느슨하게 연산하기
 */

// go(L.range(10000), L.reduce(add), console.log);
// 500500 출력

/**
 * 문제 4. 느긋한 map filter
 */

// go(
//   L.range(Infinity),
//   L.map((n) => n + 10),
//   L.filter((n) => n % 2),
//   take(10),
//   console.log
// );
// [11, 13, 15, 17, 19, 21, 23, 25, 27, 29] 출력
