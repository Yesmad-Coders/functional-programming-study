
<div id="1-3"></div>

## 1.3 함수형 자바스크립트의 실용성 2

[1.3.1 회원 목록 중 한명 찾기](#1-3-1)<br/>
[1.3.2 값에서 함수로](#1-3-2)<br/>
[1.3.3 함수를 만드는 함수와 find, filter 조합하기](#1-3-3)<br/>
[1.3.4 고차 함수](#1-3-4)<br/>
[1.3.5 function identity(v) {return v;}, 이건 어디다 쓰는 거지?](#1-3-5)<br/>
[1.3.6 연산자 대신 함수로](#1-3-6)<br/>
[1.3.7 함수 합성](#1-3-7)<br/>

<div id="1-3-1"></div>

### 1.3.1 회원 목록 중 한명 찾기

회원 목롱 중 특정 조건을 가진 회원 한 명을 찾고자 한다. 예를 들어 id 값으로 말이다.

```javascript
// 코드 1-16. filter로 한 명 찾기

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
  filter(users, function (user) { return user.id == 3 })[0]);
  // { id: 3, name: 'BJ', age: 32 }
```

▶ 코드 설명: filter가 배열로 반환되고 그 안에 우리가 원하는 obj 이 있기 때문에 `[0]`를 써서 배열로부터 obj을 꺼내준다. 즉, `filter(users, function (user) { return user.id == 3 })`까지만 봤을 때의 리턴값은 `[{ id: 3, name: 'BJ', age: 32 }]`가 된다.
<br/><br/>
이 코드의 경우 filter를 사용해 원하는 결과값을 찾을 수는 있지만 filter 함수는 무조건 `list.length`만큼 predicate(filter의 두번째 파라미터 값)가 실행되기 때문에 비효율적이고, 동일 조건에 값이 두 개 이상이라면 두 개 이상의 값을 찾는다. 따라서 코드 1-17과 같은 코드가 좀 더 효율적일 것이다.

```javascript
// 코드 1-17. break
// 코드 1-16 보다는 효율적이지만 재사용이 불가능하다

var user;
for (var i = 0, len = users.length; i < len; i++) {
  if (users[i].id == 3) {
    user = users[i];
        break;
    }
}
console.log(user);  // { id: 3, name: "BJ", age: 32 }
```
코드 1-17의 경우 filter 함수를 쓸 때와는 다르게 내가 원하는 값을 찾는 순간 break로 for문을 빠져 나올 수 있다. 따라서 코드 1-16 보다 효율적이다. 하지만 **재사용이 불가능**하다. 이것을 재사용이 가능하도록 다시 만든다면 코드 1-18 과 같다.

```javascript
// 코드 1-18. findById
// 재사용은 가능해졌지만 찾으려는 요소마다 함수를 따로 실행해야 하므로 효율적이지 못하다.

function findById(list, id) {
  for (var i=0, len=list.length; i < len; i++) {
    if(list[i].id == id) return list[i];
    }
}
console.log(findById(users, 3));    // { id: 3, name: "BJ", age: 32 }
console.log(findById(users, 5));    // { id: 5, name: "JE", age: 27 }
```

findById 함수는 list와 id를 받아서 for문을 돌다가 id가 같은 객체를 만나면 (1)그 값을 리턴하고 (2)함수도 종료되고 (3)for문도 멈춘다. 만약 for문을 다 돌았는데도 못찾았다면 undefined 가 리턴된다.

```javascript
// 코드 1-19. findByName

function findByName(list, name) {
    for (var i=0, len=list.length; i<len; i++) {
        if(list[i].name == name) return list[i];
    }
}

console.log(findByName(users, "BJ")); // { id: 3, name: "BJ", age: 32 }
console.log(findByName(users, "JE")); // { id: 5, name: "JE", age: 27 }
```

```javascript
// 코드 1-20. findByAge

function findByAge(list, age) {
    for(var i=0, len = list.length; i<len; i++) {
        if(list[i].age == age) return list[i];
    }
}

console.log(findByAge(users, 28));  // { id: 4, name: "PJ", age: 28 }
console.log(findByAge(users, 25));  // { id: 2, name: "HA", age: 25 }
```

코드 1-18, 1-19, 1-20 는 모두 코드에 중복이 있기에 같으면서 다르다.(same same but different!🤨) 결론부터 말하자면 이 함수들은 함수형이 아니다! 반복 요소를 줄일 수 있는 방법을 찾아보자.

```javascript
// 코드 1-21. findBy
// 반복은 피했지만 여전히 한계점이 있다.

function findBy(key, list, val) {
    for(var i=0, len=list.length; i<len; i++) {
        if(list[i][key]===val) return list[i];
    }
}

console.log(findBy('name', users, "BJ"));   // { id: 3, name: 'BJ', age: 32 }
console.log(findBy("id", users, 2));    // { id: 2, name: 'HA', age: 25 }
console.log(findBy('age', users, 28));  // { id: 4, name: 'PJ', age: 28 }
```

이렇게 만들면 이름, 나이, 아이디 뿐 아니라 object 내의 다른 값도 내 마음대로 골라 찾을 수 있다! Key로 value를 얻을 수 있는 객체들을 가진 배열마다 무엇이든 받을 수 있다는 말이다. 객체의 key 값이 뭐가 됐든 간에 찾아줄 수 있어서 훨씬 더 유연한(많은 경우를 대응할 수 있는) 함수가 되었다. 하지만! 아직 다음과 같은 상황을 지원하지 못하는 아쉬움이 있다.

- key가 아닌 method를 통해 값을 얻어야 할 때
- 두 가지 이상의 조건이 필요할 때
- ===이 아닌 다른 조건으로 찾고자 할 때

다음 예제는 user 객체가 메서드로 값을 얻어야 하는 객체인 경우에 발생하는 난감한 상황을 보여준다.

```javascript
// 코드 1-22. findBy로 안되는 경우
function User(id, name, age) {
    this.getId = function() { return id; }
    this.getName = function() { return name; }
    this.getAge = function() { return age; }
}

function findBy(key, list, val) {
    for(var i=0, len=list.length; i<len; i++) {
        if(list[i][key] === val) return list[i];
    }
}

var users2 = [
    new User(1, "ID", 32),
    new User(2, "HA", 25),
    new User(3, "BJ", 25),
    new User(4, "PJ", 25),
    new User(5, "JE", 25),
    new User(6, "JM", 25),
    new User(7, "HI", 25),
]

console.log(findBy('age', users2, 25)); // undefined
```
<div id="limitation"></div>
👉🏼 한계점: 코드 1-22에서 user의 나이를 getAge()로 얻어야 하기 때문에 findBy 함수로는 위 상황을 대응할 수 없음을 알 수 있다. 이름에 "P"가 포함된 user를 찾고 싶다거나, 나이가 32이면서 이름이 'JM'인 user를 찾고 싶다거나 하는 것도 불가능하다. 나이가 30 미만인 사람을 찾는 것도 findBy로는 할 수 없다. 이런 문제들을 함수형 프로그래밍을 통해 해결 해보자.

<div id="1-3-2"></div>

### 1.3.2 값에서 함수로

앞서 만들었던 filter나 map처럼 인자로 키와 값 대신에 **함수**를 사용해보자. 그렇게 하면 모든 상황에 대응 가능한 find 함수를 만들 수 있다.

```javascript
// 코드 1-23. find

function find(list, predicate) {
    for (var i=0, len=list.length; i<len; i++) {
        if(predicate(list[i])) return list[i];
    }
}

console.log(find(users2, function(u) { return u.getAge() == 25;}).getName());
// HA
console.log(find(users, function(u) { return u.name.indexOf("P") != -1; }));
// { id: 4, name: 'PJ', age: 28 }
console.log(find(users, function(u) { return u.age == 32 && u.name == "JM"; }));
// { id: 6, name: 'JM', age: 32 }
console.log(find(users2, function(u) { return u.getAge() < 30; }).getName());
// HA
```

코드 1-21에서는 findBy의 인자로 `key`, `list`, `val` 를 받았지만 코드 1-23에서는 find의 인자로 `key`와 `predicate`를 받았다. list와 val 대신 predicate 함수를 받은 것이다. 다시 말해, **값 대신 함수를 받았다**. 덕분에 if 안쪽에서 할 수 있는 일이 훨씬 많아졌고 <a href="#limitation">앞서 언급했던 한계점</a>들도 극복할 수 있게 되었다. getAge같은 메서드 실행을 통해 값을 비교하기도 했고, indexOf와 같은 메서드를 통해 이름에 "P"가 포함되는지를 알아내기도 했다. 또한 두가지 조건을 모두 만족하는 값도 찾을 수 있고, range를 통한 값 찾기도 가능해졌다.
<br/>
<br/>
인자를 String이나 Number 대신 Function으로 변경했더니 매우 큰 차이를 만들었다. 덕분에 find는 이제 배열에 어떤 값이 들어 있든 사용할 수 있게 되었다. 앞서 만든 map과 filter도 마찬가지다.
> 함수형 자바스크립트는 이처럼 다형성이 높은 기법을 많이 사용하며 이런 기법은 정말 실용적이다.

<br/>
우리가 만든 filter, map, find 함수들은 들어온 데이터가 무엇이든지 루프를 돌리거나 분기를 만들거나 push를 하거나 predicate를 실행하거나 등의 자기 할 일을 한다. find는 전달 받을 데이터와 데이터의 특성에 맞는 보조 함수(predicate)도 함께 전달 받는다. 들어온 데이터의 특성은 보조 함수가 대응해 주기 때문에 find 함수는 데이터의 특성에서 완전히 분리될 수 있다. 이러한 방식은 다형성을 높이며 동시에 안정성도 높인다.
<br/>
filter나 find는 list 내부에 무엇이 들어 있는 지는 관심이 없다. 배열 내부 값의 상태를 변경하지도 않고 들여다 보지도 않는다. 객체지향 프로그래밍이 약속된 이름의 메서드를 대신 실행해 주는 식으로 외부 객체에 위임을 한다면, 함수형 프로그래밍은 보조 함수를 통해 완전히 위임하는 방식을 취한다. 이는 더 높은 다형성과 안정성을 보장한다.
<br/>
다음과 같은 함수들을 사용하면 각 데이터에 맞는 보조 함수로 대응하는 사례다.

```javascript
// 코드 1-24. 다형성

// 코드 1-16 에서 선언한 users
console.log(
    map(
        filter(users, function(u) { return u.age >= 30 }),
        function(u) { return u.name; }));
// [ 'ID', 'BJ', 'JM' ]

// 코드 1-22 에서 선언한 users2로 교체
console.log(map(
    filter(users2, function(u) { return u.getAge() > 30 }), // 메서드 실행으로 변경
    function(u) { return u.getName(); })); // 메서드 실행으로 변경
// ["ID"]
```

<div id="1-3-3"></div>

### 1.3.3 함수를 만드는 함수와 find, filter 조합하기

User 등의 커스텀 객체가 아닌 자바스크립트 기본 객체로 만들어진 users를 사용한 예제로 돌아오자. 함수로 함수를 만들어 find 함수와 함께 사용하면 코드를 더욱 간결한게 만들 수 있다.

```javascript
// 코드 1-25. bmatch1로 predicate 만들기
// 하나의 key에 대한 value 만 비교할 수 있어서 bmatch1 이다.

function bmatch1(key, val) {
  return function (obj) {
    return obj[key] === val;
  };
}

console.log(find(users, bmatch1("id", 1))); // { id: 1, name: "ID", age: 32 }
console.log(find(users, bmatch1("name", "HI"))); // { id: 3, name: "HI", age: 24 }
console.log(find(users, bmatch1("age", 27))); // { id: 5, name: "JE", age: 27 }

```

bmatch1의 실행 결과는 함수다. key와 val을 미리 받아서 나중에 들어올 obj와 비교하는 익명 함수를 클로저로 만들어 리턴한다. bmatch1을 통해 id, name, age를 비교하는 predicate를 3개 만들어 find에게 넘겼다. bmatch1은 함수를 리턴하기 때문에 filter나 map과도 조합이 가능하다. _인자와 결과만으로 협업_하기 때문에 여기저기 붙이기 쉽다는 장점이 있다.


```javascript
// 코드 1-26. bmatch1 로 함수를 만들어 고차 함수와 협업하기

console.log(filter(users, bmatch1("age", 32)));
// [{ id: 1, name: "ID", age: 32 },
//   { id: 3, name: "BJ", age: 32 },
//   { id: 6, name: "JM", age: 32 }];

console.log(map(users, bmatch1("age", 32)));
// [true, false, true, false, false, true, false]
```

`bmatch1`은 하나의 key에 대한 value 만 비교할 수 있다. 여러 개의 key에 해당하는 value들을 비교하는 함수를 만들어 보자.

```javascript
// 코드 1-27 bmatch

var users = [
  { id: 1, name: "ID", age: 32 },
  { id: 2, name: "HA", age: 25 },
  { id: 3, name: "BJ", age: 32 },
  { id: 4, name: "PJ", age: 28 },
  { id: 5, name: "JE", age: 27 },
  { id: 6, name: "JM", age: 32 },
  { id: 7, name: "HI", age: 24 },
];

function bmatch(obj2, val) {
  if (arguments.length == 2) {
    obj2 = object(obj2, val);
  }
  return function (obj) {
    return match(obj, obj2);
  };
}

function object(key, val) {
  var obj = {};
  obj[key] = val;
  return obj;
}

function match(obj, obj2) {
  for (var key in obj2) {
    if (obj[key] !== obj2[key]) return false;
  }
  return true;
}

function find(list, predicate) {
  for (var i = 0, len = list.length; i < len; i++) {
    if (predicate(list[i])) return list[i];
  }
}

// [코드 1]
console.log(
  match(find(users, bmatch("id", 3)), find(users, bmatch("name", "BJ")))
);
// true;

console.log(find(users, bmatch({ name: "JM", age: 32 })));
// { id: 6, name: 'JM', age: 32

console.log(
  find(users, function (u) { return u.age == 32 && u.name == "JM"; })
);
// { id: 6, name: 'JM', age: 32

console.log(find(users, bmatch({ name: "JM", age: 32 })));
// { id: 6, name: 'JM', age: 32
```

👉🏼 코드 뜯어보기<br/>

```javascript
// [코드 1]

console.log(
        // A                           // B
  match(find(users, bmatch("id", 3)), find(users, bmatch("name", "BJ")))
);
// match(A,B) A 와 B 를 비교할거야 👉🏼 match 함수로 보냄
// match 함수로 들어가면 B 의 Object가 가진 key를 순차적으로 돌릴거야.
// 이 때 Object A 가 갖고 있는 key와 똑같은 key를 B에서 찾으면 true 아니면 false 를 보내줘.
```

```javascript
// [코드 1-A]

find(users, bmatch("id", 3))
// find 함수를 통해서 users 배열 내부의 객체를 하나씩 순서대로 bmatch 에 보내준다.
// 가장 먼저 users 의 첫번째 값인 { id: 1, name: "ID", age: 32 }를 가지고 bmatch와 비교하게 됨.
// bmatch를 이용해 우리가 찾고자 하는 값은 users 리스트 내부의 객체 중 id가 3인 객체다.
```

```javascript
// bmatch

function bmatch(obj2, val) {
  if (arguments.length == 2) {
    obj2 = object(obj2, val);
  }
  return function (obj) {
    return match(obj, obj2);
  };
}

// bmatch("id", 3) 이 들어왔고, arguments 가 2개 이므로 if문 내부로 들어간다.
// object 함수를 통하며 obj2 = { id : 3 } 이 되었다. (이 코드는 쉬워서 생략)
// obj는 users 리스트에서 순차적으로 들어오는 객체 값 (find 함수를 통해 넘어왔음)
// 가장 먼저 { id: 1, name: 'ID', age: 32 } 부터 하나씩 순차적으로 obj 에 들어오게 됨
// obj = { id: 1, name: "ID", age: 32 }
// obj2 = { id : 3 }
// 이 두 값을 match 함수로 넘겨준다
```

```javascript
// match

function match(obj, obj2) {
  for (var key in obj2) {
    if (obj[key] !== obj2[key]) return false;
  }
  return true;
}

// if 문 내에서 id가 3인 값을 못 찾으면 false / 찾으면 true를 내보냄
// 어떻게?
// obj의 key의 value 가 obj2의 key의 value와 다르면 false, 같으면 true를 넘겨준다.
// obj의 key의 value 는 1, 'ID', 32 가 들어오고, 이를 obj2의 key의 value인 3과 비교한다.
// 같은 값이 없으므로 false를 내보낸다.

// true를 만날 때 까지 users 의 값이 순차적으로 들어오며 비교한다.
```

여기서 `bmatch` 함수 내부에 `if (arguments.length == 2) obj2 = object(obj2, val);` 이런 조건문을 줌으로서 `(key, val)` 처럼 인자 2개를 보낼 수도 있고, `({ key: val })` 처럼 인자 1개로 만들어 사용할 수도 있다. 여기서 `({ key:val })` 방식을 사용하면 두 가지 이상의 값이 모두 동일한지도 확인할 수 있다. <br/><br/>

이번에는 find를 조금만 고쳐서 값 비교만 하는 `Array.prototype.indexOf` 보다 훨씬 활용도가 높은 findIndex를 만들어보자.

```javascript
// 코드 1-28. findIndex

function findIndex(list, predicate) {
  for (var i = 0, len = list.length; i < len; i++) {
    if (predicate(list[i])) return i;
  }
  return -1;
}

console.log(findIndex(users, bmatch({ name: "JM", age: 32 }))); // 5
console.log(findIndex(users, bmatch({ age: 36 }))); // -1

```

<div id="1-3-4"></div> 

### 1.3.4 고차 함수

앞서 구현했던 map, filter, find, findIndex, bvalue, bmatch 같은 함수들은 모두 고차 함수다. 고차 함수란 **함수를 인자로 받거나 함수를 리턴하는 함수**를 말한다. 보통 고차 함수는 함수를 인자로 받아서 필요할 때 실행하거나 클로저를 만들어 리턴한다.<br/>

앞서 만든 map, filter, find, findIndex는 `Undersccore.js`에도 있는 함수들이다. [Underscore.js](https://underscorejs.org/)는 유명한 함수형 자바스크립트 라이브러리다.
Underscore.js은 `_.map`, `_.filter`, `_.find`, `_.findIndex`는 interatee와 predicate가 사용할 인자를 몇 가지 더 제공한다. 우리가 만든 map, filter, find, findIndex를 _.map, _.filter, _.find, _.findIndex에 가깝게 조금 더 고쳐 보자.


```javascript
// 코드 1-29. 인자 늘리기

_.map = function (list, iteratee) {
  var new_list = [];
  for (var i = 0, len = list.length; i < len; i++) {
    new_list.push(iteratee(list[i], i, list));
  }
  return new_list;
};

_.filter = function (list, predicate) {
  var new_list = [];
  for (var i = 0, len = list.length; i < len; i++) {
    if (predicate(list[i], i, list)) new_list.push(list[i]);
  }
  return new_list;
};

_.find = function (list, predicate) {
  for (var i = 0, len = list.length; i < len; i++) {
    if (predicate(list[i], i, list)) return list[i];
  }
};

_.findIndex = function (list, predicate) {
  for (var i = 0, len = list.length; i < len; i++) {
    if (predicate(list[i], i, list)) return i;
  }
  return -1;
};
```

원래는 `iteratee(list[i])` 처럼 인자를 한 개만 넘겼지만, 이제는 `iteratee(list[i], i, list)` 처럼 총 세 개의 인자를 넘긴다. iteratee와 predicate 함수가 받는 인자가 많아지며 좀 더 다양한 일을 할 수 있게 되었다. `_.filter` 함수의 predicate에게 두 번째 인자로 i가 넘어오는 덕분에 다음과 같은 함수 조합도 가능해졌다.

```javascript
// 코드 1-30. predicate에서 두 번재 인자 사용하기

console.log(
  _.filter([1, 2, 3, 4], function (val, idx) { return idx > 1; })
); // [3,4]

console.log(
  _.filter([1, 2, 3, 4], function (val, idx) { return idx % 2 == 0; })
); // [1,3]
```

<div id="1-3-5"></div> 

### 1.3.5 function identity(v) {return v;}, 이건 어디다 쓰는 거지?

정말 쓸모 없어 보이는 함수가 있다. 코드 1-31이 그것인데, 이것은 Underscore.js 라이브러리에도 있는 함수다.

```javascript
// 코드 1-31. _.identity

_.identity = function (v) { return v; };
var a = 10;
console.log(_.identity(a)); // 10
```

이 함수는 그냥 받은 인자를 그대로 내뱉는 함수다. 이런 아무런 기능이 없는 함수는 언제 써야 할까?

```javascript
// 코드 1-32. predicate로 _.identity 를 사용한 경우
console.log(_.filter([true, 0, 10, "a", false, null], _.identity));
// [true, 10, 'a']
```

`_.filter`와 `_.identity`를 함께 사용했더니 **Truthy Values** 만 남았다. 이렇게 놓고 보니 `_.identity` 함수가 좀 더 실용적으로 보이지 않는가? `_.identity`를 다른 고차 함수와 조합하는 식으로 코드 1-33과 같은 유용한 함수들을 만들 수 있다.


> 🤚🏼 잠깐만요!
> false, undefined, null, 0, NaN, "" 은 모두 Boolean 으로 평가했을 때 false다. 따라서 이것들을 모두 Falsy values 라고 부른다. Falsy values 가 아닌 모든 값들은 Truthy values다.
> _.falsy = function(v) { return !v; }
> _.truthy = function(v) { return !!v; }


```javascript
// 코드 1-33. some, every 만들기 1

_.some = function (list) {
  return !!_.find(list, _.identity);
};

_.every = function (list) {
  return _.filter(list, _.identity).length == list.length;
};

console.log(_.some([0, null, 2])); // true
console.log(_.some([0, null, false])); // false

console.log(_.every([0, null, 2])); // false
console.log(_.every([{}, true, 2])); // true
```

여기서 `_.some`은 배열에 들어 있는 값 중 하나라도 true 가 있으면 true를 반환하고, 하나도 없으면 false 를 리턴한다. `_.every`는 모두 true 여야 true를 리턴한다. `_.some`, `_.every`는 if나 predicate 등과 함께 사용할 때 매우 유용하다. 그런데 코드 1-33에서 아쉬운 점이 하나 있다. filter를 사용했기 때문에 항상 루프 끝까지 돌게 된다는 것이다. 함수를 두 개 더 만들면 로직을 개선할 수 있다.


<div id="1-3-6"></div> 

### 1.3.6 연산자 대신 함수로

```javascript
// 코드 1-34. 아주 작은 함수 not, beq

function not(v) { return !v; }

function beq(a) {
  return function (b) {
    return a === b;
  };
}
```

`!` 를 써도 되는데 왜 not 함수가 필요할까? `===`로 비교하면 되는데 왜 beq 함수가 필요할까? 얘들을 굳이 만들어야 하나? 하나하나 뜯어보면서 궁금증을 해결해 보자.


```javascript
// 코드 1-35. some, every 만들기 2

_.some = function (list) {
  return !!_.find(list, _.identity);
};

_.every = function (list) {
  return beq(-1)(_.findIndex(list, not));
};

console.log(_.some([0, null, 2])); // true
console.log(_.some([0, null, false])); // false
console.log(_.every([0, null, 2])); // false
console.log(_.every([{}, true, 2])); // true
```

not은 연산자 `!` 가 아닌 함수이기 때문에 `_.findIndex`와 함께 사용할 수 있다. list의 값 중 하나라도 부정적인 값을 만나면 predicate가 not 이므로 true를 리턴하여 해당 번째 i 값을 리턴하게 된다. 중간에 부정적인 값을 한 번이라도 만나면 루프가 중단된다. 만일 부정적인 값이 하나도 없다면 -1 을 리턴한다. -1이 나왔다면, beq(-1) 이 리턴한 함수에 인자로 넣어 true가 나올 것이고, 이것은 `_.every`의 리턴값이 된다. findIndex 로 부정적인 값을 하나도 찾지 못했다는 얘기는 결국 모두 긍정적인 값이라는 얘기가 된다.

`_.every`는 쓸모 없어 보이지만 작은 함수 not 덕분에 로직이 개선됐다. 여기서 가능한 함수가 한 가지 일만 하도록 함수를 조금 더 쪼개보자.

```javascript
// 코드 1-36. 함수 쪼개기

function positive(list) {
  return _.find(list, _.identity);
}

function negativeIndex(list) {
  return _.findIndex(list, not);
}

_.some = function (list) {
  return not(not(positive(list)));
};

_.every = function (list) {
  return beq(-1)(negativeIndex(list));
};

console.log(_.some([0, null, 2])); // true
console.log(_.some([0, null, false])); // false
console.log(_.every([0, null, 2])); // false
console.log(_.every([{}, true, 2])); // true
```

좀 더 깔끔해졌고, `positive`와 `negativeIndex`라는 재사용 가능한 함수도 얻었다!

<div id="1-3-7"></div>

### 1.3.7 함수 합성

함수를 쪼갤수록 함수 합성은 쉬워진다. Underscore.js에 `_.compose` 라는 함수가 있따. 이 `_.compose`는 오른쪽 함수의 결과를 바로 왼쪽의 함수에게 전달한다. 그리고 해당 함수의 결과를 다시 자신의 왼쪽 함수에게 전달하는 고차 함수다. 코드 1-37은 Underscore.js 사이트에 있는 예제와 Underscore.js 내부의 코드다. <br/>
`arguments`, `apply`, `call` 객체 등이 익숙하다면 `_.compose` 함수의 코드를 읽는 것이 크게 어렵지 않을 것이다. arguments 객체는 함수형 자바스크립트를 다루다 보면 자주 만나게 된다. `arguments` 객체에 대해서는 2장에서 자세히 다룰 것이므로 가볍게 봐도 좋다 :)

```javascript
// underscore.js 중

_.compose = function () {
  var args = arguments;
  var start = args.length - 1;
  return function () {
    var i = start;
    var result = args[start].apply(this, arguments);
    while (i--) result = args[i].call(this, result);
    return result;
  };
};

var greet = function (name) {
  return "hi:" + name;
};

var exclaim = function (statement) {
  return statement.toUpperCase() + "!";
};

var welcome = _.compose(greet, exclaim);

console.log(welcome("moe"));  // hi:MOE!
```

welcome을 실행하면 먼저 exclaim을 실행하면서 "moe" 인자를 넘겨준다. exclaim의 결과는 대문자로 변환된 "MOE!" 이고 그 결과는 다시 greet의 인자로 넘어가 최종 결과로 "hi:MOE!"를 리턴한다. 이번엔 `_.compose`를 이용해 `_.some`과 `_.every`를 만들어보자.

```javascript
// 코드 1-38. _.compose로 함수 합성하기

/* 원래 코드 
_.some = function(list) {
    return not(not(positive(list)));
};
_.every = function(list) {
    return beq(-1)(negativeIndex(list));
}

*/
_.some = _.compose(not, not, positive);
_.every = _.compose(beq(-1), negativeIndex);
```

`_.compose`을 써서 `_.some`, `_.every`를 더 간결하게 표현했다. 맨 오른쪽의 함수가 인자를 받아 결과를 만들고 결과는 다시 그 왼쪽의 함수에게 인자로 전달된다. 오른쪽에서부터 왼쪽으로 연속적으로 실행되어 최종 결과를 만든다.

값 대신 함수로 for와 if 대신 고차 함수와 보조 함수로, 연산자 대신 함수로, 함수 합성 등 앞서 설명한 함수적 기법들을 사용하면 간결한 코드와 함수명으로 로직을 더 명확히 전달할 수 있다.

짧고 읽기 좋은 코드도 중요한 가치지만 좀 더 고상한 이점이 있다. 인자 선언이나 변수 선언이 적어진다는 것이다. 코드에 인자와 변수가 등장하지 않고 함수의 내부({statement})가 보이지 않는다는 새로운 상황도 생기지 않는다. 새로운 상황이 생기지 않는다는 것은 계발자가 예측하지 못할 상황이 없다는 말이다!🥳 에러 없는 함수들이 인자와 결과에 맞게 잘 조합되어 있다면 전체의 결과 역시 에러가 날 수 없다. 




---

Prev: [1-2. 함수형 자바스크립트의 실용성](../1-2/README.md)
Next: [1-4. 함수형 자바스크립트를 위한 기초](../1-4/README.md)

---

#### 🗂 목차

<details>
<!-- <summary>1.1 <a href="1-1/README.md">함수형 프로그래밍 그거 먹는건가요?</a></summary>  -->
<summary>1.1 <a href="/bravacoreana/chapter-01/1-1/README.md">함수형 프로그래밍 그거 먹는건가요?</a></summary>
<div markdown="1">
&nbsp&nbsp&nbsp&nbsp 1.1.1 함수형 자바스크립트를 검색하면 나오는 예제<br/>
&nbsp&nbsp&nbsp&nbsp 1.1.2 값으로써의 함수와 클로저<br/>
</div>
</details>

<details>
<summary>1.2 <a href="/bravacoreana/chapter-01/1-2/README.md">함수형 자바스크립트의 실용성</a> </summary>
<div markdown="1">
&nbsp&nbsp&nbsp&nbsp 1.2.1 회원 목록 중 여러 명 찾기<br/>
&nbsp&nbsp&nbsp&nbsp 1.2.2 for에서 filter로, if에서 predicate로<br/>
&nbsp&nbsp&nbsp&nbsp 1.2.3 함수형 프로그래밍 관점으로  filter 보기<br/>
&nbsp&nbsp&nbsp&nbsp 1.2.4 map 함수<br/>
&nbsp&nbsp&nbsp&nbsp 1.2.5 실행 결과로 바로 실행하기<br/>
&nbsp&nbsp&nbsp&nbsp 1.2.6 함수를 값으로 다룬 예제의 필요성<br/>
</div>
</details>

<details>
<summary>1.3 <a href="/bravacoreana/chapter-01/1-3/README.md">함수형 자바스크립트의 실용성 2</a></summary>
<div markdown="1">
&nbsp&nbsp&nbsp&nbsp 1.3.1 회원 목록 중 한 명 찾기<br/>
&nbsp&nbsp&nbsp&nbsp 1.3.2 값에서 함수로<br/>
&nbsp&nbsp&nbsp&nbsp 1.3.3 함수를 만드는 함수와 find, filter 조합하기<br/>
&nbsp&nbsp&nbsp&nbsp 1.3.4 고차 함수<br/>
&nbsp&nbsp&nbsp&nbsp 1.3.5 function identity(v) {return v;}, 이건 어디다 쓰는거지?<br/>
&nbsp&nbsp&nbsp&nbsp 1.3.6 연산자 대신 함수로<br/>
&nbsp&nbsp&nbsp&nbsp 1.3.7 함수 합성<br/>
</div>
</details>

<details>
<summary>1.4 <a href="/bravacoreana/chapter-01/1-4/README.md">함수형 자바스크립트를 위한 기초</a></summary>
<div markdown="1">
&nbsp&nbsp&nbsp&nbsp 1.4.1 일급 함수<br/>
&nbsp&nbsp&nbsp&nbsp 1.4.2 클로저<br/>
&nbsp&nbsp&nbsp&nbsp 1.4.3 클로저의 실용 사례<br/>
&nbsp&nbsp&nbsp&nbsp 1.4.4 클로저를 많이 사용하라!<br/>
&nbsp&nbsp&nbsp&nbsp 1.4.5 고차 함수<br/>
&nbsp&nbsp&nbsp&nbsp 1.4.6 콜백 함수라 잘못 불리는 보조 함수<br/>
&nbsp&nbsp&nbsp&nbsp 1.4.7 함수를 리턴하는 함수와 부분 적용<br/>
</div>
</details>

<details>
<summary>1.5 <a href="/bravacoreana/chapter-01/1-5/README.md">정리</a></summary>
<div markdown="1">
</div>
</details>