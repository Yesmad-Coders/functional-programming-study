# 2.2 함수 정의 다시 보기

## 2.2.1 기본 정의

자바스크립트에서 함수를 정의하는 방법은 아래와 같이 다양하다.

- 코드 2-13 일반적인 함수 정의

```javascript
function add1(a, b) {
  return a + b;
}
var add2 = function (a, b) {
  return a + b;
};
var m = {
  add3: function (a, b) {
    return a + b;
  },
};
```

함수를 정의하는 것은 이미 익숙하겠지만 호이스팅에 대해서 한번 확인할만하다.

## 2.2.2 호이스팅

호이스팅은 변수나 함수가 어디서 선언되든지 해당 스코프 최상단에 위치하게 되어 동일 스코프 어디서든 참조할 수 있는 것을 말한다.

- 코드 <span id="code-2-14">2-14</span> 에러가 나는 상황이지만 호이스팅이다

```javascript
console.log(add1(10, 5)); // 15
console.log(add2(10, 5)); // TypeError: add2 is not a function

function add1(a, b) {
  return a + b;
}
var add2 = function (a, b) {
  return a + b;
};
```

위 코드의 add1과 add2에는 호이스팅이 적용된다.

add2는 오류가 발생하며 실행이 되지 않았지만 분명 호이스팅이 적용된 것이다.

- 코드 2-15 선언한 적 없는 함수 실행

```javascript
hi(); // ReferenceError: hi is not defined
```

add2 함수가 실행되지 않은 이유는 선언되지 않은 것이 아니라 초기화되지 않았기 때문이다.

위의 코드의 경우 add2 함수를 호출한 것과 에러 메시지가 다르다.

- 코드 2-16 선언한 적 없는 변수 참조하기

```javascript
var a = hi; // ReferenceError: hi is not defined
```

마찬가지로 실행하지 않고 참조만 하려고 해도 동일한 오류가 발생한다.

[코드 2-14](#code-2-14)의 에러는 호이스팅에 의해 참조는 가능하지만 아직 함수가 아니기 때문에 발생하는 오류다.

- 코드 2-17 실행하지 않고 참조만 해보기

```javascript
console.log(add1); // [Function: add1]
console.log(add2); // undefined
function add1(a, b) {
  return a + b;
}
var add2 = function (a, b) {
  return a + b;
};
```

위의 코드에서는 오류가 발생하지 않고 undefined만 출력되었다.

add1과 add2의 차이는 변수 선언과 함수 선언에서의 차이가 존재한다.

변수는 선언 단계와 초기화 단계가 구분이 되어있어 선언과 초기화가 동시에 이루어지지 않는다.

따라서 호이스팅에 의해 참조만 가능하고 아직 값이 담기지 않아 실행은 불가능하다.

<sub id="2021-03-21"><sup>-- 2021-03-21 --</sup></sub>

## 2.2.3 호이스팅 활용하기

## 2.2.4 괄호 없이 즉시실행하기

## 2.2.5 new Function이나 eval을 써도 될까요?

## 2.2.6 간단 버전 문자열 화살표 함수와 new Function 성능

## 2.2.7 유명(named) 함수

## 2.2.8 유명 함수를 이용한 재귀

## 2.2.9 자바스크립트에서 재귀의 아쉬움

[[이전으로]](..//chapter2-1/README.md) / [[목록으로]](../README.md) / [[다음으로]](../chapter2-3/README.md)