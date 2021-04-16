const curry = (f) => (a, ..._) =>
  _.length ? f(a, ..._) : (..._) => f(a, ..._);

const L = {};

/**
 * 문제 2. 느긋한 range 구현으로 에러 해결하기
 */

// L.range = ;

/**
 * 문제 3. 느슨하게 연산하기
 */

// reduce가 100번 루프당 한번씩 제어권을 반환하면서 루프를 돌도록 개선하시오
// 힌트 : 나는 setTimeout 활용

// 잡설)
// 책에 없는데 코드샌드박스가 10000번 루프 제한 만들어 놔서 그냥 만들어 봤음
// range 도 10000번 루프 통과하도록 개선해 봤는데 그냥 이중 반복문로 개선해서 통과 됨
// 사실 generator 를 이용하면 큰 루프도 제어권 계속 반복하기 때문에 큰 의미는 없다

// const reduce = (f, acc, iter) => {
//   if (!iter) {
//     iter = acc[Symbol.iterator]();
//     acc = iter.next().value;
//   } else {
//     iter = iter[Symbol.iterator]();
//   }
//   let cur;
//   while (!(cur = iter.next()).done) {
//     const a = cur.value;
//     acc = f(acc, a);
//   }
//   return acc;
// };

// L.reduce = curry(reduce);

/**
 * 문제 4. 느긋한 map filter
 */

// L.map = curry();

// L.filter = curry();

export default L;
