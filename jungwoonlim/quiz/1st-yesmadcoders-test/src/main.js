///////////////////
/* 함수형 구현해보기 */
//////////////////

/////////////////////////////////
// step 1) map, filter, reduce //
/////////////////////////////////

const inputValue = [1, 2, 3];

const mapOnload = (item) => item + 1;
const filterOnload = (item) => item > 1;
const reduceOnload = (item, acc) => item + acc;

// map
const basicMap = (onload, items) => {
  const mapArray = [];

  for (const item of items) mapArray.push(onload(item));

  return mapArray;
};

// filter
const basicFilter = (onload, items) => {
  if (items.length === 0) return [];

  const filterArray = [];

  for (const item of items) if (onload(item)) filterArray.push(item);

  return filterArray;
};

//reduce
const basicReduce = (onload, items, acc) => {
  if (!acc) {
    acc = items[Symbol.iterator]();
    items = acc.next().value;
  }

  for (const item of acc) items = onload(items, item);

  return items;
};

// output init
const mapOutput = basicMap(mapOnload, inputValue);
const filterOutput = basicFilter(filterOnload, inputValue);
const reduceOutput = basicReduce(reduceOnload, inputValue);

// output console
console.log("step 1) answer");
console.log(`map : ${mapOutput}`);
console.log(`filter : ${filterOutput}`);
console.log(`reduce : ${reduceOutput}`);

///////////////////////////////////
// step 2) curry 함수 반영시 동작가능 //
///////////////////////////////////

// curry
const curry = (f) => (...arr) =>
  arr.length > 1 ? f(...arr) : (...param) => f(...arr, ...param);

// map
const map = (onload, items) => {
  if (items.length === 0) return [];
  const mapArray = [];

  for (const item of items) mapArray.push(onload(item));

  return mapArray;
};

// filter
const filter = (onload, items) => {
  if (items.length === 0) return [];

  const newItems = [];
  for (const item of items) if (onload(item)) newItems.push(item);

  return newItems;
};

// reduce
const reduce = (onload, items, acc) => {
  if (items.length === 0) return acc;

  if (!acc) {
    acc = items[Symbol.iterator]();
    items = acc.next().value;
  }

  for (const item of acc) {
    items = onload(items, item);
  }

  return items;
};

// curry function
const curryMap = curry(map);
const curryFilter = curry(filter);
const curryReduce = curry(reduce);

// output console
console.log(" ");
console.log("step 2) answer");
console.log("map : ");
console.log(curryMap(mapOnload));
console.log(curryMap(mapOnload)(inputValue));
console.log(curryMap(mapOnload, inputValue));

console.log(" ");
console.log("filter : ");
console.log(curryFilter(filterOnload));
console.log(curryFilter(filterOnload)(inputValue));
console.log(curryFilter(filterOnload, inputValue));

console.log(" ");
console.log("reduce : ");
console.log(curryReduce(reduceOnload));
console.log(curryReduce(reduceOnload)(inputValue));
console.log(curryReduce(reduceOnload, inputValue));

///////////////////////////////
// step 3) go pipe 구현 해보기 ///
///////////////////////////////

const goAndPipeOnload = (items, onload) => onload(items);

// go
const go = (...arr) => curryReduce((acc, func) => func(acc), arr);

// pipe
const pipe = (...func) => (items) => go(items, ...func);

// output init
const goOutput = go(
  inputValue,
  curryMap(mapOnload),
  curryFilter(filterOnload),
  curryReduce(reduceOnload)
);

const pipeOutput = pipe(
  curryMap(mapOnload),
  curryFilter(filterOnload),
  curryReduce(reduceOnload)
)(inputValue);

// output console
console.log(" ");
console.log("step 3) answer");
console.log(goOutput); // 9
console.log(pipeOutput); // 9

//////////////////////////////////////
// step 4) 함수형 이용해서 HTML 적용해보기 //
//////////////////////////////////////

const cookies = [
  "에스프레소맛 쿠키,	0티어,	중앙마법,	공격력증가",
  "감초맛 쿠키,	0티어,	중앙마법,	쿨타임감소",
  "허브맛 쿠키,	0티어,	후방치유,	공격력증가",
  "다크초코 쿠키,	0티어,	전방돌격,	방어력증가",
  "석류맛 쿠키,	1티어,	후방지원,	쿨타임 감소",
  "호밀맛 쿠키,	1티어,	후방사격,	공격력 증가",
  "뱀파이어맛 쿠키,	1티어,	후방침투,	공격력 증가",
  "우유맛 쿠키,	2티어,	전방방어,	방어력증가",
  "마들렌맛 쿠키,	2티어,	전방방어,	방어력증가",
  "민트초코 쿠키,	2티어,	후방지원,	쿨타임 감소",
  "독버섯맛 쿠키,	2티어,	중앙폭발,	공격력 증가",
  "정글전사 쿠키,	2티어,	후방사격,	쿨타임 감소",
  "칠리맛 쿠키,	2티어,	중앙침투,	공격력 증가",
  "스파클링맛 쿠키,	2티어,	후방치유,	공격력 증가",
  "자색 고구마맛 쿠키,	2.5티어,	전방돌격,	방어력증가",
  "웨어울프맛 쿠키,	2.5티어,	전방돌격,	방어력증가",
  "눈설탕맛 쿠키,	2.5티어, 중앙마법,	쿨타임 감소",
];

const CookieTiersToFilter = 1.0;

const mapCookiesOnload = (cookies) => {
  const cookiesArray = cookies.split(/,/);
  const newCookiesArray = [];

  for (const cookie of cookiesArray) newCookiesArray.push(cookie.trim());

  return newCookiesArray;
};

const filterCookiesOnload = (cookie) => {
  const [_, tier] = cookie;
  const tierFilter = tier.split("티어")[0];

  if (parseInt(tierFilter, 10) <= CookieTiersToFilter) return cookie;
  else return null;
};

const curryCookieReduce = curry((onload, items, acc) => {
  if (items.length === 0) return acc;

  if (!acc) {
    acc = items[Symbol.iterator]();
    items = acc.next().value;
    items = createTable(items);
  }

  for (const item of acc) items = onload(items, item);

  return items;
});

const createTd = (item) => `<td>${item}</td>`;

const createTable = (items) => {
  let result = "<tr>";
  for (const data of items) result += createTd(data);
  result += "</tr>";
  return result;
};

const reduceCookiesOnload = (cookie, acc) => {
  return cookie + createTable(acc);
};

const setCookieTable = pipe(
  curryMap(mapCookiesOnload),
  curryFilter(filterCookiesOnload),
  curryCookieReduce(reduceCookiesOnload)
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
