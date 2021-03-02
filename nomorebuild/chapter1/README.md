<center>
	<h1>
		Chapter 1: 함수형 자바스크립트 소개
	</h1>
</center>

- 모든 프로그래밍 패러다임은 **성공적인** 프로그래밍을 위해 **존재**한다.
- 오류가 없는 것은 **좋은 프로그램**의 가장 중요한 척도이고, 높은 모듈화 수준은 **성공적인 프로그래밍 핵심 요소**다.
- 높은 모듈화 수준은 **생산성을 높이고**, 오류 없는 함수들의 조합은 프로그램 **전체의 안정성을 높여준다**.

> 함수형 프로그래밍은 성공적인 프로그래밍을 위해 부수 효과를 최대한 멀리하고 조합성을 강조하는 프로그래밍 패러다임이다.

## 1.1 함수형 프로그래밍 그거 먹는 건가요?
### 1.1.1 함수형 자바스크립트를 검색하면 나오는 예제
함수형 자바스크립트에 대한 **관심**을 가져 본 적이 있다면 아래와 같은 예제를 봤을 것이다.
- <span id="code-1-1">Code 1-1 </span>`addMaker`

```js
function addMaker(a) {
	return function(b) {
		return a + b;
	}
}

addMaker(10)(5) // 15
```

`addMaker`는 함수를 값으로 다루는 함수다.
`addMaker`에서는 단 하나의 값이 선언되며 그 값은 **함수**다. 그리고 그 값은 즉시 리턴된다.

`addMaker`는 함수에 인자 `10`을 넘겨주며 실행했다.
바로 함수가 리턴되었고, 리턴된 함수를 인자 `5`와 함께 바로 실행 했다.

- <span id="code-1-2">Code 1-2 </span>`addMaker로 만든 함수`
```js
var add5 = addMaker(5)
add5(3) // 8
add5(4) // 9
```

이번엔 `addMaker(5)`를 실행하여 `add5`라고 이름을 지어주었다.
그리고는 `3`도 더하고 `4`도 더해 결과를 얻었다.
값으로서의 **함수, 클로저, 스코프** 등의 많은 이야기를 담고 있다.

- <span id="code-1-3">Code 1-3 </span>`값으로서의 함수`
```js
var v1 = 100;
var v2 = function() {};
function f1 () { return 100; }
function f2 () { return function() {} }
```

v1은 변수에 `100`을, v2는 변수에 `함수`를 담고있다.
f1 함수는 `100`을 리턴하며, f2 함수는 `함수`를 리턴한다.
v2와 f2처럼 `함수`는 값으로 다뤄질 수 있다.

### 1.1.2 값으로써의 함수와 클로저
- <span id="code-1-4">Code 1-4 </span>`addMaker 다시보기`

```js
function addMaker(a) {
	return function(b) {
		return a + b;
	}
}
addMaker(10)(5) // 15

var add5 = addMaker(5)
add5(3) // 8
add5(4) // 8

var add3 = addMaker(3)
add3(3) // 6
add3(4) // 7
```
함수는 `값`을 리턴할 수 있고 함수는 `값`이 될 수 있다.
addMaker가 리턴한 `익명함수`는 `클로저`가 되었다.
리턴된 `익명함수` 내부에서 a가 정의된 적은 없지만 a를 참조하고 있고 a는 `부모 스코프`에 있다.

어디서도 addMaker의 인자인 a값을 변경시키지 않고 있기 때문에 `항상 동일한 값`을 갖는다.
위 상황에서는 a가 불변하며 `상수`로 쓰이게 된다.
이 상황에서의 a는 `불변`하지만, 모든 경우의 `클로저`가 그렇지는 않다.
`클로저`가 기억하는 `변수의 값`은 변할 수 있다.

## 1.2 함수형 자바스크립트의 실용성
`절차지향적`으로 작성된 코드를 `함수형`으로 **변경**하면서 `함수형 자바스크립트`의 **실용성**을 알아보자.
### 1.2.1 회원 목록 중 여러 명 찾기
- <span id="code-1-5">Code 1-5 </span>`for문으로 필터링하기`
```js
var users = [
	{ id: 1, name: "ID", age: 32 },
	{ id: 2, name: "HA", age: 25 },
	{ id: 3, name: "BJ", age: 32 },
	{ id: 4, name: "PJ", age: 28 },
	{ id: 5, name: "JE", age: 27 },
	{ id: 6, name: "JM", age: 32 },
	{ id: 7, name: "HI", age: 24 },
]

// 1
var temp_users = [];
for (var i = 0, len = users.length; i < len; i++) {
    if (users[i].age < 30) temp_users.push(age[i])
}
console.log(temp_users) // 결과: 4

// 2
var ages = [];
for (var i = 0, len = temp_users.length; i < len; i++) {
    ages.push(temp_users[i].age)
}
console.log(ages) // 결과: [25, 28, 27, 24]
```
위 코드의 1에서는 `user`중에 `age`가 `30` 미만인 `users[i]`만 모아서 몇명인지를 `출력`한다.
2에서는 그들의 나이만 다시 모아 `출력`한다.

```js
// 3
var temp_users = [];
for (var i = 0, len = users.length; i < len; i++) {
    if (users[i].age >= 30) temp_users.push(age[i])
}
console.log(temp_users) // 결과: 3

// 4
var names = [];
for (var i = 0, len = temp_users.length; i < len; i++) {
    names.push(temp_users[i].name)
}
console.log(names) // 결과: ["ID", "BJ", "JM"]
```
3에서는 `나이`가 `30` 미만인 `users[i]`만 다시 모아 출력한다.
4에서는 그들의 `이름`만 모아 출력한다.

1과 3의 `for문`에서 `users`를 돌며 특정 조건의 `users[i]`를 제외하고는 모두 동일한 코드를 가지고 있다.
이럴 때 `함수`를 활용하면 이런 부분까지 쉽게 추상화 할 수 있다.

