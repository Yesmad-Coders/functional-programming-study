// > step 1 - map, filter, reduce

// const map = () => {};
// const filter = () => {};
// const reduce = () => {}; // 인자가 2개든 3개든 다 가능하도록
// console.log(map((item) => item + 1, [1, 2, 3])); // 2 3 4
// console.log(filter((item) => item > 1, [1, 2, 3])); // 2 3
// console.log(reduce((acc, item) => acc + item, [1, 2, 3])); // 6

// > step 2 - curry

// const curry = ; // 인자가 2개 이상 모여야 실행하는 함수 리턴
// 참고 : 커리 사용 케이스
// 2개 이상일때가 원하는 시점
// 인자가 2개 이상이면 해당 함수를 실행하고
// 아니면 인자를 더 받아야하는 함수 리턴하고 나중에 받은 인자까지 합쳐서 실행하는 함수

// const mult = curry((a, b) => a \* b);  // 함수를 일단 등록

// case 1 두 개 이상 등록 시
// console.log(mult(3, 2)); // 바로 결과 산출 6

// case 2 하나만 등록 시
// const mult3 = mult(3); // 3이 미리 들어 가있고 추가 인자 전달시 값이 나오는 함수
// console.log(mult3(10)); // 30
// console.log(mult3(5)); // 15
// console.log(mult3(3)); // 9

// console.log(map((item) => item + 1)([1, 2, 3])); // 2 3 4
// console.log(filter((item) => item > 1)([1, 2, 3])); // 2 3
// console.log(reduce((acc, item) => acc + item)([1, 2, 3])); // 6

// > step 3 - go, pipe

// const go = ; // 함수 순차적으로 실행해서 값 내놓기
// const pipe = ; // 함수 순차적으로 실행할 하나의 함수 내놓기;
// console.log(
// go(
// [1, 2, 3],
// map((item) => item + 1),
// filter((item) => item > 2),
// reduce((acc, item) => acc + item)
// )
// ); // 7

// console.log(
// pipe(
// map((item) => item + 1),
// filter((item) => item > 2),
// reduce((acc, item) => acc + item)
// )([1, 2, 3])
// ); // 7

// > final step - pipe 를 이용해 쿠키런 킹덤 쿠키 정보표 띄우기

// 화면 출력 예시
/*
[[0, 1티어 쿠키런 킹덤 쿠키 정보표]]

쿠키 이름  쿠키 티어 쿠키 특성 쿠키 필요 토핑
에스프레소맛 쿠키  0티어 중앙마법  공격력증가
감초맛 쿠키 0티어 중앙마법  쿨타임감소
허브맛 쿠키 0티어 후방치유  공격력증가
다크초코 쿠키  0티어 전방돌격  방어력증가
석류맛 쿠키 1티어 후방지원  쿨타임 감소
호밀맛 쿠키 1티어 후방사격  공격력 증가
뱀파이어맛 쿠키 1티어 후방침투  공격력 증가
*/

const cookies = [
  "에스프레소맛 쿠키,  0티어,  중앙마법, 공격력증가",
  "감초맛 쿠키, 0티어,  중앙마법, 쿨타임감소",
  "허브맛 쿠키, 0티어,  후방치유, 공격력증가",
  "다크초코 쿠키,  0티어,  전방돌격, 방어력증가",
  "석류맛 쿠키, 1티어,  후방지원, 쿨타임 감소",
  "호밀맛 쿠키, 1티어,  후방사격, 공격력 증가",
  "뱀파이어맛 쿠키, 1티어,  후방침투, 공격력 증가",
  "우유맛 쿠키, 2티어,  전방방어, 방어력증가",
  "마들렌맛 쿠키,  2티어,  전방방어, 방어력증가",
  "민트초코 쿠키,  2티어,  후방지원, 쿨타임 감소",
  "독버섯맛 쿠키,  2티어,  중앙폭발, 공격력 증가",
  "정글전사 쿠키,  2티어,  후방사격, 쿨타임 감소",
  "칠리맛 쿠키, 2티어,  중앙침투, 공격력 증가",
  "스파클링맛 쿠키, 2티어,  후방치유, 공격력 증가",
  "자색 고구마맛 쿠키, 2.5티어,  전방돌격, 방어력증가",
  "웨어울프맛 쿠키, 2.5티어,  전방돌격, 방어력증가",
  "눈설탕맛 쿠키,  2.5티어, 중앙마법,  쿨타임 감소",
];

// const setCookieTable = ; // pipe로 구현 할 것

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

document.querySelector("#app").innerHTML = template;
