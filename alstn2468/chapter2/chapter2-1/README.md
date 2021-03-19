# 2.1 객체와 대괄호 다시 보기

### 2.1.1 난해해 보이는 문법들을 확인하는 목적

실제 자바스크립트 라이브러리 혹은 프레임워크에서 난해한 문법들이 사용되는 경우가 많다.

주로 아래와 같은 목적을 가지고 사용한다.

1. 더 짧은 코드를 위해
2. 추상화의 다양한 기법ß
3. if를 없애기 위해
4. 특별한 로직을 위해
5. 캐시를 위해
6. 은닉을 위해
7. 함수를 선언하고 참조하기 위해
8. 컨텍스트를 이어주기 위해

다양한 라이브러리, 프레임워크의 코드와 테스트 케이스를 살펴보는 것이 코딩 실력에 도움이 될 것이다.

문법에 따를 세밀한 기능 차이를 이해하고 알고 있다면 아래와 같은 일이 가능 할 것이다.

> 아무 곳에서나 함수 열기, 함수 실행을 원하는 시점으로 미뤄서 실행하기.

### 2.1.2 객체와 key

- 코드 2-1 다양한 key/value 정의 방법

```javascript
var obj = { a: 1, "b": 2 };
obj.c = 3;
obj['d'] = 4;
var e = 'e';
obj[e] = 5;
function f() { return 'f'; }
obj[f()] = 6;
console.log(obj);
// { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6 ß}
```

객체의 key와 value는 `{}`, `.`, `[]` 등을 통해 설정할 수 있다.

그 중 어떤 문자열이든 key로 정의할 수 있는 곳은 `"b"`와 `[]` 같은 곳이다.

이 두 가지 방식은 띄어쓰기, 특수문자, 숫자 등을 가리지 않고 어떤 문자열이든 key로 만들 수 있다.

- 코드 2-2 띄어쓰기, 특수 문자, 숫자

```javascript
var obj2 = { ' a a a ': 1 };
obj2[' b b b '] = 2;
console.log(obj2);
// { ' a a a ': 1, ' b b b ': 2 }

var obj3 = { 'margin-top': 5 };
obj3['padding-bottom'] = 20;
console.log(obj3);
// { 'margin-top': 5, 'padding-bottom': 20 }
var obj4 = { 1: 10 };
obj4[2] = 20;
console.log(obj4);
// { '1': 10, '2': 20 }
```

`{}` 안쪽에서 key를 선언하는 것과 `[]`안에서 선언하는 것은 차이가 존재한다.

`{}`의 문자열 부분에서는 코드를 실행할 수 없고 `[]`의 안쪽에서는 코드를 실행할 수 있다.

- 코드 2-3 코드가 실행되지 않는 key 영역

```javascript
var obj5 = { (true ? "a" : "b" : 1 ) };
// SyntaxError: Unexpected token '('
```

`{}` 안쪽의 key 영역에서는 위와 같이 코드를 실행할 수 없다.

- 코드 2-4 코드가 실행되는 key 영역

```javascript
var obj6 = {};
obj6[true ? 'a' : 'b'] = 1;
console.log(obj6); // { a: 1 }
```

`[]` 사이에는 문자열이 담긴 변수도 넣을 수 있으며, 연산자도 사용할 수 있으며 함수도 실행할 수 있다.

- 코드 2-5 ES6에서 동작하는 `{}` 안쪽에 대괄호 사용하기

```javascript
var obj5 = { [true ? 'a' : 'b']: 1 };
console.log(obj5); // { a: 1 }
```

ES6의 경우 위의 코드와 같이 `{}` 안쪽에도 대괄호를 사용해 작성이 가능하다.

<sub id="2021-03-17"><sup>-- 2021-03-17 --</sup></sub>

### 2.1.3 함수나 배열에 달기

- 코드 2-6 함수를 객체로 사용

```javascript
function obj8() {}
obj8.a = 1;
obj8.b = 2;
console.log(obj8.a); // 1
console.log(obj8.b); // 2
```

자바스크립트에서는 함수도 객체다. 그러므로 함수도 key/value 쌍으로 구성할 수 있다.

- 코드 2-7 호이스팅

```javascript
obj9.a = 1;
obj9.b = 2;
console.log(obj9.a + obj9.b); // 3

function obj9() {}
```

함수로 선언할 경우 호이스팅에 의해 위와 같은 코드 또한 정상적으로 동작한다.

- 코드 2-8 배열에 숫자가 아닌 key 사용하기

```javascript
var obj10 = [];
obj10.a = 1;
console.log(obj10); // [a: 1]
console.log(obj10.length); // 0
```

배열도 객체이며 배열에도 숫자가 아닌 key를 사용할 수 있다.

단, 숫자가 아닌 key로 값을 할당할 경우 length는 변하지 않는다.

- 코드 2-9 배열에 숫자로 key 사용하기

```javascript
var obj11 = [];
obj11[0] = 1;
obj11[1] = 2;
console.log(obj11); // [1, 2]
console.log(obj11.length); // 2
```

배열에 숫자로 key를 직접 할당해도 push와 동일하게 동작하며 length도 올라간다.

- 코드 2-10 한 번에 length 올리기

```javascript
var obj12 = [];
obj12.length = 5;
console.log(obj12); // [<5 empty items>]

var obj13 = [1, 2];
obj13[5] = 5;
console.log(obj13); // [1, 2, <3 empty items>, 5]
console.log(obj13.length); // 6

obj13.push(6);
console.log(obj13); // [1, 2, <3 empty items>, 5, 6]
console.log(obj13.length); // 7
```

일반적인 상황에서는 length를 한번에 올리거나 `Array(length)`, `arr[i] = 1`과 같은 변칙적인 기법을 사용하지 않는 것이 좋다.

코드 자체는 정상적으로 동작하지만 중간이 비워진 배열을 사용할 경우, 특정 메서드가 일관성 없이 동작하기도 한다.

> 또한 `arr.push(1)`보다 `arr[i] = 1`이 성능이 좋으며 IE에서는 5배 이상 차이가 나기도 한다.

배열의 메서드를 사용하면서도 아무 문제가 없도록 한번에 크기를 늘이는 방법도 존재한다.

한번에 크기를 늘리면서 undefined들로 채워진 배열을 안전하게 만들고 싶다면, apply를 활용하면 된다.

- 카일 심슨의 You Don't Know JS - 타입과 문법 중

```javascript
Array.apply(null, { length: 3 });
// [undefined, undefined, undefined]
```

- 코드 2-11 length로 참조가능한 배열

```javascript
console.log(obj13['len' + 'gth']); // 7
obj13['len' + 'gth'] = 10;
console.log(obj13.length); // 10

obj13.push(11);
console.log(obj13); // [1, 2, <3 empty items>, 5, 6, <3 empty items>, 11]
```

배열의 length 또한 ['length']로 참조 및 할당이 가능하다.

전체적으로 자바스크립트는 유연함과 자유로움이라는 일관성을 가지고 있다.

### 2.1.4 delete

자바스크립트에서는 기본 객체의 메서드나 프로퍼티도 지울 수 있다.

- 코드 2-12 기본 객체의 메서드 지우기

```javascript
var obj = { a: 1, b: 2, c: 3 };
delete obj.a;
delete obj['b'];
delete obj['C'.toLocaleLowerCase()];
console.log(obj); // {}

delete Array.prototype.push;
var arr1 = [1, 2, 3];
arr1.push(4); // TypeError: arr1.push is not a function
```

자바스크립트는 delete를 이용해 아무거나 지울 수 있으며 이러한 차이는 다른 언어와 다른점이다.

이런 자바스크립트의 특징들은 효율성이나 실용적인 면에서 분명한 장점이 많았고 자바스크립트의 다른 기능들과 더 잘 맞아 떨어지기도 했다.

<sub id="2021-03-19"><sup>-- 2021-03-19 --</sup></sub>

[[이전으로]](../../chapter1/chapter1-4/README.md) / [[목록으로]](../README.md) / [[다음으로]](../chapter2-2/README.md)
