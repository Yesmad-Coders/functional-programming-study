/**
 * 함수형 구현해보기
 */

/**
 * step 1) map filter reduce 구현 하기
 */

const curry = (f) => {
  let arity = f.length; // 함수의 인자 갯수
  return (function resolver() {
    let memory = Array.prototype.slice.call(arguments);
    // 지금까지 받은 인자를 기억하는 변수
    return function () {
      let local = memory.slice();
      Array.prototype.push.apply(local, arguments);
      // 기억중인 인자에 새로운 인자를 추가
      let next = local.length >= arity ? f : resolver;
      return next.apply(null, local);
      // 인자의 개수가 요구되는 인자 갯수를 충족하면 f 호출
      // 작을 경우 resolver 호출 -> f가 호출될 떄 까지 유지
    };
  })();
};

const map = curry((iteratee, arr) => {
  let newArr = [];
  for (let i = 0; i < arr.length; i++) {
    newArr.push(iteratee(arr[i]));
  }
  return newArr;
});
const filter = curry((perdicate, arr) => {
  let newArr = [];
  for (let i = 0; i < arr.length; i++) {
    if (perdicate(arr[i])) newArr.push(arr[i]);
  }
  return newArr;
});
const reduce = curry((iteratee, arr, initialValue = undefined) => {
  let acc,
    startIndex = 0;
  if (initialValue) {
    acc = initialValue;
  } else {
    acc = arr[0];
    startIndex = 1;
  }
  for (let i = startIndex; i < arr.length; i++) {
    acc = iteratee(acc, arr[i]);
  }
  return acc;
}); // 인자가 2개든 3개든 다 가능하도록

console.log(
  '1-map:',
  map((item) => item + 1, [1, 2, 3])
); // 2 3 4
console.log(
  '1-filter:',
  filter((item) => item > 1, [1, 2, 3])
); // 2 3
console.log(
  '1-reduce-2arg:',
  reduce((acc, item) => acc + item, [1, 2, 3])
); // 6
console.log(
  '1-reduce-3arg:',
  reduce((acc, item) => acc + item, [1, 2, 3], 5)
); // 11

/**
 * step 2) curry 함수 반영시 동작가능
 */

/**
 * 참고 : 커리 사용 케이스
  2개 이상일때가 원하는 시점
  인자가 2개 이상이면 해당 함수를 실행하고
  아니면 인자를 더 받아야하는 함수 리턴하고 나중에 받은 인자까지 합쳐서 실행하는 함수

  // const mult = curry((a, b) => a * b);
  // 함수를 일단 등록

  // case1 두개 이상 등록시
  console.log(mult(3, 2)); // 바로 결과 산출 6

  // case2 하나만 등록시
  const mult3 = mult(3); // 3이 미리 들어 가있고 추가 인자 전달시 값이 나오는 함수
  console.log(mult3(10)); // 30
  console.log(mult3(5)); // 15
  console.log(mult3(3)); // 9
 */

const mult = curry((a, b) => a * b);
console.log('2-curry-mult:', mult(3, 2)); // 바로 결과 산출 6

const mult3 = mult(3); // 3이 미리 들어 가있고 추가 인자 전달시 값이 나오는 함수
console.log('2-curry-mult3-1:', mult3(10)); // 30
console.log('2-curry-mult3-2:', mult3(5)); // 15
console.log('2-curry-mult3-3:', mult3(3)); // 9

/**
 * step 3) go pipe 구현 해보기
 */

const go = (...arr) => reduce((acc, func) => func(acc), arr);
// 함수 순차적으로 실행해서 값 내놓기
const pipe = (...funcs) => (arr) =>
  reduce((value, func) => func(value), [arr, ...funcs]);
// 함수 순차적으로 실행할 하나의 함수 내놓기;

console.log(
  go(
    [1, 2, 3],
    map((item) => item + 1),
    filter((item) => item > 2),
    reduce((acc, item) => acc + item)
  )
); // 7

console.log(
  pipe(
    map((item) => item + 1),
    filter((item) => item > 2),
    reduce((acc, item) => acc + item)
  )([1, 2, 3])
); // 7

/**
 * step 4) 함수형 이용해서 HTML 적용해보기
 */

const cookies = [
  '에스프레소맛 쿠키,	0티어,	중앙마법,	공격력증가',
  '감초맛 쿠키,	0티어,	중앙마법,	쿨타임감소',
  '허브맛 쿠키,	0티어,	후방치유,	공격력증가',
  '다크초코 쿠키,	0티어,	전방돌격,	방어력증가',
  '석류맛 쿠키,	1티어,	후방지원,	쿨타임 감소',
  '호밀맛 쿠키,	1티어,	후방사격,	공격력 증가',
  '뱀파이어맛 쿠키,	1티어,	후방침투,	공격력 증가',
  '우유맛 쿠키,	2티어,	전방방어,	방어력증가',
  '마들렌맛 쿠키,	2티어,	전방방어,	방어력증가',
  '민트초코 쿠키,	2티어,	후방지원,	쿨타임 감소',
  '독버섯맛 쿠키,	2티어,	중앙폭발,	공격력 증가',
  '정글전사 쿠키,	2티어,	후방사격,	쿨타임 감소',
  '칠리맛 쿠키,	2티어,	중앙침투,	공격력 증가',
  '스파클링맛 쿠키,	2티어,	후방치유,	공격력 증가',
  '자색 고구마맛 쿠키,	2.5티어,	전방돌격,	방어력증가',
  '웨어울프맛 쿠키,	2.5티어,	전방돌격,	방어력증가',
  '눈설탕맛 쿠키,	2.5티어, 중앙마법,	쿨타임 감소',
];

const TIER_INDEX = 1;
const MINIMUM_TIER = 2;

const setCookieTable = pipe(
  map((item) => item.split(',')),
  filter((item) => parseInt(item[TIER_INDEX]) < MINIMUM_TIER),
  map((item) => map((cookie) => `<td>${cookie.trim()}</td>`, item)),
  map((item) => item.join('')),
  reduce((acc, item) => acc + `<tr>${item}</tr>`)
); // pipe로 구현 할 것

const template = `<table>
    <thead>
        <tr>
            <th colspan="4">[[0, 1티어 쿠키런 킹덤 쿠키 정보표]]</th>
        </tr>
    </thead>
    <tbody>
        <colgroup span="4" class="columns"></colgroup>
        <tr>
          <td>쿠키 이름</td>
          <td>쿠키 티어</td>
          <td>쿠키 특성</td>
          <td>쿠키 필요 토핑</td>
        </tr>
        ${setCookieTable(cookies)}
    </tbody>
  </table>`;

document.querySelector('#app').innerHTML = template;

// 화면 출력
//   [[0, 1티어 쿠키런 킹덤 쿠키 정보표]]
// 쿠키 이름	쿠키 티어	쿠키 특성	쿠키 필요 토핑
// 에스프레소맛 쿠키	0티어	중앙마법	공격력증가
// 감초맛 쿠키	0티어	중앙마법	쿨타임감소
// 허브맛 쿠키	0티어	후방치유	공격력증가
// 다크초코 쿠키	0티어	전방돌격	방어력증가
// 석류맛 쿠키	1티어	후방지원	쿨타임 감소
// 호밀맛 쿠키	1티어	후방사격	공격력 증가
// 뱀파이어맛 쿠키	1티어	후방침투	공격력 증가