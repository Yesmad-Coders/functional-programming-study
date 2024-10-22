# 1.1 함수형 프로그래밍 그거 먹는 건가요?

## 1.1.1 함수형 자바스크립트를 검색하면 나오는 예제

함수형 자바스크립트에 관심을 가지게 되면 아래와 같은 예제들을 보았을 것이다.

- <span id="code-1-1">코드 1-1 </span>`addMaker`

```javascript
function addMaker(a) {
  return function (b) {
    return a + b;
  };
}

addMaker(10)(5); // 15
```

**커링** 혹은 **부분 적용**과 관련된 코드들이며 함수를 리턴하거나 괄호가 많은 코드들을 처음보면 난해하고 생소하게 느껴진다.

`addMaker`는 함수를 값으로 다루는 함수다. `addMaker` 함수에서는 하나의 값이 선언되었으며 그 값은 **함수**다. 그리고 그 **함수 값**은 바로 리턴된다.

`addMaker(10)`의 결과가 함수이므로 `addMaker(10)(5)`처럼 바로 실행할 수 있다.

- 코드 1-2 `addMaker`로 만든 함수

```javascript
var add5 = addMaker(5);
add5(3); //8
add5(4); // 9
```

`addMaker(5)`와 같이 함수를 실행해 `add5`라는 이름을 지어주고 3, 4를 더해 결과를 얻을 수 있었다. 이 예제들은 간단하지만 값으로서의 **함수**, **클로저**, **스코프** 등의 많은 이야기를 담고 있다.

- 코드 1-3 값으로서의 함수

```javascript
var v1 = 100;
var v2 = function () {};
function f1() {
  return 100;
}
function f2() {
  return function () {};
}
```

`v1`은 변수에 100을 `v2`는 변수에 함수를 담고 있다. `f1` 함수는 100을 리턴하며, `f2` 함수는 함수를 리턴한다. `v2`와 `f2` 처럼 함수는 값으로 다뤄질 수 있다.

<sub id="2021-02-24"><sup>-- 2021-02-24 --</sup></sub>

## 1.1.2 값으로써의 함수와 클로저

함수는 값을 리턴할 수 있고 함수는 값이 될 수 있다. `addMaker` 함수는 내부에서 함수를 정의하고 리턴한다.

`addMaker` 함수가 리턴한 익명 함수는 **클로저**가 되었다.

리턴된 익명 함수 내부에서 `a`가 정의된 적은 없지만 `a`를 참조하고 있고 `a`는 부모 스코프에 있다.

- 코드 1.4 `addMaker` 다시보기

```javascript
function addMaker(a) {
  return function (b) {
    return a + b;
  };
}

addMaker(10)(5); // 15

var add5 = addMaker(5);
add5(3); // 8
add5(4); //9

var add3 = addMaker(3);
add3(3); // 6
add3(4); //7
```

위의 예졔에서 `a`가 한번은 5이고 한번은 3이어서 각 결과가 8, 9와 6, 7이 반환되었다.

`addMaker` 함수가 실행된 후, 어디서도 `addMaker` 함수의 인자인 `a` 값을 변경 시키지 않고 있기 때문에 항상 동일한 값을 갖는다.

따라서 위의 상황에서 `a`는 **불변**하며 상수로 쓰이게 된다.

위의 상황에서 `a`는 불변하지만, 모든 경우의 **클로저**가 그렇지는 않으며 **클로저**가 기억하는 변수의 값은 변할 수 있다.

[[목록으로]](../README.md) / [[다음으로]](../chapter1-2/README.md)
