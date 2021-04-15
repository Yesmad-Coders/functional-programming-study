이 퀴즈는 스티비님의 제공으로 만들어 졌습니다!
👉🏼 스티비님 깃헙: [방문하기](https://github.com/hyunjaesung)

---



## What I've learnt


```js
// 본인 코드

const filterCookie = filter(
  (cookie) => cookie.includes(WORD) || cookie.includes(WORD2),
  cookies
); 
const arrayList = map((array) => array.split(","), filterCookie);
const tdList = map(
  (array) => map((element) => `<td>${element.trim()}</td>`, array),
  arrayList
);
const removeComma = map((array) => array.toString().replace(/,/g, ""), tdList);
const trList = map((array) => `<tr>${array}</tr>`, removeComma);
const reduceList = reduce((acc, array) => acc + array, trList);

const setCookieTable = pipe(
  filter((cookie) => cookie.includes(WORD) || cookie.includes(WORD2)),
  map((array) => array.split(",")),
  map((array) => map((element) => `<td>${element.trim()}</td>`, array)),
  map((array) => array.toString().replace(/,/g, "")),
  map((array) => `<tr>${array}</tr>`),
  reduce((acc, array) => acc + array)
);

```

여기서 `filterCookie` 는 확장성에 한계가 있다. 필터링 할 단어들을 배열에 집어 넣고, 쿠키 배열이 필터링 단어 배열로 필터가 된다면 확장성이 더 좋을 것이라고 판단했다. 이게 쉽지 않아서 스터디 시간에 다른 분들께 여쭤봤고, 두 가지의 답변을 얻을 수 있었다.


```js
// 민수님 코드

const setCookieTable_Minsu = pipe(
  filter((cookie) =>
    map((word) => cookie.includes(word), FILTER_LIST).some(Boolean)
  ),
  map((array) => array.split(",")),
  map((array) => map((element) => `<td>${element.trim()}</td>`, array)),
  map((array) => array.toString().replace(/,/g, "")),
  map((array) => `<tr>${array}</tr>`),
  reduce((acc, array) => acc + array)
);
```

```js
// 스티비님 코드

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
```
