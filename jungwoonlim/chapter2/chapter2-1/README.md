# 2.1 객체와 대괄호 다시 보기

### 2.1.1 난해해 보이는 문법들을 확인하는 목적

변칙적인 문법들을 보는 목적

1. 더 짧은 코드를 위해
2. 추상화의 다양한 기법
3. if를 없애기 위해
4. 특별한 로직을 위해
5. 캐시를 위해
6. 은닉을 위해
7. 함수를 선언하고 참조하기 위해
8. 컨텍스트를 이어주기 위해

### 목표

***"아무 곳에서나 함수 열기. 함수 실행을 원하는 시점으로 미뤄서 실행하기."***

### 2.1.2 객체와 key

코드 2-1 다양한 key/value 정의 방법

```jsx
var obj = { a : 1, "b" : 2}; // 1)
obj.c = 3;
obj['d'] = 4; // 2)
var e = 'e';
obj[e] = 5;
function f() { return 'f'; }
obj[f()] = 6;
console.log(obj); // { a : 1, b : 2, c : 3, d : 4, e : 5, f : 6 }
```

객체의 `key`와 `value`에 대한 부분이다.

객체의 `key`와 `value`는 `{}`, `.`, `[]` 등을 통해 설정할 수 있다.

그중 어떤 문자열이든 `key`로 정의할 수 있는 곳이 있는데, 1) `"b"` 와 2) `[]`같은 곳이다.

띄어쓰기, 특수 문자, 숫자 등을 가리지 않고 어떤 문자열이든 `key`로 만들 수 있다.

코드 2-2 띄어쓰기, 특수 문자, 숫자

```jsx
// 띄어쓰기를 써도 key로 만들 수 있다.
var obj2 = { " a a a " : 1 };
obj2[' b b b '] = 2;
console.log(obj2); // { " a a a " : 1, " b b b " : 2 }

// 특수 문자를 써도 key로 만들 수 있다.
var obj3 = { "margin-top" : 5 };
obj3["padding-bottom"] = 20;
console.log(obj3); // { margin-top : 5, padding-bottom: 20 }

// 숫자도 key로 쓸 수 있다.
var obj4 = { 1 : 10 };
obj4[2] = 20;
console.log(obj4); // { 1 : 10, 2 : 20 }
```

`{}`의 문자열 부분에서는 코드를 실행할 수 없고 `[]`의 안쪽에서는 코드를 실행할 수 있다.

코드 2-3 코드가 실행되지 않는 key 영역

```jsx
var obj5 = { (true ? "a" : "b"): 1 };
// Uncaught SyntaxError: Unexpected token (
```

`{}` 안쪽의 `key` 영역에서는 코드를 실행할 수 없다.

코드 2-4 코드가 실행되는 key 영역

```jsx
var obj6 = {};
obj6[true ? "a" : "b"] = 1;
console.log(obj6); // { a : 1 }
```

`[]`사이에는 문자열이 담긴 변수도 넣을 수 있고, 연산자도 사용할 수 있으며 함수도 실행할 수 있다.

즉, `[]`에서는 코드를 실행할 수 있다.

ES6의 경우, 코드 2-5와 같이 작성이 가능하다.

코드 2-5 ES6에서 동작하는 {} 안쪽에 대괄호 사용하기

```jsx
var obj5 = { [true ? "a" : "b"]: 1 };
// { a : 1 } 
```

코드 2-3은 소괄호를 사용했고 코드 2-5는 대괄호를 사용했다.

### 2.1.3 함수나 배열에 달기

코드 2-6 함수를 객체로 사용

```jsx
function obj8() {}
obj8.a = 1;
obj8.b = 2;
console.log(obj8.a); // 1
console.log(obj8.b); // 2
```

자바스크립트에서는 함수도 객체다. 그러므로 함수도 key/value 쌍으로 구성할 수 있다.

코드 2-7 호이스팅

```jsx
obj9 = {};
obj9.a = 1;
obj9.b = 2;
console.log(obj9.a + obj9.b); // 3
```

**호이스팅 : 함수 안에 있는 선언들을 모두 끌어올려서 해당 함수 유효 범위의 최상단에 선언하는 것.**

global scope면 최상단, local scope면 함수의 최상단.

obj9 = {} 를 해주지 않으면 호이스팅이 되지 않는다.

코드 2-8 배열에 숫자가 아닌 key 사용하기

```jsx
var obj10 = [];
obj10.a = 1;
console.log(obj10); // [a: 1]
console.log(obj10.length); // 0
```

배열도 객체이며 숫자가 아닌 key를 사용할 수 있다.

숫자가 아닌 key로 값을 할당할 경우 length는 변하지 않는다.

코드 2-9 배열에 숫자로 key 사용하기

```jsx
var obj11 = [];
obj11[0] = 1;
obj11[1] = 2;
console.log(obj11); // [1, 2];
console.log(obj11.length); // 2
```

배열에 숫자로 key를 직접 할당해도 push와 동일하게 동작한다.

자동으로 length도 올라간다.

코드 2-10 한 번에 length 올리기

```jsx
var obj12 = [];
obj12.length = 5;
console.log(obj12); // Array[5];

var obj13 = [1,2];
obj13[5] = 5;
console.log(obj13); // [1, 2, <3 empty items>, 5]
console.log(obj13.length); // 6

obj13.push(6);
console.log(obj13); // [1, 2, <3 empty items>, 5, 6]
console.log(obj13.length); // 7
```

> **참고**
일반적인 상황에서는 length를 한번에 올린다거나 Array(length) 혹은 arr[i] = 1과 같은 변칙적인 기법을 사용하지 않을 것을 권한다.
중간이 비어있는 배열을 사용할 경우, 특정 메서디가 일관성 없이 동작하기 때문이다.

코드 2-11

```jsx
console.log(obj13['len' + 'gth']); // 7

obj13['len' + 'gth'] = 10;
console.log(obj13.length); // 10

obj13.push(11);
console.log(obj13); // [ 1, 2, <3 empty items>, 5, 6, <3 empty items>, 11 ]
```

배열의 length도 ['length']로 참조 및 할당이 가능하다.

자바스크립트에서 객체는 구분 없이 key의 참조, 수정 등에 대한 제약이 없고 유연하다.

자바스크립트는 전체적으로 유연함과 자유로움이라는 일관성을 가지고 있다.

### 2.1.4 delete

```jsx
var obj = { a: 1, b: 2, c: 3 };
delete obj.a;
delete obj['b'];
delete obj['C'.toLowerCase()];
console.log(obj); // {};

delete Array.prototype.push;
var arr1 = [1, 2, 3];
arr1.push(4); // Uncaught TypeError: arr1.push is not a function
```

자바스크립트에서는 기본 객체의 메서드나 프로퍼티도 지울 수 있다.

### 2.1.5 코드가 실행될 수 있는 영역

객체에서의 키를 대괄호로 참조하면, 대괄호 사이에서 코드를 실행할 수 있다.

함수를 실행할 수도 함수를 정의한 후 즉시 실행할 수도 있다.

즉, 높은 수준으로 추상화할 수 있다는 말이다.

함수를 실행할 수 있다면 웬만한 모든 일을 할 수 있다.