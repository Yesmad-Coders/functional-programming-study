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
- **Code 1-1** `addMaker`

```js
function addMaker(a) {
	return function(b) {
		return a + b;
	}
}

addMaker(10)(5) // 15
```

addMaker는 함수를 값으로 다루는 함수다.   
addMaker에서는 단 하나의 값이 선언되며 그 값은 **함수**다. 그리고 그 값은 즉시 리턴된다.   

addMaker는 함수에 인자 10을 넘겨주며 실행했다.   
바로 함수가 리턴되었고, 리턴된 함수를 인자 5와 함께 바로 실행 했다.   

- **Code 1-2** `addMaker로 만든 함수`
```js
var add5 = addMaker(5)
add5(3) // 8
add5(4) // 9
```

이번엔 addMaker(5)를 실행하여 add5라고 이름을 지어주었다.   
그리고는 3도 더하고 4도 더해 결과를 얻었다.   
값으로서의 **함수, 클로저, 스코프** 등의 많은 이야기를 담고 있다.    

- **Code 1-3** `값으로서의 함수`
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
- **Code 1-4** `addMaker 다시보기`

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
함수는 값을 리턴할 수 있고 함수는 값이 될 수 있다.   
addMaker가 리턴한 익명함수는 클로저가 되었다.   
리턴된 익명함수 내부에서 a가 정의된 적은 없지만 a를 참조하고 있고 a는 부모 스코프에 있다.   

어디서도 addMaker의 인자인 a값을 변경시키지 않고 있기 때문에 항상 동일한 값을 갖는다.   
위 상황에서는 a가 불변하며 상수로 쓰이게 된다.   
이 상황에서의 a는 불변하지만, 모든 경우의 클로저가 그렇지는 않다.   
클로저가 기억하는 변수의 값은 변할 수 있다.   

## 1.2 함수형 자바스크립트의 실용성
절차지향적으로 작성된 코드를 함수형으로 **변경**하면서 함수형 자바스크립트의 **실용성**을 알아보자.   
### 1.2.1 회원 목록 중 여러 명 찾기
- **Code 1-5** `for문으로 필터링하기`
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
위 코드의 1에서는 user중에 age가 30 미만인 users[i]만 모아서 몇명인지를 출력한다.   
2에서는 그들의 나이만 다시 모아 출력한다.   

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
3에서는 나이가 30 미만인 users[i]만 다시 모아 출력한다.   
4에서는 그들의 이름만 모아 출력한다.   

1과 3의 for문에서 users를 돌며 특정 조건의 users[i]를 제외하고는 모두 동일한 코드를 가지고 있다.   
이럴 때 함수를 활용하면 이런 부분까지 쉽게 추상화 할 수 있다.   

### 1.2.2 for에서 filter로 if에서 predicate로

- **Code 1-5** `filter`
```js
// 기존 코드
/*
var temp_users = [];
for (var i = 0, len = users.length; i < len; i++) {
	if (users[i].age < 30) temp_users.push(users[i])l
}
console.log(temp_users.length) // 4
*/

// 변경된 코드
function filter(list, predicate) {
	var new_list = [];
	for (var i = 0, len = list.length; i < len; i++) {
		if (predicate[list[i]]) return new_list.push(list[i])
	}
	return new_list;
}
```
1. filter 함수는 인자로 list와 predicate로 인자를 받는다.   
2. predicate 함수는 list.length 만큼 실행되며 predicate 함수의 결과가 참일 때만 new_list.push를 실행한다.   
	- new_list.push가 실행될지 여부를 predicate 함수에게 완전 위임한 것이다.   
	- id를 조회할지 age르르 조회할지 어떤 조건을 만들지를 filter는 전혀 모른다. 오직 predicate 결과에만 의지한다.   
3. 마지막에는 new_list를 리턴한다.   

> 이름을 new_라고 붙였는데 이는 함수형 프로그래밍적인 관점에서 굉장히 상징적인 부분이다.
> 이전 값의 상태를 변경하지 않고 새로운 값을 만드는 식으로 값을 다루는 것은 함수형 프로그래밍의 메우 중요한 컨셉이다.

- **Code 1-7** filter 사용
```js
                                   // predicate
var users_under_30 = filter(users, function(user) {
	return user.age < 30
});
console.log(users_under_30); // 4

var ages = [];
for (var i = 0, len = users_under_30.length; i < len; i++) {
	ages.push(users_under_30[i].age)
}
console.log(ages);
// [25, 28, 27, 24]

			          // predicate
var users_over_30 = filter(users, function(user) {
	return user.age > 30
});
console.log(users_over_30); // 3

var names = []
for (var i = 0, len = users_over_30.length; i < len; i++){
	names.push(users_over_30[i].name);
}
console.log(names);
// ["ID", "BJ", "JM"]
```

filter 함수를 실행하면서 predicate 자리에 익명 함수를 정의해서 넘겼다.   
filter 함수는 조건부를 대신하여 predicate가 true를 넘겨줄 때만 new_list에 user를 담아 리턴한다.   
> 익명 함수란, 말 그대로 이름이 없는 함수다.

### 1.2.3 함수형 프로그래밍 관점으로 filter 보기
- filter 함수에는 for도 있고 if도 있지만, filter 함수는 항상 동일하게 동작하는 함수다.   
- filter함수의 로직은 외부나 내부의 어떤 상태 변화에도 의존하지 않는다.   
- new_list의 값을 바꿔주고 있지만 그 변화에 의존하는 다른 로직이 없다.   
- for는 list.length 만큼 무조건 루프를 돈다. i의 변화에 의존하여 루프를 돌지만 그 외의 i의 변화에 의존한 다른 로직은 없다.
- 