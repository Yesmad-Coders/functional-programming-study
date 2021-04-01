# 1st Yesmad-Coders Test

quiz link : [https://codesandbox.io/s/1st-yesmadcoder-test-forked-uhiny?file=/src/index.js](https://codesandbox.io/s/1st-yesmadcoder-test-forked-uhiny?file=/src/index.js)

함수형으로 구현해보자.

하단의 예제에 들어가기 전에 default 값을 설정한다.

```jsx
const inputValue = [1,2,3];
const mapOnload = (item) => item + 1;
const filterOnload = (item) => item > 1;
const reduceOnload = (item, acc) => item + acc;
```

## 1. map, filter, reduce 구현하기.

### map

```jsx
const map = (onload, items) => {
	const newItems = [];
	for(const item of items) newItems.push(onload(item));
	
	return newItems;
};
```

가져온 배열 items 값을 모두 사용하기 위해 for..of를 사용.

모든 값에 onload 함수를 실행시켜 newItems에 저장.

이후 새로운 배열을 출력한다.

### filter

```jsx
const filter = (onload, items) => {
	const newItems = [];
	for(const item of items) if(onload(item)) newItems.push(item);

	return newItems;
}
```

가져온 배열 items 값을 모두 사용하기 위해 for..of를 사용.

모든 값이 onload를 실행 시킨뒤, filter 옵션이 참일 경우에만 newItems에 값을 저장.

이후 새로운 배열을 출력한다.

### reduce

```jsx
const reduce = (onload, items, acc) => {
	if(!acc) {
		acc = items[Symbol.iterator]();
		items = acc.next().value;
	}

	for(const item of acc) items = onload(items, item);

	return items;
}
```

acc의 존재 유무 확인.

acc가 존재하지 않는다면 acc에 items[Symbol.iterator]()를 저장한다.

- *items[Symbol.iterator]()*

    ```jsx
    const someString = 'Yesmad-Coders';
    typeof someString[Symbol.iterator]; // function

    const iterator = someString[Symbol.iterator]();
    [...iterator] // ["Y", "e", ........, "r", "s"]
    iterator + ""; // "[object String Iterator]"
    iterator.next(); // { value: "Y", done: false }
    iterator.next(); // { value: "e", done: false }
    iterator.next(); // { value: "s", done: false }
    iterator.next(); // { value: "m", done: false }
    iterator.next(); // { value: "a", done: false }
    iterator.next(); // { value: "d", done: false }
    iterator.next(); // { value: "-", done: false }
    iterator.next(); // { value: "C", done: false }
    iterator.next(); // { value: "o", done: false }
    iterator.next(); // { value: "d", done: false }
    iterator.next(); // { value: "e", done: false }
    iterator.next(); // { value: "r", done: false }
    iterator.next(); // { value: "s", done: false }
    ```

즉, acc는 items의 데이터가 저장되었고,

items에는 1번을 저장하고, acc는 다음 값으로 넘어갔으므로 이후 값만이 저장된다.

```jsx
let items = [1,2,3,4,5];
let acc = items[Symbol.iterator]();
items = acc.next().value; // items = 1
console.log([...acc]); // [2,3,4,5];
```

모든 items의 값을 사용하기 위해 for..of를 사용.

items에 items와 item을 이용한 함수를 실행 후 저장한다. (ex. items + item)

- Reduce가 굉장히 어려웠다. iterator에 관련된 항목을 계속 공부할 것.

## 2. curry 함수 구현하기

### curry

```jsx
const curry = onload => (...arr) => 
	arr.length > 1 ? onload(...arr) : (...param) => onload(...arr, ...param);
```

들어온 인자가 1개면 param을 기다리고, 2개 이상이면 onload(...arr)을 실행한다.

인자가 들어오기 전의 curry(onload)를 console로 찍어보면 아래와 같이 나타난다.

```jsx
(...param) => {
		return f(...arr, ...param);
	}
```

인자가 들어오면 바로 실행될 준비가 되어있다.

...arr은 onload이다. 

### curry map

```jsx
const map = (onload, items) => {
  if (items.length === 0) return [];

	const newItems = [];
	for(const item of items) newItems.push(onload(item));
	
	return newItems;
};

const curryMap = curry(map);

```

map에 items.length가 0일때의 값이 추가되었다. 값이 없다면 []를 리턴한다.

onload만 있기에 대기하고 있는 상태로 유지.

map에 curry를 씌우면 커링이 적용된다.

- output

```jsx
console.log(curryMap(mapOnload)); // (...param) => f(...arr, ...param)
console.log(curryMap(mapOnload, inputValue)); // [1,2,3]
console.log(curryMap(mapOnload)(inputValue)); // [1,2,3]
```

### curry filter

```jsx
const filter = (onload, items) => {
	if(items.length === 0) return [];

	const newItems = [];
	for(const item of items) if(onload(item)) newItems.push(item);

	return newItems;
}

const curryFilter = curry(filter);
```

filter에 items.length가 0일때의 값이 추가되었다. 값이 없다면 []를 리턴한다.

onload만 있기에 대기 상태로 유지.

filter에 curry를 씌우면 커링이 적용된다.

- output

```jsx
console.log(curryFilter(filterOnload)); // (...param) => f(...arr, ...param)
console.log(curryFilter(filterOnload)(inputValue)); // [2,3]
console.log(curryFilter(filterOnload, inputValue)); // [2,3]
```

### curry reduce

```jsx
const reduce = (onload, items, acc) => {
  if (items.length === 0) return acc;

  if (!acc) {
    acc = items[Symbol.iterator]();
    items = acc.next().value;
  }

  for (const item of acc) items = onload(items, item);

  return items;
};

const curryReduce = curry(reduce);
```

reduce는 map과 filter와는 조금 다르다. return []이 아닌 return acc 를 사용한다.

만약 값이 없다면  acc만 존재하고 대기 상태에 들어간다.

이후는 기존의 reduce와 같다.

- output

```jsx
console.log(curryReduce(reduceOnload)); // (...param) => f(...arr, ...param)
console.log(curryReduce(reduceOnload)(inputValue)); // 6
console.log(curryReduce(reduceOnload, inputValue)); // 6
```

## 3. go pipe 구현하기

사용할 onload 정의

```jsx
const goAndPipeOnload = (items, onload) => onload(items);
```

### go

```jsx
const go = (...func) => curryReduce(goAndPipeOnload, func);
```

go 함수는 인자를 받아 결과를 바로 산출해내는 함수이다.

첫 번째 인자는 시작이 되는 **값**을 받고, 나머지는 **함수**를 받아 첫 번째 인자가 두 번째 함수로 전달되어 결과를 생성하면, 그 결과가 세 번째 함수로 전달되어 그 결과가 만들어지는 과정이 마지막까지 계속된다.

```jsx
go(
	0,
	a + 1,
	a * 10,
	console.log
)
```

위 함수의 기대값은 10이며 마지막 함수가 실행되며 10이 출력되는 것을 기대할 수 있다.

함수를 표현하면 다음과 같고, 이를 정리한 것이 위 함수이다.

```jsx
const go = (...func) => func.reduce((previousFunc, currentFunc) => {
	return currentFunc(previousFunc);
});
```

### pipe

```jsx
const pipe = (...func) => (items) => go(items, ...func);
```

pipe 함수는 **함수를 리턴하는 함수**로 인자로 함수들을 받아 그 함수들을 합성해 하나의 함수를 리턴한다.

go와는 반환하는 것이 다르다.

```jsx
let pipe = () => () => {}; // 함수를 리턴하는 함수.
const pipeExample = pipe(
	a => a + 1,
	a => a * 10
);
console.log(pipeExample(0));
```

pipe는 위와 같은 코드 구성이 될 것이다.

함수를 표현하면 다음과 같다.

```jsx
pipe = (...funcs) => (argument) => funcs.reduce((acc, func) => func(acc), argument);
```

pipe 함수를 작성하는 과정을 쪼개보면 아래와 같다.

```jsx
// 1. pipe 함수는 인자로 함수들을 받는다.
pipe = (...funcs) => {};

// 2. 함수를 리턴한다.
pipe = (...funcs) => () => {};

// 3. argument는 pipe 함수가 실행되어 함축된 함수, 그 함수의 매개 변수이다.
pipe = (...funcs) => argument => {};

// 4. 함수들을 함축해야 하므로 pipe의 인자로 들어온 함수들에 reduce를 사용한다.
// reduce의 시작으로 함축된 함수의 매개 변수인 argument를 전달해준다. (argument: 값)
pipe = (...funcs) => argument => funcs.reduce(() => {}, argument);

// 5. 이제 reduce의 첫 번째 인자를 채워준다.
// 처음 reduce가 실행될 때는 acc가 pipe 함수의 실행 결과인 함수의 인자 **값**이 들어간다.
// 다음부터는 그 함수의 실행 결과 값이 acc가 되어 누산되는 과정이 된다.
pipe = (...funcs) => argument => funcs.reduce((acc, func) => func(acc), argument);
```

작성한 pipe 코드에서 마지막 reduce의 동작은 go와 거의 같다.

그래서 다음과 같은 코드로 볼 수 있다.

```jsx
pipe = (...func) => (argument) => go(argument, ...funcs);
```

## 4. 함수를 이용해서 HTML 적용하기

pipe를 이용하여 HTML에 쿠킹덤 쿠키 정보를 저장한다.

```jsx
const setCookieTable = pipe();
```

쿠키 정보가 담겨있는 배열은 다음과 같다.

```jsx
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
```

1티어 이상의 쿠키 정보만을 table로 보여줄 계획인데, 이 방법을 적용하기 위해서는 다음과 같은 것들이 필요하다.

- 각 문자열 쪼개기
- 1티어 이상의 데이터만 필터링
- `<tr><td></td></tr>`로 감싸기

위 방법을 적용하기 위해서는 map으로 문자열을 쪼개고, filter로 티어 필터링을 진행하며, reduce로 테이블로 만들어 줄 것이다.

### 문자열 쪼개기

```jsx
const mapCookiesOnload = (cookies) => {
  const cookiesArray = cookies.split(/,/);
  const newCookiesArray = [];

  for (const cookie of cookiesArray) newCookiesArray.push(cookie.trim());

  return newCookiesArray;
};

curryMap(mapCookiesOnload)(cookies);
```

cookies는 쿠킹덤 쿠키 데이터이다.

가져온 배열을 map으로 돌려줘서 각 배열마다 mapCookiesOnload를 실행시켜준다.

cookiesArray를 이용하여 ,를 단위로 문자열을 쪼개고

쪼갠 값의 앞뒤 공백을 trim()을 이용하여 지워준 뒤 리턴한다.

### 티어 필터링

```jsx
const CookieTiersToFilter = 1.0;

const filterCookiesOnload = (cookie) => {
  const [_, tier] = cookie;
  const tierFilter = tier.split("티어")[0];

  if (parseInt(tierFilter, 10) <= CookieTiersToFilter) return cookie;
  else return null;
};

curryFilter(filterCookiesOnload)(map 함수 리턴값)
```

위 코드는 3월 27일 스터디 때 민수님의 코드를 보고 수정한 코드이다.

`const [_, tier] = cookie` 라는 방법을 알게 되어서 적용해본 결과 코드가 훨씬 간결하게 변했다.

알아보기도 쉽다. 굉장히 유용하다. 민수님 멋져.

`parseInt`도 실수형이면 무조건 `parseFloat`를 사용해야 하는 줄 알았지만, `parseInt(num, 10)`을 사용해도 된다는 것을 알았다.

이런식으로 새로 알게된 지식으로 코드를 변경하여 필터링을 적용하였다.

### 테이블로 감싸기

```jsx
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
```

여기서는 reduce를 새로 만들었다.

첫 items에 테이블 값을 넣기 위해서이다.

`createTable`을 사용하여 테이블을 만드는 함수를 구현했고, `createTd`는 `td`를 사용하는 부분도 함수형으로 사용하기 위해서 만들었다.

그렇게 계속해서 더해가면 테이블이 완성된다.

### 완성

```jsx
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
```

`setCookieTable(cookies)`을 실행시키면 다음과 같이 표시가 된다.

```tsx
<tr>
	<td>쿠키 이름</td>
	<td>쿠키 티어</td>
	<td>쿠키 특성</td>
	<td>필요 토핑</td>
</tr>
<tr>
	<td>쿠키 이름</td>
	<td>쿠키 티어</td>
	<td>쿠키 특성</td>
	<td>필요 토핑</td>
</tr>
<tr>
	<td>쿠키 이름</td>
	<td>쿠키 티어</td>
	<td>쿠키 특성</td>
	<td>필요 토핑</td>
</tr>
...
```

표시된 내용은 template에 적용이 되어 `tbody`의 `tr`의 하단에 ( `setCookieTable(cookies)` 가 위치한 곳에 ) 추가된다.