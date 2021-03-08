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

`filter`를 통해 걸러낸 후 `[0]`으로 `user`를 얻어냈고 원하는 결과가 나왔다.

하지만 `list.length` 만큼 `predicate`가 실행되기에 효율적이지 못하고, 동일 조건에 값이 두 개 이상이라면 두 개 이상의 값을 찾는다.

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

원하는 `user`를 찾은 후 `break`로 `for`문을 빠져나왔다. 

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

`findById`는 `list`와 `id`를 받아 루프를 돌다가 `id`가 동일한 객체를 만나면 그 값을 리턴한다. 못찾는다면 `undefinded`가 리턴된다.

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

`for`와 `if` 등의 로직이 숨겨졌고 깔끔해졌지만 아직 아쉬움이 있다. 중복이 있기 때문이다.

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

`findBy` 함수는 `users`, `posts`, `comments`, `products` 등 `key`로 `value`를 얻을 수 있는 객체들을 가진 배열이라면 무엇이든 받을 수 있다. 객체의 `key` 값이 무엇이든지간에 찾아줄 수 있으므로 훨씬 많은 경우를 대응할 수 있는 함수가 되었다.

좋아지긴 했지만 아직 다음과 같은 상황을 지원하지 못하는 아쉬움이 있다.

- `key`가 아닌 메서드를 통해 값을 얻어야 할 때
- 두 가지 이상의 조건이 필요할 때
- `===`이 아닌 다른 조건으로 찾고자 할 때

다음 예제는 `user` 객체가 메서드로 값을 얻어야 하는 객체일 경우에 발생하는 난감한 상황을 보여준다.

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

코드 1-22를 보면 `user`의 나이를 `.getAge()`로 얻어내야 하기 때문에 `findBy` 함수로는 위 상황을 대응할 수 없음을 알 수 있다. 이름에 'P'가 포함된 `user`를 찾고 싶다거나 나이가 32이면서 이름이 'JM'인 `user`를 찾고 싶다거나 하는 것도 불가능하다. 나이가 30세 미만인 사람을 찾는 것도 `findBy`로는 할 수 없다. 이번엔 보다 함수적인 프로그래밍을 해 보자.

### 1.3.2 값에서 함수로

앞서 만들었던 `filter`나 `map` 처럼, **인자로 키와 값 대신 함수를 사용해보자.**

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

`find`의 인자로 값(`key`와 `val`) 대신 함수(`predicate`)를 받았다. 덕분에 `if` 안쪽에서 할 수 있는 일이 정말 많아졌다.

`getAge` 같은 메서드 실행을 통해 값을 비교하기도, `indexOf` 같은 메서드를 통해 이름에 'P'가 포함되었는지를 알아내기도 했다. 두 가지 조건을 모두 만족하는지를 보기도 했다. 연산자 역시 마음대로 사용 가능하다.

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

함수로 함수를 만들어 `find` 함수와 함께 사용하면 코드를 더욱 간결하게 만들 수 있다.

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

`bmatch1`의 실행 결과는 함수다.

`key`와 `val`을 미리 받아서 나중에 들어올 obj와 비교하는 익명 함수를 클로저로 만들어 리턴한다.

`bmatch1`을 통해 `id`, `name`, `age`를 비교하는 `predicate` 3개를 만들어 `find`에게 넘겼다.

`bmatch1`은 인자와 결과만으로 협업하기 때문에 여기저기 붙이기 쉽다.

코드 1-26 bmatch1로 함수를 만들어 고차 함수와 협업하기

```jsx
console.log(filter(users, bmatch1('age', 32)) );
// [{ id: 1, name: "ID", age: 32 },
//  { id: 3, name: "BJ", age: 32 },
//  { id: 6, name: "JM", age: 32 }]

console.log(map(users, bmatch1('age', 32)) );
// [true, false, true, false, false, true, false]
```

`bmatch1`은 하나의 `key`에 대한 `value`만 비교할 수 있다.

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

이제는 ( `key`, `val` )와 (`{ key: val }`) 두 가지 방식으로 사용할 수 있다. 

(`{ key: val }`) 방식을 사용하면 두 가지 이상의 값이 모두 동일한지도 확인할 수 있다.

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

`find` → `findIndex`

`Array.prototype.indexOf` 보다 활용도가 훨씬 높은 `findIndex`.

- `indexOf()` 메서드는 배열에서 지정된 요소를 찾을 수 있는 첫 번째 인덱스를 반환하고 존재하지 않으면 `-1`을 반환합니다.

    `Array.prototype.indexOf()`

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

- 문자열은 `String.prototype.indexOf()`

### 1.3.4 고차함수

**고차함수란?**

- 함수를 인자로 받거나 함수를 리턴하는 함수
- 둘 다 하는 경우도 고차 함수

보통 고차 함수는 인자로 받아 필요한 때에 실행하거나 클로저를 만들어 리턴한다.

앞서 구현했던 `map`, `filter`, `find`, `findIndex`, `bvalue`, `bmatch` 같은 함수들은 모두 고차 함수다.

위 함수들은 `Underscore.js`에도 있는 함수들이다. (`Underscore.js`는 유명한 함수형 자바스크립트 라이브러리)

`Underscore.js`의 `_.map`, `_.filter`, `_.find`, `_.findIndex`는 `iteratee`와 `predicate`가 사용할 인자를 몇 가지 더 제공한다. 재료가 많으면 더 다양한 로직을 만들 수 있다.

앞서 구현한 함수들을 `Underscore.js`에 가깝게 고쳐보자.

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

이제 `iteratee`와 `predicate` 함수가 받는 인자가 많아져 좀 더 다양한 일을 할 수 있게 되었다.

코드 1-30 predicate에서 두 번째 인자 사용하기

```jsx
console.log(_.filter([1,2,3,4], function(val, idx) {
	return idx > 1;
})); // [3, 4]

console.log(_.filter([1,2,3,4], function(val, idx) {
	return idx % 2 == 0;
})); // [1, 3]
```

`idx`는 몇 번째 인자인지를 나타내는 `index`이다. 즉 `list[1]` 초과, 짝수번째 인수를 뽑아낸 것이다.

### 1.3.5 function identity(v) { return v; }, 이건 어디다 쓰는거지?

정말 쓸모 없어 보이는 이상함 함수를 하나 소개한다.

코드 1-31 _.identity

```jsx
_.identity = function(v) { return v; };
var a = 10;
console.log(_.identity(a)); // 10
```

함수를 정의하고 실행해 보았다. 받은 인자를 그냥 그대로 뱉는 함수다.

이미 뭔지 알고 있는데 왜 `_.identity` 같은 함수가 존재하고, 이 함수를 언제 사용해야 하는 것일까?

코드 1-32 predicate로 _.identity를 사용한 경우

```jsx
console.log(_.filter([true, 0, 10, 'a', false, null], _.identity)); // [true, 10, 'a']
```

`_.filter`를 `_.indentity`와 함께 사용했더니 `Truthy Values`만 남았다.

`_.identity`는 다른 고차 함수와 조합하면 아주 유용한 함수들을 만들 수 있다.

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

`_.some`은 배열에 들어가 있는 값 중 하나라도 긍정적인 값이 있으면 `true`, 하나도 없다면 `false`를 리턴한다.

`_.every`는 모두 긍정적인 값이면 `true`, 아니면 `false`를 리턴한다.

그런데 코드 1-33의 `_.every`는 좀 아쉬운 점이 있다. `filter`를 사용했기 때문에 항상 루프를 끝까지 돌기 때문이다. 이때 쓸모없어 보이는 함수 두 개를 더 만들면 로직을 개선할 수 있다.

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

왜 굳이 `not`이나 `beq`를 쓸까? `!`를 쓰면 되고, `===`로 비교하면 되는데 왜?

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

`not`은 연산자 `!`가 아닌 함수이기 때문에 `_.findIndex`와 함께 사용할 수 있다. `list`의 값 중 하나라도 부정적인 값을 만나면 `predicate`가 `not`이므로 `true`를 리턴하여 해당 번째 `i`값을 리턴하게 된다. 중간에 부정적인 값을 한 번이라도 만나면 루프가 중단된다. 만일 부정적인 값이 하나도 없다면 `-1`을 리턴한다. `-1`이 나왔다면, `beq(-1)`이 리턴한 함수에게 인자로 넣어 `true`가 나올 것이고, 이것은 `_.every`의 리턴값이 된다. `findIndex`로 부정적인 값을 하나도 찾지 못했다는 얘기는 결국 모두 긍정적인 값이라는 얘기가 된다.

`_.every`는 `not` 함수 덕분에 로직이 개선되었다. 이제 함수를 더 쪼개서 함수가 최대한 한 가지 일만 하게끔 만들어보자.

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

일단 좀 더 깔끔해졌다. `positive`와 `negativeIndex`라는 재사용 가능한 함수도 얻었다.

### 1.3.7 함수 합성

**함수를 쪼갤수록 함수 합성은 쉬워진다.**

`Underscore.js`의 `_.compose` 함수를 사용해볼 것이다.

`_.compose`는 오른쪽의 함수의 결과를 바로 왼쪽의 함수에게 전달하는 고차 함수이다.

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

`welcome`을 실행하면 먼저 `exclaim`을 실행하면서 `"moe"`를 인자로 넘겨준다. `exclaim`의 결과는 대문자로 변환된 `"MOE!"`이고, 그 결과는 다시 `greet`의 인자로 넘어가 최종 결과로 `"hi: MOE!"`를 리턴한다.

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

이번엔 `_.some`과 `_.every`를 간결하게 표현했다. 원래 코드와 동일하게 동작한다.

오른쪽에서부터 왼쪽으로 연속적으로 실행되어 결과를 만들어낸다.

값 대신 함수로, `for`와 `if` 대신 고차 함수와 보조 함수로, 연산자 대신 함수로, 함수 합성 등 앞서 설명한 함수적 기법들을 사용하면 **코드도 간결해지고 함수명을 통해 로직을 더 명확히 전달할 수 있어 좋은 코드가 된다.**

짧고 읽기 좋은 코드도 중요한 가치이지만 좀 더 고상한 이점이 있다. **인자 선언이나 변수 선언이 적어진다는 점이다.** 코드에 인자와 변수가 등장하지 않고 함수의 내부(`{statements}`)가 보이지 않는다는 것은 **새로운 상황도 생기지 않는다는 말이다.**

새로운 상황이 생기지 않는다는 것은 **개발자가 예측하지 못할 상황이 없다는 말이다.** 에러 없는 함수들이 인자와 결과에 맞게 잘 조합되어 있다면 전체의 결과 역시 에러가 날 수 없다. 상태를 공유하지 않는 작은 단위의 함수들은 테스트하기도 쉽고 테스트 케이스를 작성하기도 쉽다.

인자와 변수 자체가 적을 수록, 함수의 `{statements}`가 없거나 짧을수록, 함수들의 복잡성도 줄어들고 오류 발생 가능성도 줄어들며 부수 효과도 줄어든다.

코드를 수정해야 하는 상황에, 자신이 고쳐야 하는 함수의 문제에만 집중할 수 있게 되는 것이다.

또한 작성한지 오래된 코드일지라도 다시 읽고 고치기가 쉬워진다.

함수 하나하나가 무슨 일을 하는지에 대해 인자와 결과 위주로만 생각하면서 읽고 고칠 수 있게 되는 것이다.

**작게 쪼개다 보면 정말 쓸모 없어 보이는 함수가 많이 나오기도 한다. 그래도 더 작은 단위로 쪼개 보라. 재사용성이 높고 재밌는 코드들이 나올 것이다. 제어문 대신 함수를, 값 대신 함수를, 연산자 대신 함수를 사용해 보자. 프로그래밍에 대한 새롭고 재밌는 아이디어들을 만나게 될 것이다.**