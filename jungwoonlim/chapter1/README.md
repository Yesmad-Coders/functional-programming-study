# 1장 함수형 자바스크립트 소개

---

절차지향적으로 작성된 코드를 함수형으로 리팩터링하면서 함수형 자바스크립트의 실용성을 확인합니다.

실무에서 사용할 만한 데이터와 코드에서 map, filter, find 등 고차 함수의 로직을 발견합니다.

클로저에 대해서는 함수형 자바스크립트적인 관점으로 다시 접근하여 설명합니다.

> **성공적인 프로그래밍이란?**
*사용성, 성능, 확장성, 기획 변경에 대한 대응력 등을 효율적이고 생산적으로 이루는 일*

## 함수형 프로그램이란?

성공적인 프로그래밍을 위해 부수 효과를 최대한 멀리하고 조합성을 강조하는 프로그래밍 패러다임.

- 부수 효과를 멀리하는 이유
    1. 오류를 줄이기 위함.
    2. 조합성 혹은 모듈화 수준을 높이기 위함.

## 1.1 함수형 프로그래밍 그거 먹는건가요?

---

### 1.1.1 함수형 자바스크립트를 검색하면 나오는 예제

함수형 프로그래밍을 처음 접하면 실용성에 대한 의문이 제일 먼저 생길 것이다. *~~이걸 왜 쓰는거지?~~*

함수를 리턴한다거나 괄호가 많은 코드들은 난해하고 생소하게 느껴질 것이다.

그러나 addMaker처럼 함수로 함수를 리턴하는 기법은 좋은 방법이다.

코드 1-1 addMaker

```jsx
function addMaker(a) {
	return function(b) {
		return a + b;
	}
}
addMaker(10)(5);
```

addMaker는 함수를 값으로 다루는 함수다. addMaker에서는 단 하나의 값이 선언되며 그 값은 함수다.

addMaker(10)의 결과가 함수이므로 addMaker(10)(5) 처럼 바로 실행할 수 있다.

코드 1-2 addMaker로 만든 함수

```jsx
var add5 = addMaker(5);
add(3);
add(4);
```

addMaker(5)를 실행하여 add5라 이름을 지었다. 값으로서의 함수, 클로저, 스코프 등을 포함한 코드이다.

코드 1-3 값으로서의 함수

```jsx
var v1 = 100;
var v2 = function () {};
function f1() { return 100; }
function f2() { return function() {}; }
```

v1은 변수에 100을, v2는 변수에 함수를 담고 있고 f1 함수는 100을 리턴하며, f2 함수는 함수를 리턴한다.

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

addMaker가 리턴한 익명 함수는 클로저가 되었고 리턴된 익명 함수 내부에서 a가 정의된 적은 없지만 a를 참조하고 있고 a는 부모 스코프에 있다.

클로저와 스코프는 이후 다룰 예정이다.

## 1.2 함수형 자바스크립트의 실용성

---

절차지향적으로 작성된 코드를 함수형으로 변경하면서 함수형 자바스크립트의 실용성을 알아 보자.

### 1.2.1 회원 목록 중 여러 명 찾기

코드 1-5 for문으로 필터링하기

```jsx
var users = [
  { id: 1, name: "ID", age: 32 },
  { id: 2, name: "HA", age: 25 },
  { id: 3, name: "BJ", age: 32 },
  { id: 4, name: "PJ", age: 28 },
  { id: 5, name: "JE", age: 27 },
  { id: 6, name: "JM", age: 32 },
  { id: 7, name: "HI", age: 24 },
];

// one
var tempUsers = [];
for (var i = 0, len = user.length; i < len; i++) {
  if (users[i].age < 30) tempUsers.push(users[i]);
}
console.log(tempUsers.length); // 4

// two
var ages = [];
for (var i = 0, len = tempUsers.length; i < len; i++) {
  ages.push(tempUsers[i].age);
}
console.log(ages); // [25, 28, 27, 24]

// three
var tempUsers = [];
for (var i = 0, len = users.length; i < len; i++) {
  if (users[i].age >= 30) tempUsers.push(users[i]);
}
console.log(tempUsers.length); // 3

//four
var names = [];
for (var i = 0, len = tempUsers.length; i < len; i++) {
  names.push(tempUsers[i].name);
}
console.log(names); // ["ID", "BJ", "JM"]
```

위 코드를 함수형으로 리팩터링 해보자.

먼저 중복되는 부분을 찾아보면, one과 three의 for 문에서 users를 돌며 특정 조건의 users[i]를 새로운 배열에 담고 있는데, if문의 조건절 부분을 제외하고는 모두 동일한 코드를 가지고 있다.

### 1.2.2 for에서 filter로, if에서 predicate로

코드  1-6 filter

```jsx
function filter(list, predicate) {
  var newList = [];
  for (var i = 0, len = list.length; i < len; i++) {
    if (predicate(list[i])) newList.push(list[i]);
  }
  return newList;
}
```

filter 함수는 인자로 list와 predicate 함수를 받는다. 

루프를 돌며 list의 i번째의 값을 predicate에게 넘겨준다.

predicate 함수는 list.length 만큼 실행되며, predicate 함수의 결과가 참일 때만 newList.push를 실행한다.

newList.push의 실행 여부를 predicate 함수에게 완전 위임한 것이다. 모든 것은 오직 predicate의 결과에만 의존한다.

마지막에는 newList를 리턴한다. 이름에 new를 붙였는데 이는 함수형 프로그래밍 관점에서 굉장히 상징적인 부분이다. 이전 값의 상태를 변경하지 않고 새로운 값을 만드는 식으로 값을 다루는 것은 함수형 프로그래밍의 매우 중요한 콘셉트 중 하나다.

코드 1-7 filter 사용

```jsx
// filter
function filter(list, predicate) {
  var newList = [];
  for (var i = 0, len = list.length; i < len; i++) {
    if (predicate(list[i])) newList.push(list[i]);
  }
  return newList;
}

var usersUnder30 = filter(users, function (user) {
  return user.age < 30;
});
console.log(usersUnder30.length); // 4

var ages = [];
for (var i = 0, len = usersUnder30.length; i < len; i++) {
  ages.push(usersUnder30[i].age);
}
console.log(ages); // [25, 28, 27, 24]

var usersOver30 = filter(users, function (user) {
  return user.age >= 30;
});
console.log(usersOver30.length); // 3

var names = [];
for (var i = 0, len = usersOver30.length; i < len; i++) {
  name.push(usersOver30[i].name);
}
console.log(names); // ["ID", "BJ", "JM"]
```

filter 함수를 실행하면서 predicate 자리에 익명 함수를 정의해서 넘겼다.

첫 번째 익명 함수를 보면 user를 받아, user.age < 30일 때 true를 리턴하고 있다.

총 7번 실행하고 4번은 true, 3번은 false를 리턴한다.

두 번째 filter를 실행한 곳에서도 predicate에 익명 함수를 정의해서 넘겼다. 

filter 함수는 조건부를 대신하여 predicate가 true를 넘겨줄 때만 newList에 user를 담아 리턴한다.

코드1-5와 비교해 코드가 간결해졌고 재사용성이 높은 함수 filter를 하나 얻었다.

### 1.2.3 함수형 프로그래밍 관점으로 filter 보기

함수형 프로그래밍 관점에서 filter와 predicate 사이에는 많은 이야기가 담겨있다.

filter 함수는 한 가지 로직을 가졌다. 동일한 인자가 들어오면 항상 동일하게 동작한다. filter 함수의 로직은 외부나 내부의 어떤 상태 변화에도 의존하지 않는다. newList의 값을 바꾸고 있지만 그 변화에 의존하는 다른 로직이 없다.

list[i]의 값을 변경하거나 list의 개수를 변경하는 코드는 없다.

newList는 이 함수에서 최초로 만들어졌고 외부의 어떠한 상황이나 상태와도 무관하다. newList가 완성될 때까지는 외부에서 어떠한 접근도 할 수 없기 때문에 filter의 결과도 달라질 수 없다. newList가 완성되고 나면 리턴해버려서 filter는 완전히 종료된다.

newList가 외불로 전달되고 나면 newList와 filter와의 연관성도 없어진다.

filter의 if는 predicate의 결과에만 의존한다. 

코드에는 for도 없고 if도 없다. 별도의 로직이 없고 매우 단순하고 쉽다. predicate에서도 값을 변경하지 않으며, true인지 false인지를 filter의 if에 전달하는 일만 한다.

절차지향 프로그래밍에서는 위에서 아래로 내려가면서 특정 변수의 값을 변경해나가는 식으로 로직을 만든다.

객체지향 프로그래밍에서는 객체들을 만들어 놓고 객체들 간의 협업을 통해 로직을 만든다.

**함수형 프로그래밍에서는 '항상 동일하게 동작하는 함수'를 만들고 보조 함수를 조합하는 식으로 로직을 완성한다.**

내부에서 관리하고 있는 상태를 따로 두지 않고 넘겨진 인자에만 의존한다.

동일한 인자가 들어오면 항상 동일한 값을 리턴한다.

보조 함수 역시 인자이며, 보조 함수에서도 상태를 변경하지 않으면 보조 함수를 받은 함수는 항상 동일한 결과를 만드는 함수가 된다.

많은 사람들이 함수형 프로그래밍은 객체지향과 완전한 대척점에 있다고 생각하거나 그런 주장을 하기도 한다.

이는 오해다. 결국에는 함께 동작해야 한다.

현대 프로그래밍에서 다루는 값은 대부분 객체이므로 함수형 프로그래밍에서도 결국 객체를 다뤄야 한다.

**다만 기능 확장을 객체의 확장으로 풀어가느냐 함수 확장으로 풀어가느냐의 차이다.**

### 1.2.4 map 함수

**리팩터링의 핵심은 중복을 제거하고 의도를 드러내는 것이다.**

기존 코드

```jsx
var ages = [];
for(var i = 0, len = usersUnder30.length; i < len; i++){
	ages.push(usersUnder30[i].age);
}
console.log(ages);

var names = [];
for(var i = 0, len = usersOver30.length; i < len; i++){
	names.push(usersOver30[i].name);
}
console.log(names);
```

코드 1-8 map 

```jsx
function map(list, iteratee) {
  var newList = [];
  for (var i = 0, len = list.length; i < len; i++) {
    newList.push(iteratee(list[i]));
  }
  return newList;
}
```

newList에 무엇을 push할지에 대해 iteratee 함수에 위임했다.

코드 1-9 map 사용

```jsx
// filter
function filter(list, predicate) {
  var newList = [];
  for (var i = 0, len = list.length; i < len; i++) {
    if (predicate(list[i])) newList.push(list[i]);
  }
  return newList;
}

// map
function map(list, iteratee) {
  var newList = [];
  for (var i = 0, len = list.length; i < len; i++) {
    newList.push(iteratee(list[i]));
  }
  return newList;
}

var usersUnder30 = filter(users, function (user) {
  return user.age < 30;
});
console.log(usersUnder30.length); // 4

var ages = map(userUnder30, function (user) {
  return user.age;
});
console.log(ages); // [25, 28, 27, 24]

var usersOver30 = filter(users, function (user) {
  return user.age >= 30;
});
console.log(usersOver30.length); // 3

var names = map(usersOver30, function (user) {
  return user.name;
});
console.log(names); // ["ID", "BJ", "JM"]
```

코드가 매우 단순해졌다. for도 없고 if도 없다. 코드의 내용은 아래와 같다.

- 회원 중 나이가 30세 미만인 사람들을 뽑아 usersUnder30에 담는다.
- usersUnder30에 담긴 회원의 나이만 뽑아서 출력한다.
- 회원 중 나이가 30세 이상인 사람들을 뽑아 usersOver30에 담는다.
- usersOver30에 담긴 회원의 이름만 뽑아서 출력한다.

### 1.2.5 실행 결과로 바로 실행하기

**함수의 리턴값을 바로 다른 함수의 인자로 사용하면 변수 할당을 줄일 수 있다.**

코드 1-10 함수 중첩

```jsx
var ages = map(
  filter(users, function (user) {
    return user.age < 30;
  }),
  function (user) {
    return user.age;
  }
);

console.log(ages.length); // 4
console.log(ages); // [25, 28, 27, 24]

var names = map(
  filter(users, function (user) {
    return user.age >= 30;
  }),
  function (user) {
    return user.name;
  }
);

console.log(names.length); // 3
console.log(names); // ["ID", "BJ", "JM"]
```

작은 함수를 하나 더 만들면 변수 할당을 모두 없앨 수 있다.

코드 1-11 함수 중첩2

```jsx
function logLength(value) {
	console.log(value.length);
	return value;
}

console.log(logLength(
	map( filter(users, function(user) { return user.age < 30 }),
	function(user) { return user.age; })));
// 4
// [25, 28, 27, 24]

console.log(logLength(
	map( filter(users, function(user) { return user.age >= 30 }),
	function(user) { return user.name; })));
// 3
// ["ID", "BJ", "JM"] 
```

filter 함수는 predicate를 통해 값을 필터링하여 map에게 전달하고 map은 받은 iteratee를 통해 새로운 값들을 만들어 logLength에게 전달한다. logLength는 length를 출력한 후 받은 인자를 그대로 console.log에 전달한다.

코드 1-12

```jsx
function filter(list, predicate) {
	var newList = [];
	for(var i = 0, len = list.length; i < len; i++) {
		if(predicate(list[i])) newList.push(list[i]);
	}
	return newList;
}

function map(list, iteratee) {
	var newList = [];
	for(var i = 0, len = list.length; i < len; i++){
		newList.push(iteratee(list[i]));
	}
	return newList;
}

function logLength(value){
	console.log(value.length);
	return value;
}

console.log(logLength(
	map(filter(users, function(user) { return user.age < 30 }),
	function(user) { return user.age })));

console.log(logLength(
	map(filter(user, function(user) { return user.age >= 30 }),
	function(user) { return user.name; })));
```

### 1.2.6 함수를 값으로 다룬 예제의 실용성

addMaker와 비슷한 패턴의 함수인 bvalue 함수를 만들면 코드 1-12의 코드를 더 줄일 수 있다.

코드 1-13 함수를 리턴하는 함수 bvalue

```jsx
function addMaker(a) {
  return function (b) {
    return a + b;
  };
}

function bvalue(key) {
  return function (obj) {
    return obj[key];
  };
}

bvalue("a")({ a: "hi", b: "hello" }); // hi
```

bvalue를 실행할 때 넘겨준 인자 key를 나중에 obj를 받을 익명 함수가 기억한다. - 클로저가 된다.

bvalue의 실행 결과는 key를 기억하는 함수이고 이 함수에는 key/value 쌍으로 구성된 객체를 인자로 넘길 수 있다.

코드 1-14 bvalue로 map의 iteratee 만들기

```jsx
function logLength(value){
	console.log(value.length);
	return value;
}

console.log(logLength(
	map(filter(users, function(user) { return user.age < 30 }),
	bvalue('age'))));

console.log(logLength(
	map(filter(users, function(user) { return user.age >= 30 }),
	bvalue('name'))));
```

map이 사용할 iteratee 함수를 bvalue가 리턴한 함수로 대체했다. 익명 함수 선언이 사라져 코드가 더욱 짧아졌다.

생각보다 실용적이지 않은가? 앞으로는 함수를 리턴하는 함수나 아주 작은 단위의 함수들이 매우실용적으로 사용되는 사례들을 자주 만나게 될 것이다.

코드1-15는 ES6의 화살표 함수를 활용한 경우다.

코드 1-15 화살표 함수와 함께

```jsx
// ES6
const logLength = value => {
	console.log(value);
	return value;
}

console.log(logLength(
	map(filter(users, u => u.age < 30), u => u.age)));
console.log(logLength(
	map(filter(users, u => u.age >= 30), u => u.name)));

// 아래 코드도 괜찮다.
var under30 = u => u.age < 30;
var over30 = u => u.age >= 30;

console.log(logLength(map(filter(users, under30), u => u.age)));
console.log(logLength(map(filter(users, over30), u => u.name)));

// 아래 코드 또한 괜찮다.
var ages = list => map(list, v => v.age);
var names = list => map(list, v => v.name);

console.log(logLength(ages(filter(users, under30))));
console.log(logLength(names(filter(users, over30))));

// 마지막으로 수정해보자.
function bvalue(key) {
	return function(list) {
		return map(list, function(v) { return v[key]; });
	}
}
var ages = bvalue('age');
var names = bvalue('name');
var under30 = function(u) { return u.age < 30; };
var over30 = function(u) { return u.age >= 30; };

console.log(logLength(ages(filter(users, under30))));
console.log(logLength(names(filter(users, over30))));

// bvalues는 이렇게 할 수 있다. - 라스트
function bvalue(key) {
	var value = bvalue(key);
	return function(list) { return map(list, value); }
}
```

## 1.3 함수형 자바스크립트의 실용성 2

### 1.3.1 회원 목록 중 한 명 찾기

회원 목록 중 특정 조건을 가진 회원 한 명을 찾고 싶다.

코드 1-16 filter로 한 명 찾기

```jsx
var users = [
	{ id: 1, name: "ID", age: 32 },
	{ id: 2, name: "HA", age: 25 },
	{ id: 3, name: "BJ", age: 32 },
	{ id: 4, name: "PJ", age: 28 },
	{ id: 5, name: "JE", age: 27 },
	{ id: 6, name: "JM", age: 32 },
	{ id: 7, name: "HI", age: 24 },
];

console.log(filter(users, function(user) { return user.id == 3 })[0]);
// { id: 3, name: "BJ", age: 32 }
```

filter를 통해 걸러낸 후 [0]으로 user를 얻어냈고 원하는 결과가 나왔다.

하지만 list.length 만큼 predicate가 실행되기에 효율적이지 못하고, 동일 조건에 값이 두 개 이상이라면 두 개 이상의 값을 찾는다.

코드 1-17 break

```jsx
var user;
for(var i = 0, len = users.length; i < len; i++){
	if(users[i].id === 3) {
		user = users[i];
		break;
	}
}
console.log(user); // { id: 3, name: "BJ", age: 32 }
```

오히려 위 코드가 더 효율적일 것이다.

원하는 user를 찾은 후 break로 for문을 빠져나왔다. 

하지만 위 코드는 재사용이 불가능하다.

코드 1-18 findById

```jsx
function findById(list, id) {
	for(var i = 0, len = list.length; i < len; i++){
		if(list[i].id === id) return list[i];
	}
}
console.log(findById(users, 3)); // { id: 3, name: "BJ", age: 32 }
console.log(findById(users, 5)); // { id: 5, name: "JE", age: 27 }
```

재사용이 가능하도록 구현되었다.

findById는 list와 id를 받아 루프를 돌다가 id가 동일한 객체를 만나면 그 값을 리턴한다. 못찾는다면 undefinded가 리턴된다.

코드 1-19 findByName

```jsx
function findByName(list, name) {
	for(var i = 0, len = list.length; i < len; i++){
		if(list[i].name === name) return list[i];
	}
}
console.log(findByName(users, "BJ") ); // { id: 3, name: "BJ", age: 32 }
console.log(findByName(users, "JE") ); // { id: 5, name: "JE", age: 27 }
```

이름으로 찾는 함수다.

코드 1-20 findByAge

```jsx
function findByAge(list, age) {
	for(var i = 0, len = list.length; i < len; i++){
		if(list[i].age === age) return list[i];
	}
}
console.log(findByAge(users, 28) ); // { id: 3, name: "BJ", age: 32 }
console.log(findByAge(users, 25) ); // { id: 5, name: "JE", age: 27 }
```

나이로 찾는 함수다.

위와 같은 방식은 그동안 많이 사용해 온 방식이다.

for와 if 등의 로직이 숨겨졌고 깔끔해졌지만 아직 아쉬움이 있다. 중복이 있기 때문이다.

이 함수들은 함수형적이지 않다.

코드 1-21 findById

```jsx
function findBy(key, list, val) {
	for(var i = 0, len = list.length; i < len; i++){
		if(list[i][key] === val) return list[i];
	}
}

console.log(findBy('name', users, 'BJ')); // { id: 3, name: "BJ", age: 32 }
console.log(findBy('id', users, 2)); // { id: 2, name: "HA", age: 25 }
console.log(findBy('age', users, 28)); // { id: 4, name: "PJ", age: 28 }
```

인자를 하나 더 늘려서 중복을 제거했다.

코드의 길이도 1/3으로 줄어들었다. 아니 정확히 말하면 앞으로의 코드도 줄였다.

findBy 함수는 users, posts, comments, products 등 key로 value를 얻을 수 있는 객체들을 가진 배열이라면 무엇이든 받을 수 있다. 객체의 key 값이 무엇이든지간에 찾아줄 수 있으므로 훨씬 많은 경우를 대응할 수 있는 함수가 되었다.

좋아지긴 했지만 아직 다음과 같은 상황을 지원하지 못하는 아쉬움이 있다.

- key가 아닌 메서드를 통해 값을 얻어야 할 때
- 두 가지 이상의 조건이 필요할 때
- ===이 아닌 다른 조건으로 찾고자 할 때

다음 예제는 user 객체가 메서드로 값을 얻어야 하는 객체일 경우에 발생하는 난감한 상황을 보여준다.

코드 1-22 findBy로 안 되는 경우

```jsx
function User(id, name, age) {
	this.getId = function() {
		return id;
	};
	this.getName = function() {
		return name;
	}
	this.getAge = function() {
		return age;
	}
}

var user2 = [
	new User(1, "ID", 32),
	new User(2, "HA", 25),
	new User(3, "BJ", 32),
	new User(4, "PJ", 28),
	new User(5, "JE", 27),
	new User(6, "JM", 32),
	new User(7, "HI", 24),
];

function findBy(key, list, val) {
	for(var i = 0, len = list.length; i < len; i++){
		if(list[i][key] === val) return list[i];
	}
}

console.log(findBy('age',user2,25)); // undefined
```

코드 1-22를 보면 user의 나이를 .getAge()로 얻어내야 하기 때문에 findBy 함수로는 위 상황을 대응할 수 없음을 알 수 있다. 이름에 'P'가 포함된 user를 찾고 싶다거나 나이가 32이면서 이름이 'JM'인 user를 찾고 싶다거나 하는 것도 불가능하다. 나이가 30세 미만인 사람을 찾는 것도 findBy로는 할 수 없다. 이번엔 보다 함수적인 프로그래밍을 해 보자.

### 1.3.2 값에서 함수로

앞서 만들었던 filter나 map 처럼, **인자로 키와 값 대신 함수를 사용해보자.**

코드 1-23 find

```jsx
function find(list, predicate) {
	for(var i = 0, len = list.length; i < len; i++){
		if(predicate(list[i])) return list[i];
	}
}

console.log( find(user2, function(u) { return u.getAge() == 25; }).getName() );
// HA
console.log( find(users, function(u) { return u.name.indexOf('P') !== -1; } ));
// { id: 4, name: "PJ", age: 28 }
console.log( find(users, function(u) { return u.age === 32 && u.name == "JM"; } ));
// { id: 6, name: "JM", age: 32 }
console.log( find(users2, function(u) { return u.getAge() < 30; }).getName() );
// HA
```

find의 인자로 값(key와 val) 대신 함수(predicate)를 받았다. 덕분에 if 안쪽에서 할 수 있는 일이 정말 많아졌다.

getAge 같은 메서드 실행을 통해 값을 비교하기도, indexOf 같은 메서드를 통해 이름에 'P'가 포함되었는지를 알아내기도 했다. 두 가지 조건을 모두 만족하는지를 보기도 했다. 연산자 역시 마음대로 사용 가능하다.

함수형 자바스크립트는 다형성이 높은 기법을 많이 사용하며 이러한 기법은 정말 실용적이다.

- 다형성 : 여러 가지 형태를 가질 수 있는 능력

객체지향 프로그래밍이 약속된 이름의 메서드를 대신 실행해주는 식으로 외부 객체에게 위임을 한다면

**함수형 프로그래밍은 보조 함수를 통해 완전히 위임하는 방식을 취한다.**

이는 더 높은 다형성과 안정성을 보장한다.

다음은 각 데이터에 맞는 보조 함수로 대응하는 사례이다.

코드 1-24 다형성

```jsx
// 코드 1-16에서 선언한 users
console.log(
	map(
		filter(users, function(u) { return u.age >= 30 }),
		function(u) { return u.name ; }));
// ["ID", "BJ", "JM"];

// 코드 1-22에서 선언한 users2로 교체
console.log(map(
	filter(user2, function(u) { return u.getAge() > 30 }), // 메서드 실행으로 변경
	function(u) { return u.getName(); })); // 메서드 실행으로 변경
// ["ID", "BJ", "JM"];
```

### 1.3.3 함수를 만드는 함수와 find, filter 조합하기

함수로 함수를 만들어 find 함수와 함께 사용하면 코드를 더욱 간결하게 만들 수 있다.

코드 1-25 bmatch1로 predicate 만들기

```jsx
function bmatch1(key, val) {
	return function(obj) {
		return obj[key] === val;
	}
}

console.log(find(users, bmatch1('id', 1)) ); // { id: 1, name: "ID", age: 32 }
console.log(find(users, bmatch1('name', 'HI')) ); // { id: 7, name: "HI", age: 24 }
console.log(find(users, bmatch1('age', 27)) ); // { id: 5, name: "JE", age: 27 }
```

bmatch1의 실행 결과는 함수다.

key와 val을 미리 받아서 나중에 들어올 obj와 비교하는 익명 함수를 클로저로 만들어 리턴한다.

bmatch1을 통해 id, name, age를 비교하는 predicate 3개를 만들어 find에게 넘겼다.

bmatch1은 인자와 결과만으로 협업하기 때문에 여기저기 붙이기 쉽다.

코드 1-26 bmatch1로 함수를 만들어 고차 함수와 협업하기

```jsx
console.log(filter(users, bmatch1('age', 32)) );
// [{ id: 1, name: "ID", age: 32 },
//  { id: 3, name: "BJ", age: 32 },
//  { id: 6, name: "JM", age: 32 }]

console.log(map(users, bmatch1('age', 32)) );
// [true, false, true, false, false, true, false]
```

bmatch1은 하나의 key에 대한 value만 비교할 수 있다.

코드 1-27 bmatch

```jsx
function object(key, val) {
	var obj = {};
	obj[key] = val;
	return obj;
}

function match(obj, obj2) {
	for(var key in obj2) {
		if(obj[key] !== obj2[key]) return false;
	}
	return true;
}

function bmatch(obj2, val) {
	if(arguments.length === 2) obj2 = object(obj2, val);
	return function(obj) {
		return match(obj, obj2);
	}
}

console.log(match(find(users, bmatch('id', 3)), find(users, bmatch('name', 'BJ'))));
// true
console.log(find(users, function(u) { return u.age === 32 && u.name === 'JM' }));
// { id: 6, name: "JM", age: 32 }
console.log(find(users, bmatch({ name: 'JM', age: 32 })));
// { id: 6, name: "JM", age: 32 }

```

이제는 ( key, val )와 ({ key: val }) 두 가지 방식으로 사용할 수 있다. 

({ key: val }) 방식을 사용하면 두 가지 이상의 값이 모두 동일한지도 확인할 수 있다.

처럼 작은 기능을 하는 함수로 쪼개거나 재조합하는 식으로 발전시키는 것도 좋은 방법이다.

코드 1-28 findIndex

```jsx
function findIndex(list, predicate) {
	for(var i = 0, len = list.length; i < len; i++){
		if(predicate(list[i])) return i;
	}
	return -1;
}

console.log(findIndex(users, bmatch({name: 'JM', age: 32}))); // 5
console.log(findIndex(users, bmatch({age: 36}))); // -1
```

find → findIndex

Array.prototype.indexOf 보다 활용도가 훨씬 높은 findIndex.

- indexOf() 메서드는 배열에서 지정된 요소를 찾을 수 있는 첫 번째 인덱스를 반환하고 존재하지 않으면 -1을 반환합니다.

    Array.prototype.indexOf()

    ```jsx
    // MDN Web Docs
    const beasts = ['ant', 'bison', 'camel', 'duck', 'bison'];

    console.log(beasts.indexOf('bison'));
    // expected output: 1

    // start from index 2
    console.log(beasts.indexOf('bison', 2));
    // expected output: 4

    console.log(beasts.indexOf('giraffe'));
    // expected output: -1
    ```

- 문자열은 String.prototype.indexOf()

### 1.3.4 고차함수

**고차함수란?**

- 함수를 인자로 받거나 함수를 리턴하는 함수
- 둘 다 하는 경우도 고차 함수

보통 고차 함수는 인자로 받아 필요한 때에 실행하거나 클로저를 만들어 리턴한다.

앞서 구현했던 map, filter, find, findIndex, bvalue, bmatch 같은 함수들은 모두 고차 함수다.

위 함수들은 Underscore.js에도 있는 함수들이다. (Underscore.js는 유명한 함수형 자바스크립트 라이브러리)

Underscore.js의 _.map, _.filter, _.find, _.findIndex는 iteratee와 predicate가 사용할 인자를 몇 가지 더 제공한다. 재료가 많으면 더 다양한 로직을 만들 수 있다.

앞서 구현한 함수들을 Underscore.js에 가깝게 고쳐보자.

코드 1-29 인자 늘리기

```jsx
_.map = function(list, iteratee) {
	var newList = [];
	for(var i = 0, len = list.length; i < len; i++) {
		newList.push(iteratee(list[i], i, list));
	}
	return newList;
};

_.filter = function(list, predicate) {
	var newList = [];
	for(var i = 0, len = list.length; i < len; i++) {
		if(predicate(list[i], i, list)) newList.push(list[i]);
	}
	return newList;
};

_.find = function(list, predicate) {
	for(var i = 0, len = list.length; i < len; i++) {
		if(predicate(list[i], i, list)) return list[i];
	}
}

_.findIndex = function(list, predicate) {
	for(var i = 0, len = list.length; i < len; i++) {
		if(predicate(list[i], i, list)) return i;
	}
	return -1;
}
```

원래는 한 개의 인자를 넘겼지만, 이제는 여러 개의 인자를 넘긴다.

이제 iteratee와 predicate 함수가 받는 인자가 많아져 좀 더 다양한 일을 할 수 있게 되었다.

코드 1-30 predicate에서 두 번째 인자 사용하기

```jsx
console.log(_.filter([1,2,3,4], function(val, idx) {
	return idx > 1;
})); // [3, 4]

console.log(_.filter([1,2,3,4], function(val, idx) {
	return idx % 2 == 0;
})); // [1, 3]
```

idx는 몇 번째 인자인지를 나타내는 index이다. 즉 list[1] 초과, 짝수번째 인수를 뽑아낸 것이다.

### 1.3.5 function identity(v) { return v; }, 이건 어디다 쓰는거지?

정말 쓸모 없어 보이는 이상함 함수를 하나 소개한다.

코드 1-31 _.identity

```jsx
_.identity = function(v) { return v; };
var a = 10;
console.log(_.identity(a)); // 10
```

함수를 정의하고 실행해 보았다. 받은 인자를 그냥 그대로 뱉는 함수다.

이미 뭔지 알고 있는데 왜 _.identity 같은 함수가 존재하고, 이 함수를 언제 사용해야 하는 것일까?

코드 1-32 predicate로 _.identity를 사용한 경우

```jsx
console.log(_.filter([true, 0, 10, 'a', false, null], _.identity)); // [true, 10, 'a']
```

_.filter를 _.indentity와 함께 사용했더니 Truthy Values만 남았다.

_indentity는 다른 고차 함수와 조합하면 아주 유용한 함수들을 만들 수 있다.

- Truthy Values : Boolean으로 평가했을 때 true.
- Falsy Values : Boolean으로 평가했을 때 false.

    ```jsx
    _.truthy = function(v) { return !!v; };
    _.falsy = function(v) { return !v; };
    ```

코드 1-33 some, every 만들기 1

```jsx
_.some = function(list) {
	return !!_.find(list, _.identity);
};

_.every = function(list) {
	return _.filter(list, _.identity).length == list.length;
};

console.log(_.some([0, null, 2])); // true
console.log(_.some([0, null, false])); // false

console.log(_.every([0, null, 2])); // false
console.log(_.every([{}, true, 2])); // true
```

_.some은 배열에 들어가 있는 값 중 하나라도 긍정적인 값이 있으면 true, 하나도 없다면 false를 리턴한다.

_.every는 모두 긍정적인 값이면 true, 아니면 false를 리턴한다.

그런데 코드 1-33의 _.every는 좀 아쉬운 점이 있다. filter를 사용했기 때문에 항상 루프를 끝까지 돌기 때문이다. 이때 쓸모없어 보이는 함수 두 개를 더 만들면 로직을 개선할 수 있다.

### 1.3.6 연산자 대신 함수로

코드 1-34 아주 작은 함수 not, beq

```jsx
function not(v) { return !v; }
function beq(a) {
	return function(b) {
		return a === b;
	}
}
```

쓸모없어 보이는 두 개의 함수는 not과 beq이다.

왜 굳이 not이나 beq를 쓸까? !를 쓰면 되고, ===로 비교하면 되는데 왜?

코드 1-35 some, every 만들기2

```jsx
_.some = function(list) {
	return !!_.find(list, _.identity);
};

_.every = function(list) {
	return beq(-1)(_.findIndex(list, not));
};

console.log(_.some([0, null, 2])); // true;
console.log(_.some([0, null, false])); // false;

console.log(_.every([0, null, 2])); // false;
console.log(_.every([{}, true, 2])); // true;
```

다시 코드를 살펴보자.

not은 연산자 !가 아닌 함수이기 때문에 _.findIndex와 함께 사용할 수 있다. list의 값 중 하나라도 부정적인 값을 만나면 predicate가 not이므로 true를 리턴하여 해당 번째 i값을 리턴하게 된다. 중간에 부정적인 값을 한 번이라도 만나면 루프가 중단된다. 만일 부정적인 값이 하나도 없다면 -1을 리턴한다. -1이 나왔다면, beq(-1)이 리턴한 함수에게 인자로 넣어 true가 나올 것이고, 이것은 _.every의 리턴값이 된다. findIndex로 부정적인 값을 하나도 찾지 못했다는 얘기는 결국 모두 긍정적인 값이라는 얘기가 된다.

_every는 not 함수 덕분에 로직이 개선되었다. 이제 함수를 더 쪼개서 함수가 최대한 한 가지 일만 하게끔 만들어보자.

코드 1-36 함수 쪼개기

```jsx
function positive(list) {
	return _.find(list, _.identity);
}

function negativeIndex(list) {
	return _.findIndex(list, not);
}

_.some = function(list) {
	return not(not(positive(list)));
};

_.every = function(list) {
	return beq(-1)(negativeIndex(list));
};

console.log(_.some([0, null, 2])); // true
console.log(_.some([0, null, false])); // false
console.log(_.every([0, null, 2])); // false
console.log(_.every([{}, true, 2])); // true
```

일단 좀 더 깔끔해졌다. positive와 negativeIndex라는 재사용 가능한 함수도 얻었다.

### 1.3.7 함수 합성

**함수를 쪼갤수록 함수 합성은 쉬워진다.**

Underscore.js의 _.compose 함수를 사용해볼 것이다.

_.compose는 오른쪽의 함수의 결과를 바로 왼쪽의 함수에게 전달하는 고차 함수이다.

코드 1-37 _.compose

```jsx
//Underscore.js 중
_.compose = function() {
	var args = arguments;
	var start = args.length -1;
	return function() {
		var i = start;
		var result = args[start].apply(this, arguments);

		while(i--) result = args[i].call(this, result);

		return result;
	};
};

var greet = function(name) { return `hi: ${name}`; };
var exclaim = function(statement) { return `${statement.toUpperCase()}!`; };
var welcome = _.compose(greet, exclaim);
welcome("moe"); // 'hi: MOE!'
```

welcome을 실행하면 먼저 exclaim을 실행하면서 "moe"를 인자로 넘겨준다. exclaim의 결과는 대문자로 변환된 "MOE!"이고, 그 결과는 다시 greet의 인자로 넘어가 최종 결과로 "hi: MOE!"를 리턴한다.

원래 코드

```jsx
_.some = function(list) {
	return not(not(positive(list)));
};

_.every = function(list) {
	return beq(-1)(negativeIndex(list));
};
```

코드 1-38 _.compose로 함수 합성하기

```jsx
_.some = _.compose(not, not, positive);
_.every = _.compose(beq(-1), negativeIndex);
```

이번엔 _.some과 _.every를 간결하게 표현했다. 원래 코드와 동일하게 동작한다.

오른쪽에서부터 왼쪽으로 연속적으로 실행되어 결과를 만들어낸다.

값 대신 함수로, for와 if 대신 고차 함수와 보조 함수로, 연산자 대신 함수로, 함수 합성 등 앞서 설명한 함수적 기법들을 사용하면 **코드도 간결해지고 함수명을 통해 로직을 더 명확히 전달할 수 있어 좋은 코드가 된다.**

짧고 읽기 좋은 코드도 중요한 가치이지만 좀 더 고상한 이점이 있다. **인자 선언이나 변수 선언이 적어진다는 점이다.** 코드에 인자와 변수가 등장하지 않고 함수의 내부({statements})가 보이지 않는다는 것은 **새로운 상황도 생기지 않는다는 말이다.**

새로운 상황이 생기지 않는다는 것은 **개발자가 예측하지 못할 상황이 없다는 말이다.** 에러 없는 함수들이 인자와 결과에 맞게 잘 조합되어 있다면 전체의 결과 역시 에러가 날 수 없다. 상태를 공유하지 않는 작은 단위의 함수들은 테스트하기도 쉽고 테스트 케이스를 작성하기도 쉽다.

인자와 변수 자체가 적을 수록, 함수의 {statements}가 없거나 짧을수록, 함수들의 복잡성도 줄어들고 오류 발생 가능성도 줄어들며 부수 효과도 줄어든다.

코드를 수정해야 하는 상황에, 자신이 고쳐야 하는 함수의 문제에만 집중할 수 있게 되는 것이다.

또한 작성한지 오래된 코드일지라도 다시 읽고 고치기가 쉬워진다.

함수 하나하나가 무슨 일을 하는지에 대해 인자와 결과 위주로만 생각하면서 읽고 고칠 수 있게 되는 것이다.

**작게 쪼개다 보면 정말 쓸모 없어 보이는 함수가 많이 나오기도 한다. 그래도 더 작은 단위로 쪼개 보라. 재사용성이 높고 재밌는 코드들이 나올 것이다. 제어문 대신 함수를, 값 대신 함수를, 연산자 대신 함수를 사용해 보자. 프로그래밍에 대한 새롭고 재밌는 아이디어들을 만나게 될 것이다.**

<sub id="2020-03-03"><sup>-- 2020-03-03 --</sup></sub>