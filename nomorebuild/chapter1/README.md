<center>
	<h1>
		Chapter 1: 함수형 자바스크립트 소개
	</h1>
</center>

- 모든 프로그래밍 패러다임은 **성공적인** 프로그래밍을 위해 **존재**한다.<br />
- 오류가 없는 것은 **좋은 프로그램**의 가장 중요한 척도이고, 높은 모듈화 수준은 **성공적인 프로그래밍 핵심 요소**다.<br />
- 높은 모듈화 수준은 **생산성을 높이고**, 오류 없는 함수들의 조합은 프로그램 **전체의 안정성을 높여준다**.<br />

> 함수형 프로그래밍은 성공적인 프로그래밍을 위해 부수 효과를 최대한 멀리하고 조합성을 강조하는 프로그래밍 패러다임이다.

## 1.1 함수형 프로그래밍 그거 먹는 건가요?
### 1.1.1 함수형 자바스크립트를 검색하면 나오는 예제
함수형 자바스크립트에 대한 **관심**을 가져 본 적이 있다면 아래와 같은 예제를 봤을 것이다.<br />
- **Code 1-1** `addMaker`

```js
function addMaker(a) {
	return function(b) {
		return a + b;
	}
}

addMaker(10)(5) // 15
```

addMaker는 함수를 값으로 다루는 함수다.<br />
addMaker에서는 단 하나의 값이 선언되며 그 값은 **함수**다. 그리고 그 값은 즉시 리턴된다.<br />

addMaker는 함수에 인자 10을 넘겨주며 실행했다.<br />
바로 함수가 리턴되었고, 리턴된 함수를 인자 5와 함께 바로 실행 했다.<br />

- **Code 1-2** `addMaker로 만든 함수`
```js
var add5 = addMaker(5)
add5(3) // 8
add5(4) // 9
```

이번엔 addMaker(5)를 실행하여 add5라고 이름을 지어주었다.<br />
그리고는 3도 더하고 4도 더해 결과를 얻었다.<br />
값으로서의 **함수, 클로저, 스코프** 등의 많은 이야기를 담고 있다.<br /> 

- **Code 1-3** `값으로서의 함수`
```js
var v1 = 100;
var v2 = function() {};
function f1 () { return 100; }
function f2 () { return function() {} }
```

v1은 변수에 `100`을, v2는 변수에 `함수`를 담고있다.<br />
f1 함수는 `100`을 리턴하며, f2 함수는 `함수`를 리턴한다.<br />
v2와 f2처럼 `함수`는 값으로 다뤄질 수 있다.<br />

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
함수는 값을 리턴할 수 있고 함수는 값이 될 수 있다.<br />
addMaker가 리턴한 익명함수는 클로저가 되었다.<br />
리턴된 익명함수 내부에서 a가 정의된 적은 없지만 a를 참조하고 있고 a는 부모 스코프에 있다.<br />

어디서도 addMaker의 인자인 a값을 변경시키지 않고 있기 때문에 항상 동일한 값을 갖는다.<br />
위 상황에서는 a가 불변하며 상수로 쓰이게 된다.<br />
이 상황에서의 a는 불변하지만, 모든 경우의 클로저가 그렇지는 않다.<br />
클로저가 기억하는 변수의 값은 변할 수 있다.<br />

## 1.2 함수형 자바스크립트의 실용성
절차지향적으로 작성된 코드를 함수형으로 **변경**하면서 함수형 자바스크립트의 **실용성**을 알아보자.<br />

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
위 코드의 1에서는 user중에 age가 30 미만인 users[i]만 모아서 몇명인지를 출력한다.<br />
2에서는 그들의 나이만 다시 모아 출력한다.<br />

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

3에서는 나이가 30 미만인 users[i]만 다시 모아 출력한다.<br />
4에서는 그들의 이름만 모아 출력한다.<br />

1과 3의 for문에서 users를 돌며 특정 조건의 users[i]를 제외하고는 모두 동일한 코드를 가지고 있다.<br />
이럴 때 함수를 활용하면 이런 부분까지 쉽게 추상화 할 수 있다.<br />

### 1.2.2 for에서 filter로 if에서 predicate로

- **Code 1-6** `filter`
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
		if (predicate(list[i])) return new_list.push(list[i])
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

var users_over_30 = filter(users, function(user) {
	return user.age >= 30
});
console.log(users_over_30); // 3

var names = []
for (var i = 0, len = users_over_30.length; i < len; i++){
	names.push(users_over_30[i].name);
}
console.log(names);
// ["ID", "BJ", "JM"]
```

filter 함수를 실행하면서 predicate 자리에 익명 함수를 정의해서 넘겼다.<br />
filter 함수는 조건부를 대신하여 predicate가 true를 넘겨줄 때만 new_list에 user를 담아 리턴한다.<br />
> 익명 함수란, 말 그대로 이름이 없는 함수다.

### 1.2.3 함수형 프로그래밍 관점으로 filter 보기
- filter 함수에는 for도 있고 if도 있지만, filter 함수는 항상 동일하게 동작하는 함수다.<br />
- filter함수의 로직은 외부나 내부의 어떤 상태 변화에도 의존하지 않는다.<br />
- new_list는 이 함수에서 최초로 만들어졌고 외부의 어떠한 상황이나 상태와도 무관하다.<br />
```js
filter(users, function(user) { return user.age < 30 });
```

위 코드에서 사용된 filter를 보면 filter의 if는 predicate의 결과에만 의존한다.<br />
predicate에서도 역시 값을 변경하지는 않으며, true인지 false인지를 filter의 if에게 전달하는 일만 한다.<br />

코드에는 for도 없고 if도 없다. 별도의 로직이 없고 매우 단순하고 쉽다.<br />

- 절차지향 프로그래밍: 위에서 아래로 내려가면서 특정 변수의 값을 변경해 나가는 식으로 로직을 만든다.<br />
- 객체지향 프로그래밍: 객체들을 만들어 놓고 객체들 간의 협업을 통해 로직을 만든다.<br />
- 함수형 프로그래밍: '항상 동일하게 동작하는 함수'를 만들어 보조 함수를 조합하는 식으로 로직을 완성한다.<br />

함수형 프로그래밍은 내부에서 관리하고 있는 상태를 따로 두지 않고 넘겨진 인자에만 의존한다.<br />
동일한 인자가 들어오면 항상 동일한 값을 리턴 하도록 한다.<br />
보조함수 역시 인자이며, 보조 함수에서도 상태를 변경하지 않으면 보조 함수를 받은 함수는 항상 동일한 결과를 만드는 함수가 된다.<br />

객체지향적으로 작성된 코드에서도 이전 객체와 같은 상태를 지닌 새 객체를 만드는 식으로 효과를 줄일 수 있으나, 무수히 많고 각기 다른 종류로 나누어진 객체를 복사하는 식으로 다루는 것은 운용도 어렵고 객체지향과 어울리지도 않는다.<br />
반면, 함수형 프로그래밍에서는 부수 효과를 최소화 하는 것이 목표에 가깝다.<br />

현대 프로그래밍에서는 다루는 값은 대부분 객체이므로 함수형 프로그래밍에서도 결국 객체를 다뤄야 한다.<br />
객체를 확장하느냐 객체를 다루는 함수를 늘리느냐의 차이이며 추상화의 단위가 클래스이냐 함수이냐의 차이다.<br />

### 1.2.4 map 함수
`Code 1-8`의 **기존 코드**를 보면 회원 목록을 통해 나이와 이름들을 추출하는데 두 코드의 중복이 있다.<br />
이번에는 기존 코드를 그대로 활용하여 map이라는 함수를 만들어 보자.<br />

> 리팩터링의 핵심은 중복을 제거하고 의도를 드러내는 것이다.
- **Code 1-8** `map`
```js
// 기존 코드
/*
var ages = [];
for (var i = 0, len = users_under_30.length; i < len; i++) {
	ages.push(users_under_30[i].age);
}
console.log(ages);

var names = [];
for (var i = 0, len = users_over_30.length; i < len; i++) {
	names.push(users_over_30[i].age);
}
console.log(names);
*/

// 바꾼 코드
function map(list, iteratee) {
	var new_list = [];

	for (var i = 0, len = list.length; i < len; i++) {
		new_list.push(iteratee(list[i]));
	}
	return new_list
}
```

이번에도 기존에 중복되었던 코드와 거의 동일하며 아주 약간만 고쳤다.<br />
new_list에 무엇을 push할지에 대해 iteratee함수에게 위임했다.<br />

- **Code 1-9** `map 사용`
```js
var users_under_30 = filter(users, function(user) { return user.age < 30 });
console.log(users_under_30.length); // 4

var ages = map(users_under_30, function(user) { return user.age });
console.log(ages) // []
```

코드가 매우 단순해졌다. 코드를 읽어보면 아래와 같다.<br />
- 회원 중 나이가 30세 미만인 사람들을 뽑아 users_under_30에 담는다.
- users_under_30에 담긴 회원의 나이만 뽑아서 출력한다.
- 회원 중 나이가 30세 이상인 사람들을 뽑아 users_over_30에 담는다.
- users_over_30에 담긴 회원의 이름만 뽑아서 출력한다.

### 1.2.5 실행 결과로 바로 실행하기
아래의 코드 처럼 함수의 리턴값을 바로 다른 함수의 인자로 사용하면 변수 할당을 줄일 수 있다.<br />
- **Code 1-10** `함수 중첩`
```js
var ages = map(
	filter(users, function(user) { return user.age < 30 }),
	function(user) { return user.age; });
console.log(ages.length); // 4
console.log(ages); // [25, 28, 27, 24]

var names = map(
	filter(users, function(user) { return user.age >= 30 }),
	function(user) { return user.name; });
console.log(names.length); // 3
console.log(names) // ["ID", "BJ", "JM"]
```

- **Code 1-11** `함수 중첩 2`
```js
function log_length(value) {
	console.log(value.length);
	return value;
}

console.log(log_length(
	map(
		filter(users, function(user) { return user.age < 30 }),
		function(user), function(user) { return user.age; })));
// 4
// [25, 28, 27, 24]

console.log(log_length(
	map(
		filter(users, function(user) { return user.age >= 30 }),
		function(user), function(user) { return user.name; })));

// 3
// ["ID", "BJ", "JM"]
```

위의 코드를 보자면 filter함수는 predicate를 통해 값을 필터링하여 map에 전달하고 map은 받은 iteratee를 통해 새로운 값들을 만들어 log_length에게 전달한다.<br />
지금까지 만든 Code 1-12를 Code 1-5와 비교해보자.<br />

- **Code 1-12** `filter, map`
```js
function filter(list, predicate) {
	var new_list = [];
	for (var i = 0, len = list.length; i < len; i++) {
		if (predicate(list[i])) new_list.push(list[i])
	}
	return new_list
}

function map(list, iteratee) {
	var new_list = []
	for (var i = 0, len = list.length; i < len; i ++) {
		new_list.push(iteratee(list[i]));
	}
	return new_list;
}

function log_length(value) {
	console.log(value.length);
	return value;
}

console.log(log_length(
	map(
		filter(users, function(user) { return user.age < 30 }),
		function(user), function(user) { return user.age; })));
// 4
// [25, 28, 27, 24]

console.log(log_length(
	map(
		filter(users, function(user) { return user.age >= 30 }),
		function(user), function(user) { return user.name; })));

// 3
// ["ID", "BJ", "JM"]
```

### 1.2.6 함수를 값으로 다룬 예제의 실용성
addMaker와 비슷한 패턴의 함수가 실제로도 많이 사용된다.<br />
bvalue라는 함수를 아래 코드처럼 만들면 1-12의 코드를 더 줄일 수 있다.<br />

- **Code 1-13** `함수를 리턴하는 함수 bvalue`
```js
function addMaker(a) {
	return function(b){
		return a + b;
	}
}

function bvalue(key) {
	return function(obj) {
		return obj[key]
	}
}

bvalue("a")({ a: "hi", b: "hello" }) // hi
```

코드를 정리하자면 아래와 같다.<br />
1. bvalue를 실행할 때 넘겨준 인자 key를 나중에 obj를 받을 익명함수가 기억하여 클로저가 된다.
2. bvalue의 실행 결과는 key를 기억하는 함수이고 이 함수에는 key/value 쌍으로 구성된 객체를 인자로 넘길 수 있다.
3. 이 함수는 obj를 받아 앞서 받아 두었던 key로 value값을 리턴 시킨다.
4. 위에서는 a를 기억해 두었다가 넘겨진 객체의 `obj["a"]`에 해당하는 결과를 리턴한다.

- **Code 1-14** `bvalue로 map의 iteratee 만들기`
```js
console.log(log_length(
	map(
		filter(function (user) { return user.age < 30 }),
		bvalue("age"))));
	
console.log(log_length(
map(
	filter(function (user) { return user.age >= 30 }),
	bvalue("name"))));
```

map이 사용할 iteratee 함수를 bvalue가 리턴한 함수로 대체했다.<br />
익명 함수 선언이 사라져 코드가 더욱 짧아졌다.<br />
앞으로도 함수를 리턴하는 함수나 아주 작은 단위의 함수들이 매우 실용적으로 사용되는 사례들을 자주 만나게 될 것이다.<br />

**참고**
> bvalue의 b를 붙인 이유는 인자를 미리 부분적으로 bind해 둔 함수를 만들고 있음을 간결하게 표현한 것이다.

Code 1-15는 ES6의 화살표 함수(Arrow Function)를 사용한 경우다.<br />
아쉽게도 일부 브라우저에서는 아직 작동하지 않는다.<br />

`u => u.age < 30`은 `function(u) { return u.age < 30; }`과 같은 동작을 한다.<br />
`u => age`는 `function(u) { return u.age }`와 같은 동작을 한다.<br />

- **Code 1-15** `화살표 함수와 함께`
```js
console.log(log_length(
	map(
		filter(user => user.age < 30; ),
		bvalue("age"))));
	
console.log(log_length(
map(
	filter(user => user.age >= 30; ),
	bvalue("name"))));

// 이것도 괜찮다.
var under_30 = u => u.age < 30;
var over_30 = u => u.age >= 30;

console.log(log_length(
	map(filter(users, under_30), u => u.age)));

console.log(log_length(
	map(filter(users, over_30), u => u.name)));

// 아니면 이것도 괜찮다.
var ages = list => map(list, v => v.age);
var names = list => map(list, v => v.name);

console.log(log_length(ages(filter(users, under_30))));
console.log(log_length(names(filter(users, over_30))));

// 마지막으로 한번만 더 고쳐보자.
function bvalues(key){
	var value = bvalue(key);
	return function(list) { return map(list, value); }
}
```

## 1.3 함수형 자바스크립트의 실용성 2
### 1.3.1 회원 목록 중 한명 찾기
회원 목록 중에 특정 조건을 가진 회원 한명을 찾고 싶다. 예를 들면 id의 값으로 말이다.<br />
우선 filter를 통해 아래 코드처럼 찾아보자.<br />

- **Code 1-16** `filter로 한 명 찾기`
```js
var users = [
	{ id: 1, name: "ID", age: 32 },
	{ id: 2, name: "HA", age: 25 },
	{ id: 3, name: "BJ", age: 32 },
	{ id: 4, name: "PJ", age: 28 },
	{ id: 5, name: "JE", age: 27 },
	{ id: 6, name: "JM", age: 32 },
	{ id: 7, name: "HI", age: 24 },
];

console.log(
	filter(users, function(user) { return user.id === 3})[0]
);
// { id: 3, name: "BJ", age: 32 }
```

filter를 사용하여 찾을 수 있지만 filter함수는 list.length만큼 predicate함수가 실행되기 때문에 효율적이지 못하다.<br />
동일 조건에 값이 두 개 이상이라면 두 개 이상의 값을 찾는다.<br />
이 문제를 해결하기 위해서 코드를 아래처럼 수정해보자.

- **Code 1-17** `break`
```js
var user;
for (var i = 0, len = users.length; i < len; i++) {
	if (users[i] == 3) {
		user = users[i];
		break;
	}
}
console.log(user);
// { id: 3, name: "BJ", age: 32 }
```

원하는 user를 찾은 후 break로 for문을 빠져나왔다.<br />
앞선 filter를 통해 찾은 것보다 효율적이지만 재사용이 불가능하다.<br />
위 코드를 함수로 만들어서 재사용이 가능하도록 만들어 보자.<br />

- **Code 1-18** `findById`
```js
function findById(list, id) {
	var user;
	for (var i = 0, len = list.length; i < len; i++) {
		if (list[i].id == 3) {
			user = list[i];
			break;
		}
	}
}

console.log(findById(users, 3)); // { id: 3, name: "BJ", age: 32 }
console.log(findById(users, 5)); // { id: 5, name: "JE", age: 27 }
```

findById는 list와 id를 받아 루프를 돌다가 id가 동일한 객체를 만나면 그 값을 리턴한다.<br />
동시에 함수도 종료되고 for도 멈추며, id를 찾지 못했을 때 기본 리턴 값인 undefined가 리턴된다.<br />

- **Code 1-19** `findByName`
```js
function findByName(list, name) {
	for (var i = 0, len = list.length; i < len; i++) {
		if (list[i].name == name) return list[i];
	}
}

console.log(findByName(users, "BJ")); // { id: 3, name: "BJ", age: 32 }
console.log(findByName(users, "JE")); // { id: 5, name: "JE", age: 27 }
```

- **Code 1-20** `findByAge`
```js
function findByAge(list, age) {
	for (var i = 0, len = list.length; i < len; i++) {
		if (list[i].age == age) return list[i];
	}
}

console.log(findByAge(users, 32)); // { id: 3, name: "BJ", age: 32 }
console.log(findByAge(users, 27)); // { id: 5, name: "JE", age: 27 }
```

위와 같은 방식은 그동안 많이 사용해 온 방식이다.<br />
로직이 숨겨지고 깔끔해졌지만 아직 아쉬움이 있다.<br />
일단 findById, findByName, findByAe 사이에 중복이 있다는 점이 아쉽다.<br />
이러한 방식은 함수형이지 않다.<br />

아래 코드와 같이 인자를 하나 더 늘리면 중복을 제거할 수 있게 된다.<br />

- **Code 1-21** `findBy`
```js
function findBy(key, list, val) {
	for (var i = 0, len = list.length; i < len; i++) {
		if (list[i][key] === val) return list[i];
	}
}

console.log(findBy("name", users, 32)); // { id: 3, name: "BJ", age: 32 }
console.log(findBy("id", users, 2)); // { id: 2, name: "HA", age: 25 }
console.log(findBy("age", users, 28)); // { id: 4, name: "PJ", age: 28 }
```

코드가 1/3로 줄었다. 아니 정확히 말하자면 앞으로의 코드도 줄였다.<br />
findBy함수는 users, posts, comments, products 등 key로 value를 얻을 수 있는 객체들을 가진 배열이라면 무엇이든 받을 수 있다.<br />
이러한 과정으로 훨씬 많은 경우를 대응할 수 있는 함수가 되었지만 다음과 아직 같은 상황을 지원하지 못하는 아쉬움이 있다.<br />
- key가 아닌 매서드를 통해 값을 얻어야 할 때
- 두 가지 이상의 조건이 필요할 때
- ===이 아닌 다른 조건으로 찾고자 할 때

다음 코드는 user객체가 매서드로 값을 얻어야 하는 객체일 경우 발생하는 난감한 상황을 보여준다.

- **Code 1-22** `findBy로 안되는 경우`
```js
function User(id, name, age) {
	this.getId = function() {
		return id;
	}
	this.getName = function() {
		return name;
	}
	this.getAge= function() {
		return age;
	}
}

var users2 = [
	new User(1, "ID", 32),
	new User(2, "HA", 25),
	new User(3, "BJ", 32),
	new User(4, "PJ", 28),
	new User(5, "JE", 27),
	new User(6, "JM", 32),
	new User(7, "HI", 24),
];

function findBy(key, list, val) {
	for (var i = 0, len = list.length; i < len; i++) {
		if (list[i][key] === val) return list[i];
	}
}

console.log(findBy('age', users2, 25)); // undefined
```

Code 1-22를 보면 user의 나이를 .getAge()로 얻어내야 하기 때문에 findBy함수로는 위 상황을 대응할 수 없음을 알 수 있다.
이번엔 보다 함수적인 프로그램을 해보자.

- **Code 1-23** `find`
```js
function find(list, predicate) {
	for (var i = 0, len = list.length; i < len; i++) {
		if (predicate(list[i])) return list[i];
	}
}

console.log(
	find(users2, function(u) { return u.getAge() == 25; }).getName()
);
// HA
console.log(
	find(users2, function(u) { return u.name.indexOf("P") != -1; })
);
// { id: 4, name: "PJ", age: 28 }
console.log(
	find(users2, function(u) { return u.age == 32 && u.name == "JM"; }) 
); 
// { id: 6, name: "JM", age: 32 }
console.log(
	find(users2, function(u) { u.getAge() < 30; }).getName() 
);
// HA
```

find의 인자로 key와 val 대신 predicate 함수 하나 받았다.
덕분에 안쪽에서 할 수 있는 일이 정말 많아졌다.
ageAge와 같은 매서드 실행을 통해 값을 비교하기도 했고, indexOf와 같은 매서드를 통해 이름에 'P'가 포함 되었는지를 알아내기도 했다.
두가지 조건을 모두 만족하는지 보기도 했으며 연산자 역시 마음대로 사용 가능하다.

인자를 String이나 Number 대신 Function으로 변경한 작은 차이가 매우 큰 차이를 만들었다.
find는 이제 배열에 어떤 값이 들어 있든 사용할 수 있게 되었디.
함수형 자바스크립트는 이처럼 다형성이 높은 기법을 많이 사용하며 이러한 기법은 정말 실용적이다.

- 객체지향 프로그래밍: 약속된 이름의 매서드를 대신 실행해 주는 식으로 외부 객체에게 위임하는 방식
- 함수형 프로그래밍: 보조 함수를 통해 완전히 위임되는 방식

다음은 가튼 함수를 사용하면서 각 데이터에 맞는 보조 함수로 대응하는 사례다.

- **Code 1-24** `다형성`
```js
// Code 1-16에서 선언한 users
console.log(
	map(
		filter(users, function(u) { return uesr >= 30 }),
		function(u) { return u.name; }));
// ["ID", "BJ", "JM"]

// Code 1-22에서 users2로 교체
console.log(
	map(
		filter(users2, function(u) { return u.getAge() >= 30 }), // 매서드 실행으로 변경
		function(u) { return u.getName(); })); // 매서드 실행으로 변경
// ["ID", "BJ", "JM"]
```
