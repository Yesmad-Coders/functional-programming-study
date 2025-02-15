## 1.2 함수형 자바스크립트의 실용성

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

먼저 중복되는 부분을 찾아보면, `one`과 `three`의 `for`문에서 `users`를 돌며 특정 조건의 `users[i]`를 새로운 배열에 담고 있는데, `if`문의 조건절 부분을 제외하고는 모두 동일한 코드를 가지고 있다.

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

`filter` 함수는 인자로 `list`와 `predicate` 함수를 받는다. 

루프를 돌며 `list`의 `i`번째의 값을 `predicate`에게 넘겨준다.

`predicate` 함수는 `list.length` 만큼 실행되며, `predicate` 함수의 결과가 참일 때만 `newList.push`를 실행한다.

`newList.push`의 실행 여부를 `predicate` 함수에게 완전 위임한 것이다. 모든 것은 오직 `predicate`의 결과에만 의존한다.

마지막에는 `newList`를 리턴한다. 이름에 `new`를 붙였는데 이는 함수형 프로그래밍 관점에서 굉장히 상징적인 부분이다. 이전 값의 상태를 변경하지 않고 새로운 값을 만드는 식으로 값을 다루는 것은 함수형 프로그래밍의 매우 중요한 콘셉트 중 하나다.

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

`filter` 함수를 실행하면서 `predicate` 자리에 익명 함수를 정의해서 넘겼다.

첫 번째 익명 함수를 보면 `user`를 받아, `user.age < 30`일 때 `true`를 리턴하고 있다.

총 7번 실행하고 4번은 `true`, 3번은 `false`를 리턴한다.

두 번째 `filter`를 실행한 곳에서도 `predicate`에 익명 함수를 정의해서 넘겼다. 

`filter` 함수는 조건부를 대신하여 `predicate`가 `true`를 넘겨줄 때만 `newList`에 `user`를 담아 리턴한다.

코드1-5와 비교해 코드가 간결해졌고 재사용성이 높은 함수 `filter`를 하나 얻었다.

### 1.2.3 함수형 프로그래밍 관점으로 filter 보기

함수형 프로그래밍 관점에서 `filter`와 `predicate` 사이에는 많은 이야기가 담겨있다.

`filter` 함수는 한 가지 로직을 가졌다. 동일한 인자가 들어오면 항상 동일하게 동작한다. `filter` 함수의 로직은 외부나 내부의 어떤 상태 변화에도 의존하지 않는다. `newList`의 값을 바꾸고 있지만 그 변화에 의존하는 다른 로직이 없다.

`list[i]`의 값을 변경하거나 `list`의 개수를 변경하는 코드는 없다.

`newList`는 이 함수에서 최초로 만들어졌고 외부의 어떠한 상황이나 상태와도 무관하다. `newList`가 완성될 때까지는 외부에서 어떠한 접근도 할 수 없기 때문에 `filter`의 결과도 달라질 수 없다. `newList`가 완성되고 나면 리턴해버려서 `filter`는 완전히 종료된다.

`newList`가 외불로 전달되고 나면 `newList`와 `filter`와의 연관성도 없어진다.

`filter`의 `if`는 `predicate`의 결과에만 의존한다. 

코드에는 `for`도 없고 `if`도 없다. 별도의 로직이 없고 매우 단순하고 쉽다. `predicate`에서도 값을 변경하지 않으며, `true`인지 `false`인지를 `filter`의 `if`에 전달하는 일만 한다.

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

코드가 매우 단순해졌다. `for`도 없고 `if`도 없다. 코드의 내용은 아래와 같다.

- 회원 중 나이가 30세 미만인 사람들을 뽑아 `usersUnder30`에 담는다.
- `usersUnder30`에 담긴 회원의 나이만 뽑아서 출력한다.
- 회원 중 나이가 30세 이상인 사람들을 뽑아 `usersOver30`에 담는다.
- `usersOver30`에 담긴 회원의 이름만 뽑아서 출력한다.

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

`filter` 함수는 `predicate`를 통해 값을 필터링하여 `map`에게 전달하고 `map`은 받은 `iteratee`를 통해 새로운 값들을 만들어 `logLength`에게 전달한다. `logLength`는 `length`를 출력한 후 받은 인자를 그대로 `console.log`에 전달한다.

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

`addMaker`와 비슷한 패턴의 함수인 `bvalue` 함수를 만들면 코드 1-12의 코드를 더 줄일 수 있다.

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

`bvalue`를 실행할 때 넘겨준 인자 `key`를 나중에 `obj`를 받을 익명 함수가 기억한다. - 클로저가 된다.

`bvalue`의 실행 결과는 `key`를 기억하는 함수이고 이 함수에는 `key`/`value` 쌍으로 구성된 객체를 인자로 넘길 수 있다.

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

`map`이 사용할 `iteratee` 함수를 `bvalue`가 리턴한 함수로 대체했다. 익명 함수 선언이 사라져 코드가 더욱 짧아졌다.

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