import log from '../../lib/log';

// 기존 달라진 ES6에서의 리스트 순회
// - for i++
// - for of

const list = [1, 2, 3];

// 기존의 리스트 순회
// length 속성에 의존해 숫자 값인 인덱스로 순회
for (var i = 0; i < list.length; i++) {
  log(list[i]);
  // 1
  // 2
  // 3
}

// 유사배열도 동일하게 순회
const str = 'abc';
for (var i = 0; i < str.length; i++) {
  log(str[i]);
  // a
  // b
  // c
}

// ES6에서 변경된 순회
// for-of 구문을 이용해 간결하게 순회 가능
for (const a of list) {
  log(a);
  // 1
  // 2
  // 3
}
for (const a of str) {
  log(a);
  // a
  // b
  // c
}
