// Liha's answer

const log = console.log;

const curry = (f) => (...arr) =>
  arr.length >= 2 ? f(...arr) : (...param) => f(...arr, ...param);

const map = curry((f, iter) => {
  let arr = [];
  for (const a of iter) {
    arr.push(f(a));
  }
  return arr;
});

const filter = curry((f, iter) => {
  let arr = [];
  for (const a of iter) {
    if (f(a)) arr.push(a);
  }
  return arr;
});

const reduce = curry((f, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  }
  for (const a of iter) {
    acc = f(acc, a);
  }
  return acc;
}); // 인자가 2개든 3개든 다 가능하도록*

// console.log(map((item) => item + 1, [1, 2, 3]));
// console.log(filter((item) => item > 1, [1, 2, 3]));
// console.log(reduce((acc, item) => acc + item, [1, 2, 3])); // 6(인자 2개)
// console.log(reduce((acc, item) => acc + item, 1, [1, 2, 3])); //7(인자 3개)

// const curry = ; // 인자가 2개 이상 모여야 실행하는 함수 리턴

// const mult = curry((a, b) => a * b);
// log(mult(3, 2));

// const mult3 = mult(3); // 3이 미리 들어 가있고 추가 인자 전달시 값이 나오는 함수
// log(mult3(10)); // 30
// log(mult3(5)); // 15
// log(mult3(3)); // 9

const go = (...args) => reduce((a, f) => f(a), args);
const pipe_old = (...fs) => (a) => go(a, ...fs);
const pipe = (f, ...fs) => (...a) => go(f(...a), ...fs);

// go(
//   [1, 2, 3],
//   map((item) => item + 1),
//   filter((item) => item > 2),
//   reduce((acc, item) => acc + item),
//   log // 7
// );

// log(
//   pipe(
//     map((item) => item + 1),
//     filter((item) => item > 2),
//     reduce((acc, item) => acc + item)
//   )([1, 2, 3])
// );

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

// pipe로 구현 해 보기
// 쿠키 중 0 티어, 1 티어 쿠키들만 뽑아내 화면에 띄우기
// 1) 0 티어, 1 티어 가 있나? 있으면 뽑아내기 - x
// 2) element 쪼개기
// 3) 그걸 퍼트려 넣을 방법을 찾아보자.... 흐엉

const WORD = "0티어";
const WORD2 = "1티어";
const FILTER_LIST = ["0티어", "1티어"];

// const filterItem = (arr1, arr2) => {
//   let arr = [];
//   for (const a of arr2) {
//     for (const b of arr1) {
//       if (a.includes(b)) {
//         arr.push(a);
//       }
//     }
//   }
//   return arr;
// };

// log(filterItem(FILTER_LIST, cookies));

// start
const filterCookie = filter(
  (cookie) => cookie.includes(WORD) || cookie.includes(WORD2),
  cookies
); // 확장성의 한계가 있어서 고민 🤔

// const filterCookie = filter(
//   (cookie) => map((word) => word.includes(cookie), FILTER_LIST),
//   cookies
// );

log("filterCookie-------------");
log(filterCookie);

const arrayList = map((array) => array.split(","), filterCookie);
log("arrayList-------------");
log(arrayList);

const tdList = map(
  (array) => map((element) => `<td>${element.trim()}</td>`, array),
  arrayList
);
log("tdList-------------");
log(tdList);

const removeComma = map((array) => array.toString().replace(/,/g, ""), tdList);
log("removeComma-------------");
log(removeComma);

const trList = map((array) => `<tr>${array}</tr>`, removeComma);
log("trList-------------");
log(trList);

const reduceList = reduce((acc, array) => acc + array, trList);
log("reduceList-------------");
log(reduceList);

const setCookieTable = pipe(
  filter((cookie) => map((word) => word.includes(cookie), FILTER_LIST)),
  // filter((cookie) => cookie.includes(WORD) || cookie.includes(WORD2)),
  map((array) => array.split(",")),
  map((array) => map((element) => `<td>${element.trim()}</td>`, array)),
  map((array) => array.toString().replace(/,/g, "")),
  map((array) => `<tr>${array}</tr>`),
  reduce((acc, array) => acc + array)
);

// 민수님 코드
const setCookieTable_Minsu = pipe(
  filter((cookie) =>
    // word.includes(cookie) -> cookie.includes(word)
    map((word) => cookie.includes(word), FILTER_LIST).some(Boolean)
  ),
  map((array) => array.split(",")),
  map((array) => map((element) => `<td>${element.trim()}</td>`, array)),
  map((array) => array.toString().replace(/,/g, "")),
  map((array) => `<tr>${array}</tr>`),
  reduce((acc, array) => acc + array)
);

// 스티비님 코드
const filterCookie_Stevy = filter(
  (cookie) => FILTER_LIST.some((filterItem) => cookie.includes(filterItem)),
  cookies
);

const setCookieTable_Stevy = pipe(
  filter((cookie) =>
    FILTER_LIST.some((filterItem) => cookie.includes(filterItem))
  ),
  map((array) => array.split(",")),
  map((array) => map((element) => `<td>${element.trim()}</td>`, array)),
  map((array) => array.toString().replace(/,/g, "")),
  map((array) => `<tr>${array}</tr>`),
  reduce((acc, array) => acc + array)
);

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
