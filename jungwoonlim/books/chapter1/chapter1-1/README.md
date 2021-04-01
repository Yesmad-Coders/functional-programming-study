# 1.1 함수형 프로그래밍 그거 먹는건가요?

### 1.1.1 함수형 자바스크립트를 검색하면 나오는 예제

함수형 프로그래밍을 처음 접하면 실용성에 대한 의문이 제일 먼저 생길 것이다. *~~이걸 왜 쓰는거지?~~*

함수를 리턴한다거나 괄호가 많은 코드들은 난해하고 생소하게 느껴질 것이다.

그러나 `addMaker`처럼 함수로 함수를 리턴하는 기법은 좋은 방법이다.

코드 1-1 addMaker

```jsx
function addMaker(a) {
	return function(b) {
		return a + b;
	}
}
addMaker(10)(5);
```

`addMaker`는 함수를 값으로 다루는 함수다. `addMaker`에서는 단 하나의 값이 선언되며 그 값은 함수다.

`addMaker(10)`의 결과가 함수이므로 `addMaker(10)(5)` 처럼 바로 실행할 수 있다.

코드 1-2 addMaker로 만든 함수

```jsx
var add5 = addMaker(5);
add5(3);
add5(4);
```

`addMaker(5)`를 실행하여 `add5`라 이름을 지었다. 값으로서의 함수, 클로저, 스코프 등을 포함한 코드이다.

코드 1-3 값으로서의 함수

```jsx
var v1 = 100;
var v2 = function () {};
function f1() { return 100; }
function f2() { return function() {}; }
```

`v1`은 변수에 100을, `v2`는 변수에 함수를 담고 있고 `f1` 함수는 100을 리턴하며, `f2` 함수는 함수를 리턴한다.

함수는 값으로 다뤄질 수 있다는 것을 확인했다.

### 1.1.2 값으로서의 함수와 클로저

코드 1-4 addMaker 다시보기

```jsx
function addMaker(a) {
	return function(b) {
		return a + b;
	}
}

addMaker(10)(5);

var add5 = addMaker(5);
add5(3);
add5(4);

var add3 = addMaker(3);
add3(3);
add3(4);
```

함수는 값을 리턴할 수 있고 함수는 값이 될 수 있다.

`addMaker`가 리턴한 익명 함수는 클로저가 되었고 리턴된 익명 함수 내부에서 `a`가 정의된 적은 없지만 `a`를 참조하고 있고 `a`는 부모 스코프에 있다.

클로저와 스코프는 이후 다룰 예정이다.