/*
  커스텀 promise 구현하기
*/

// const MyPromise = class {
//   constructor(executor) {}
//   resolve(value) {}
//   then(callback) {}
//   catch(callback) {}
// };

// new MyPromise((resolve, reject) => {
//   setTimeout(() => {
//     resolve("첫번째 프로미스");
//   }, 1000);
// })
//   .then((value) => {
//     console.log(value);
//     return "두번째 프로미스";
//   })
//   .then((value) => {
//     console.log(value);
//			throw '이건 에러야'
//   })
//   .catch((e) => {
//     console.log(e);
//   });

// 출력
// 첫번째 프로미스
// 두번째 프로미스
// 이건 에러야

/*
  커스텀 이터러블 이터레이터 구현하기
*/

// const iterable = ;

// let iterator = ;
// iterator.next();// 1
// iterator.next();// 2

// for (const a of iterator) console.log(a); // 3 4 5
// for (const a of iterable) console.log(a); // 1 2 3 4 5