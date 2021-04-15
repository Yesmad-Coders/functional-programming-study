// range 함수 만들기
// 숫자 하나를 받고 그 숫자 크기만한 배열을 반환하는 함수

// // 우리가 원하는 결과물의 예시
// const range = (_) => _;
// log(range(5)); // [0,1,2,3,4]
// log(range(2)); // [0,1]

log("------01.range------");
const range = (length) => {
  let i = -1;
  let res = [];
  while (++i < length) {
    res.push(i);
  }
  return res;
};

log(range(5)); //[ 0, 1, 2, 3, 4 ]
log(range(2)); //[ 0, 1]

// range() 로 나온 배열 값들 모두 더하기

const add = (a, b) => a + b;
const list = range(5);
log(reduce(add, list));
