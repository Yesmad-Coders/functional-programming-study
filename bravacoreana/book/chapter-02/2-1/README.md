<div id="2-1"></div>

## 2.1 객체와 대괄호 다시 보기


[2.1.1 난해해 보이는 문법들을 확인하는 목적](#2-1-1)<br/>
[2.1.2 객체와 key](#2-1-2)<br/>
[2.1.3 함수나 배열에 달기](#2-1-3)<br/>
[2.1.4 delete](#2-1-4)<br/>
[2.1.5 코드가 실행될 수 있는 영역](#2-1-5)<br/>

<br/>
<br/>
<br/>

<div id="2-1-1"></div>

### 2.1.1 난해해 보이는 문법들을 확인하는 목적

작가님은 실제로 자바스크립트 라이브러리 혹은 프레임워크들에서 난해한 문법들이 자주 사용되는 것을 보았고, 난해한 문법이 사용되는 목적으로 다음과 같은 이유들을 꼽았다.

- 더 짧은 코드를 위해
- 추상화의 다양한 기법
- if를 없애기 위해
- 특별한 로직을 위해
- 캐시를 위해
- 은닉을 위해
- 함수를 선언하고 참조하기 위해
- 컨텍스트를 이어주기 위해

문법에 따른 세밀한 기능 차이를 잘 알면 결국
> 아무 곳에서나 함수 열기. 함수 실행을 원하는 시점으로 미뤄서 실행하기
가 가능해진다고 한다.

<br/>
<br/>
<br/>

<div id="2-1-2"></div>

### 2.1.2 객체와 key

```js
// 코드 2-1. 다양한 key/value 정의 방법
var obj = { a: 1, "b": 2 }; // 1
obj.c = 3;
obj["d"] = 4;   // 2
var e = "e";
obj[e] = 5;
function f() { return "f"; }
obj[f()] = 6;

console.log(obj); // { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6 }
```

객체의 key와 value는 `{}`, `.`, `[]` 등으로 설정할 수 있다. 그중 어떤 문자열이든 key로 정의할 수 있는 곳이 있다. 바로 `1의 "b"`와 `2의 []` 같은 곳이다. (prettier를 적용해 둔 상태에서는 따옴표가 자동으로 지워지는 것으로 보아 vscode prettier에서는 key를 무조건 문자열로 인식하는 것 같다.) 이 두 가지 방식이 가진 공통점은 **띄어쓰기, 특수문자, 숫자 등을 가리지 않고 어떤 문자열이든 key로 만들 수 있다!** 는 점이다.

```js
// 코드 2-2. 띄어쓰기, 특수 문자, 숫자

// 띄어쓰기를 써도 key로 만들 수 있다.
var obj2 = { " a a a": 1 };
obj2[" b b   b"] = 2;
console.log(obj2); // { ' a a a': 1, ' b b   b': 2 }

// 특수 문자를 써도 key로 만들 수 있다.
var obj3 = { "margin-top": 5 };
obj3["padding-bottom"] = 20;
console.log(obj3); // { 'margin-top': 5, 'padding-bottom': 20 }

// 숫자도 key로 쓸 수 있다.
var obj4 = { 1: 10 };
obj4[2] = 20;
console.log(obj4); // { '1': 10, '2': 20 }
```

보는 것과 같이 띄어쓰기, 특수문자, 숫자로도 key를 생성할 수 있다.

```js
// 내가 시도 해 본 코드

var objA = { "🙊 🙊 ABC 🙊-🙊": 3 };
objA["b"] = 100;
objA[199] = 200;
console.log(objA); // { '199': 200, '🙊 🙊 ABC 🙊-🙊': 3, b: 100 }

var objB = { "1a": 1 };
objB[2] = 2;
console.log(objB); // { '2': 2, '1a': 1 }

var objC = { 3: 3 };
objC[2] = 2;
objC[1] = 11;
console.log(objC); // { '1': 11, '2': 2, '3': 3 }
```

여기서 신기했던 것은 띄어쓰기나 특수문자를 쓸 수 있을 뿐 아니라, 특수문자나 띄어쓰기가 있는 key에는 따옴표가 붙고, 그렇지 않은 일반적인 key에는 따옴표가 붙지 않는다. 또한, 나는 값이 추가되는 순서대로 객체가 생성된다고 생각했는데, key의 이름순으로 정돈 되어 출력되었다!😲 
- `obj5` 에서 숫자의 key값이 나중에 추가되었음에도 불구하고 가장 앞으로 배치되어 출력되었고, key가 b인 경우 띄어쓰기나 특수문자가 없기 때문에 따옴표 없이 출력되었다.
- `obj6` 에서 key 값이 1a인 경우 문자열로 취급되고, 그 뒤로 `obj6[2] = 2;` 추가 되었지만 역시나 key 값이 숫자인 것이 우선 순위로 적용되어 출력되었다.
- 그렇다면 모두 숫자면 어떻게 될까? 하는 궁금한 마음에 무작위 숫자로 찍어봤더니, 추가된 순서에 상관없이 숫자가 작은 숫자부터 차례대로 출력되었다.

<br/>
아마 이 조건을 까먹고 있었던 것 같은데 이번에 복습(혹은 새로 깨우침) 할 수 있는 좋은 기회였다! 😍
<br/>
<br/>
그렇다면 `{}`안쪽에서 key를 선언하는 것과 `[]` 안에서 선언하는 것은 차이가 없을까? <br/>
`{}`의 문자열 부분에서는 코드를 실행할 수 없고 `[]`의 안쪽에서는 코드를 실행할 수 있다.

```js
// 코드 2-3. 코드가 실행되지 않는 key 영역

var obj5 = {(true ? "a":"b") : 1};
// SyntaxError: Unexpected token '('
```

`{}` 안쪽의 key 영역에서는 코드를 실행할 수 없다.

```js
// 코드 2-4. 코드가 실행되는 key 영역

var obj6 = {};
obj6[true ? "a" : "b"] = 1;
console.log(obj6); // { a: 1 }
```

`[]` 사이에는 문자열이 담긴 변수도 넣을 수 있고, 연산자도 사용할 수 있으며 함수도 실행할 수 있다. 즉, `[]`에서는 코드 실행이 가능하다. 그리고 ES6에서는 다음과 같이 `{}`의 key 값에 `()`가 아닌 `[]`를 이용해 코드를 실행하는 것도 가능하다.

```js
// 코드 2-5. ES6에서 동작하는 {} 안쪽에 대괄호 사용하기

var obj5 = { [true ? "a" : "b"]: 1 };
console.log(obj5); // {a : 1}
```
<br/>
<br/>
<br/>
<div id="2-1-3"></div>

### 2.1.3 함수나 배열에 달기

```js
// 코드 2-6. 함수를 객체로 사용

function obj8() {}

obj8.a = 1;
obj8.b = 2;
console.log(obj8.a);    // 1
console.log(obj8.b);    // 2
```

자바스크립트에서는 함수도 객체다. 그러므로 함수도 key/value 쌍으로 구성할 수 있다.

```js
// 코드 2-7. 호이스팅

fobj9.a = 1;
obj9.b = 2;
function obj9() {}  // 예제에는 없었으나 내가 추가했음 

console.log(obj9.a + obj9.b); // 3
```

함수로 선언할 경우 호이스팅(hoisting)에 의해 위와 같은 코드도 동작한다. 호이스팅은 곧 다룰 주제이긴 하지만, 간단히 말해 호이스팅에 의해 obj9를 선언하기 이전 라인에서도 obj9를 참조할 수 있다는 것 정도만 알고 넘어가자.


```js
// 코드 2-8. 배열에 숫자가 아닌 key 이용하기

var obj10 = [];
obj10.a = 1;
console.log(obj10); // [ a : 1 ]
console.log(obj10.length); // 0
```

**배열도 객체이며 배열에도 숫자가 아닌 key를 사용할 수 있다.** 단 숫자가 아닌 key로 값을 할당할 경우 length는 변하지 않는다. 

```js
// 코드 2-9/ 배열에 숫자로 key 사용하기

var obj11 = [];
obj11[0] = 1;
obj11[1] = 2;
console.log(obj11); // [1, 2]
console.log(obj11.length); // 2
```

배열에 숫자로 key를 직접 할당해도 push와 동일하게 동작한다. 자동으로 length 도 올라간다. 


```js
var obj12 = [];
obj12.length = 5;
console.log(obj12); 
// 책에서 말하는 출력값: Array[5]
// 내가 찍어봤을 때 나온 출력값: [ <5 empty items> ]

var obj13 = [1, 2];
obj13[5] = 5;
console.log(obj13); 
// 책에서 말하는 출력값: [1, 2, 5: 5]
// 내가 찍어봤을 때 나온 출력값: [ 1, 2, <3 empty items>, 5 ]
console.log(obj13.length); // 6

obj13.push(6);
console.log(obj13); 
// 책에서 말하는 출력값: [1, 2, 5: 5, 6: 6]
// 내가 찍어봤을 때 나온 출력값: [ 1, 2, <3 empty items>, 5, 6 ]
console.log(obj13.length); // 7
```

> **참고**
> 일반적인 상황에서 length를 한번에 올린다던가 Array(length) 혹은 arr[i]=1과 같은 변칙적인 기법을 사용하지 않을 것을 권한다. 정상적으로 동작하기는 하지만 중간이 비워진 배열을 사용할 경우, 특정 메서드가 일관성 없이 동작하기도 한다. 
> 이런 기법이 유용할 때도 있는데, 예를 들어 배열의 값을 채우면서 의도적으로 동시성(비동기)를 만든 경우라면 순서를 보장하지 않으므로 오히려 좋은 해법이 되기도 한다. 사례로는 blubird.js의 all, map 등이 있다.

배열의 length도 `['length']`로 참조 및 할당이 가능하다.

```js
// 코드 2-11

var obj13 = [1, 2];
obj13[5] = 5;
obj13.push(6);
console.log(obj13["len" + "gth"]); // 7

obj13["len" + "gth"] = 10;
console.log(obj13.length); // 10

obj13.push(11);
console.log(obj13); // [ 1, 2, <3 empty items>, 5, 6, <3 empty items>, 11 ]
```

모두 정상적으로 동작했다. 앞에서처럼 자바스크립트 객체는 개발자가 특별하게 만든 객체든, 원래 존재하는 `Object`, `Array`, `String`, `Function` 등의 기본 객체든 구분 없이 key의 참조, 수정 등에 대한 제약이 없고 유연하다. 자바스크릡트는 전체적으로 유연함과 자유로움이라는 일관성을 가지고 있다.

<br/>
<br/>
<br/>
<div id="2-1-4"></div>

### 2.1.4 delete

자바스크립트에서는 기본 객체의 메서드나 프로퍼티도 지울 수 있다.

```js
// 코드 2-12. 기본 객체의 메서드 지우기

var obj = { a: 1, b: 2, c: 3 };
delete obj.a;
delete obj["b"];
delete obj["C".toLowerCase()];
console.log(obj); // {}

delete Array.prototype.push;
var arr1 = [1, 2, 3];
arr1.push(4); // TypeError: arr1.push is not a function
```

<br/>
<br/>
<br/>
<div id="2-1-5"></div>

### 2.1.5 코드가 실행될 수 있는 영역

객체에서의 키를 대괄호`[]`로 참조하면 대괄호 사이에서 코드를 실행할 수 있다. 함수를 실행할 수도 있고, 함수를 정의한 후 즉시 실행할 수도 있다. 코드의 특정 부분에서 함수를 정의하거나 실행할 수 있다는 이야기는 그 부분을 높은 수준으로 추상화 할 수 있다는 말이 된다. 함수를 실행할 수 있다면 웬만한 모든 일을 할 수 있다. `괄호`,`대괄호`,`연산자`,`리턴문` 등 사이에서 자유롭게 코드를 실행할 수 있는 영역을 찾고 다양한 시도를 하다보면 감각 있는 해법을 만나게 되고, 유명 라이브러리들에서 비슷하게 사용된 창의적 기법들이나 노하우도 더욱 읽기 쉬워질 것이다!

<br/>
<br/>
<br/>

---

Next: [2.2 함수 정의 다시 보기](../2-2/README.md)

---

#### 🗂 목차

<details>
<summary>2-1 <a href="/bravacoreana/chapter-02/2-1/README.md">객체와 대괄호 다시 보기</a></summary>
<div markdown="1">
&nbsp;&nbsp;&nbsp;&nbsp; 2.1.1 난해해 보이는 문법들을 확인하는 목적<br/>
&nbsp;&nbsp;&nbsp;&nbsp; 2.1.2 객체와 key<br/>
&nbsp;&nbsp;&nbsp;&nbsp; 2.1.3 함수나 배열에 달기<br/>
&nbsp;&nbsp;&nbsp;&nbsp; 2.1.4 delete<br/>
&nbsp;&nbsp;&nbsp;&nbsp; 2.1.5 코드가 실행될 수 있는 영역<br/>
</div>
</details>

<details>
<summary>2-2 <a href="/bravacoreana/chapter-02/2-2/README.md">함수 정의 다시 보기</a></summary>
<div markdown="1">
&nbsp;&nbsp;&nbsp;&nbsp; 2.2.1 기본 정의<br/>
&nbsp;&nbsp;&nbsp;&nbsp; 2.2.2 호이스팅<br/>
&nbsp;&nbsp;&nbsp;&nbsp; 2.2.3 호이스팅 활용하기<br/>
&nbsp;&nbsp;&nbsp;&nbsp; 2.2.4 괄호 없이 즉시 실행하기<br/>
&nbsp;&nbsp;&nbsp;&nbsp; 2.2.5 new Function이나 eval을 써도 될까요?<br/>
&nbsp;&nbsp;&nbsp;&nbsp; 2.2.6 간단 버전 문자열 화살표 함수와 new Function 성능<br/>
&nbsp;&nbsp;&nbsp;&nbsp; 2.2.7 유명(named)함수<br/>
&nbsp;&nbsp;&nbsp;&nbsp; 2.2.8 유명 함수를 이용한 재귀<br/>
&nbsp;&nbsp;&nbsp;&nbsp; 2.2.9 자바스크립트에서 재귀의 아쉬움<br/>
</div>
</details>

<details>
<summary>2-3 <a href="/bravacoreana/chapter-02/2-3/README.md">함수 실행과 인자 그리고 점 다시 보기</a></summary>
<div markdown="1">
&nbsp;&nbsp;&nbsp;&nbsp; 2.3.1 () 다시 보기<br/>
&nbsp;&nbsp;&nbsp;&nbsp; 2.3.2 인자 다시 보기<br/>
&nbsp;&nbsp;&nbsp;&nbsp; 2.3.3 this 다시 보기<br/>
&nbsp;&nbsp;&nbsp;&nbsp; 2.3.4 call, apply 다시 보기<br/>
&nbsp;&nbsp;&nbsp;&nbsp; 2.3.5 call의 실용적 사례<br/>
</div>
</details>

<details>
<summary>2-4 <a href="/bravacoreana/chapter-02/2-4/README.md">if else ||&& 삼항 연산자 다시 보기</a></summary>
<div markdown="1">
&nbsp;&nbsp;&nbsp;&nbsp; 2.4.1 if의 괄호<br/>
&nbsp;&nbsp;&nbsp;&nbsp; 2.4.2 ||&&<br/>
&nbsp;&nbsp;&nbsp;&nbsp; 2.4.3 삼항 연산자<br/>
</div>
</details>

<details>
<summary>2-5 <a href="/bravacoreana/chapter-02/2-5/README.md">함수 실행의 괄호</a></summary>
<div markdown="1">
&nbsp;&nbsp;&nbsp;&nbsp; 2.5.1 함수 실행을 통해 생기는 새로운 공간<br/>
&nbsp;&nbsp;&nbsp;&nbsp; 2.5.2 기본적인 비동기 상황<br/>
&nbsp;&nbsp;&nbsp;&nbsp; 2.5.3 함수 실행 괄호의 마법과 비동기<br/>
&nbsp;&nbsp;&nbsp;&nbsp; 2.5.4 비동기와 재귀<br/>
</div>
</details>

<details>
<summary>2-6 <a href="/bravacoreana/chapter-02/2-6/README.md">화살표 함수</a></summary>
<div markdown="1">
&nbsp;&nbsp;&nbsp;&nbsp; 2.6.1 익명 함수와의 문법 비교<br/>
&nbsp;&nbsp;&nbsp;&nbsp; 2.6.2 익명 함수와의 기능 비교<br/>
&nbsp;&nbsp;&nbsp;&nbsp; 2.6.3 화살표 함수의 실용 사례<br/>
&nbsp;&nbsp;&nbsp;&nbsp; 2.6.4 화살표 함수 재귀<br/>
</div>
</details>

<details>
<summary>2-7 <a href="/bravacoreana/chapter-02/2-7/README.md">정리</a></summary>
<div markdown="1">
</details>
