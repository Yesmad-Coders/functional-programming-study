// Curry
//
const curry = (data) => (a, ..._) =>
  _.length ? data(a, ..._) : (..._) => data(a, ..._);

const mult = curry((a, b) => a * b);

console.log(mult(3, 2));

// Map
const map = curry((f, arr) => {
  const result = [];
  for (let i of arr) result.push(f(i));
  console.log(result);
  return result;
});
console.log(map((item) => item + 1));
console.log(map((item) => item + 1, [1, 2, 3]));
console.log(map((item) => item + 1)([1, 2, 3])); // 2 3 4

// Filter
const filter = curry((f, arr) => {
  const result = [];
  for (let i of arr) if (f(i)) result.push(i);

  return result;
});

console.log(filter((item) => item > 1, [1, 2, 3])); // 2 3
console.log(filter((item) => item > 1)([1, 2, 3])); // 2 3

// Reduce

const reduce = curry((f, acc, arr) => {
  if (!arr) arr = acc[Symbol.iterator]();
  acc = arr.next().value;
  for (const i of arr) {
    acc = f(acc, i);
  }
  return acc;
});

console.log(reduce((acc, item) => acc + item, [1, 2, 3])); // 6
console.log(reduce((acc, item) => acc + item)([1, 2, 3])); // 6

// step 3) go pipe 구현 해보기

const go = (...args) => reduce((data, func) => func(data), args);

console.log("---go----");
console.log(
  go(
    [1, 2, 3],
    map((item) => item + 1),
    filter((item) => item > 2),
    reduce((acc, item) => acc + item)
  )
); // 7

console.log("---pipe----");
const pipe = (...fs) => (args) => go(args, ...fs);
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
  "에스프레소맛 쿠키,  0티어,  중앙마법, 공격력증가",
  "감초맛 쿠키, 0티어,  중앙마법, 쿨타임감소",
  "허브맛 쿠키, 0티어,  후방치유, 공격력증가",
  "다크초코 쿠키,  0티어,  전방돌격, 방어력증가",
  "석류맛 쿠키, 1티어,  후방지원, 쿨타임 감소",
  "호밀맛 쿠키, 1티어,  후방사격, 공격력 증가",
  "뱀파이어맛 쿠키, 1티어,  후방침투, 공격력 증가",
  "우유맛 쿠키, 2티어,  전방방어, 방어력증가",
  "마들렌맛 쿠키,  2티어,  전방방어, 방어력증가",
  "민트초코 쿠키,  2티어,  후방지원, 쿨타임 감소",
  "독버섯맛 쿠키,  2티어,  중앙폭발, 공격력 증가",
  "정글전사 쿠키,  2티어,  후방사격, 쿨타임 감소",
  "칠리맛 쿠키, 2티어,  중앙침투, 공격력 증가",
  "스파클링맛 쿠키, 2티어,  후방치유, 공격력 증가",
  "자색 고구마맛 쿠키, 2.5티어,  전방돌격, 방어력증가",
  "웨어울프맛 쿠키, 2.5티어,  전방돌격, 방어력증가",
  "눈설탕맛 쿠키,  2.5티어, 중앙마법,  쿨타임 감소"
];
/*
const cookieMap = (data, args) => {
  let res = [];
  for (const cookie of args) {
    res.push(data(cookie));
  }
  return res;
};
*/
console.log(map((item) => item.replaceAll(", ", ",").split(","), cookies));

/*
//filter
const cookieFilter = (data, iter) => {
  let res = [];
  for (const i of iter) {
    if (data(i)) res.push(i);
  }
};
console.log(
  filter((item) => item.includes("0티어") || item.includes("1티어"), cookies)
);
*/

const setCookieTable = pipe(
  filter((item) => item.includes("0티어") || item.includes("1티어")),
  map((item) => item.replaceAll(", ", ",").split(",")),
  map((item) => map((cookie) => `<td>${cookie}</td>`, item)),
  reduce((acc, item) => acc + `<tr>${item}</tr>`)
);

console.log(setCookieTable);
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
