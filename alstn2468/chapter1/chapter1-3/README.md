# 1.3 함수형 자바스크립트의 실용성 2

특정 조건을 갖는 회원을 찾기위해 아래와 같이 `filter` 함수를 이용해 코드를 작성할 수 있다.

- 코드 1-16 `filter`로 한 명 찾기

```javascript
console.log(
  filter(users, function (user) {
    return user.id === 3;
  })[0]
); // { id: 3, name: "BJ", age: 32 }
```

`filter` 함수를 통해 걸래낸 후 `[0]`으로 `user`를 얻었고 원하는 결과가 나오긴 했다.

`filter`를 사용하여 찾을수 있지만 `filter` 함수는 무조건 `list.length` 만큼 `predicate`가 실행된다.

또한 동일 조건의 값이 두 개 이상일 경우 두 개 이상의 값을 찾게 된다.

- 코드 1-17 `break`

```javascript
var user;
for (var i = 0, len = users.length; i < len; i++) {
  if (users[i].id == 3) {
    user = users[i];
    break;
  }
}
console.log(user); // { id: 3, name: "BJ", age: 32 }
```

코드 1-17은 조건에 맞는 `user`를 찾은 후 `beak`로 for문을 빠져나왔다.

앞의 `filter` 함수를 통해 찾은 것보다 훨씬 효울적으로 실행되나 재사용이 불가능하다.

- 코드 1-18 `findById`

위의 코드를 재사용이 가능하도록 만들어주는 `findById` 함수를 작성할 수 있다.

```javascript
function findById(list, id) {
  for (var i = 0, len = list.length; i < len; i++) {
    if (list[i].id == id) return list[i];
  }
}

console.log(findById(users, 3)); // { id: 3, name: "BJ", age: 32 }
console.log(findById(users, 5)); // { id: 5, name: "JE", age: 27 }
```

`findById`는 `list`와 `id`를 받아 반복문을 돌다 `id`가 동일한 객체를 만나면 그 값을 반환한다.

이름으로 값을 찾고자 한다면 아래와 같은 함수를 만들어야 한다.

- 코드 1-19 `findByName`

```javascript
function findByName(list, name) {
  for (var i = 0, len = list.length; i < len; i++) {
    if (list[i].name == name) return list[i];
  }
}

console.log(findByName(users, 'BJ')); // { id: 3, name: "BJ", age: 32 }
console.log(findByName(users, 'JE')); // { id: 5, name: "JE", age: 27 }
```

비슷하게 나이로 값을 찾는 함수 또한 만들 수 있다.

- 코드 1-20 `findByAge`

```javascript
function findByAge(list, age) {
  for (var i = 0, len = list.length; i < len; i++) {
    if (list[i].age == age) return list[i];
  }
}

console.log(findByAge(users, 28)); // { id: 4, name: "PJ", age: 28 }
console.log(findByAge(users, 25)); // { id: 2, name: "HA", age: 25 }
```

for, if와 같은 로직은 숨겨지고 깔끔해졌지만 각 함수간의 중복이 있다는 아쉬움이 있다.

결론적으로 이 함수들은 함수형적이지 않으며 아래와 같이 인자를 하나 더 늘리면 중복을 제거할 수 있다.

- 코드 1-21 `findBy`

```javascript
function findBy(key, list, val) {
  for (var i = 0, len = list.length; i < len; i++) {
    if (list[i][key] == val) return list[i];
  }
}

console.log(findBy('name', users, 'BJ')); // { id: 3, name: "BJ", age: 32 }
console.log(findBy('id', users, 2)); // { id: 2, name: "HA", age: 25 }
console.log(findBy('age', users, 28)); // { id: 4, name: "PJ", age: 28 }
```

전체적으로 코드가 줄었으며 앞으로 `key`를 이용해 값을 얻을 수 있는 객체를 가진 배열이라면 어디든 사용할 수 있다.

전체적으로 코드가 좋아지긴 했지만 아래와 같은 상황을 지원하지 못하는 아쉬움이 있다.

- `key`가 아닌 메서드를 통해 값을 얻어야 할 때
- 두 가지 이상의 조건이 필요할 때
- `===`가 아닌 다른 조건으로 찾고자 할 때

아래의 예제는 `user` 객체가 메서드로 값을 얻어야 하는 객체일 경우에 발생하는 난감한 상황을 보여준다.

- 코드 1-22 `findBy`로 안 되는 경우

```javascript
function User(id, name, age) {
  this.getId = function () {
    return id;
  };
  this.getName = function () {
    return name;
  };
  this.getAge = function () {
    return age;
  };
}

var users = [
  new User(1, 'ID', 32),
  new User(2, 'HA', 25),
  new User(3, 'BJ', 32),
  new User(4, 'PJ', 28),
  new User(5, 'JE', 27),
  new User(6, 'JM', 32),
  new User(7, 'HI', 24),
];

console.log(findBy('age', users, 25)); // undefined
```

위의 코드를 보면 `user`의 나이를 `getAge` 메서드를 이용해 얻어야 하기 때문에 `findBy` 함수로 위 상황을 대응할 수 없다.

## 1.3.2 값에서 함수로

앞에서 만들었던 `filter`나 `map`처럼, 인자로 키와 값 대신 함수를 사용해 모든 상황에 대응 가능한 `find` 함수를 만들 수 있다.

```javascript
function find(list, predicate) {
  for (var i = 0, len = list.length; i < len; i++) {
    if (predicate(list[i])) return list[i];
  }
}

console.log(
  find(users2, function (u) {
    return u.getAge() == 25;
  }).getName()
); // HA
console.log(
  find(users, function (u) {
    return u.name.indexOf('P') != -1;
  })
); // { id: 4, name: "PJ", age: 28 }
console.log(
  find(users, function (u) {
    return u.age == 32 && u.name == 'JM';
  })
); // { id: 6, name: "JM" age: 32 }
console.log(
  find(users2, function (u) {
    return u.getAge() < 30;
  }).getName()
); // HA
```

`find` 함수의 인자로 `key`와 `val` 대신 `predicate` 함수 하나를 전달 받았다.

값 대신 함수를 받은 덕분에 if 안쪽에서 할 수 있는 일이 많아졌다.

인자를 문자열이나 숫자 대신 함수로 변경한 작은 차이가 매우 큰 차이를 만들었다.

`find` 함수는 이제 배열에 어떤 값이 들어 있든 사용할 수 있게 되었다.

함수형 자바스크립트는 이처럼 다형성이 높은 기법을 많이 사용하며 굉장히 실용적이다.

`find` 함수는 전달받은 데이터와 데이터의 특성에 맞는 `predicate`라는 보조 함수도 함께 전달 받는다.

들어온 데이터의 특성은 보조 함수가 대응하므로 `find` 함수는 데이터의 특성에서 완전히 분리될 수 있다.

- 코드 1-24 다형성

```javascript
console.log(
  map(
    filter(users, function (u) {
      return u.age >= 30;
    }),
    function (u) {
      return u.name;
    }
  )
); // ["ID", "BJ", "JM"]
console.log(
  map(
    filter(users2, function (u) {
      return u.getAge() > 30;
    }),
    function (u) {
      return u.getName();
    }
  )
); // ["ID", "BJ", "JM"]
```

이와 같이 **함수형 프로그래밍은 보조 함수를 통해 위임하는 방식을 취해 높은 다형성과 안정성을 보장**한다.

<sub id="2021-03-01"><sup>-- 2021-03-01 --</sup></sub>

## 1.3.3 함수를 만드는 함수와 find, filter 조합하기

함수로 함수를 만들어 `find` 함수와 같이 사용하면 코드를 더 간결하게 만들 수 있다.

- 코드 1-25 `bmatch1`로 `predicate` 만들기

```javascript

function bmatch1(key, val) {
  return function (obj) {
    return obj[key] === val;
  };
}

console.log(find(users, bmatch1('id', 1)));
//{ id: 1, name: "ID", age: 32 }
console.log(find(users, bmatch1('name', 'HI')));
// { id: 7, name: "HI", age: 24 }
console.log(find(users, bmatch1('age', 27)));
// { id: 5, name: "JE", age: 27 }
```

`bmatch1` 함수의 실행 결과는 함수다. `key`와 `val`을 미리 받아 나중에 들어올 `obj`와 비교하는 익명 함수를 **클로저**로 만들어 반환한다.

`bmatch1`은 함수를 리턴하기 때문에 `filter`나 `map`과도 조합이 가능하다.

- 코드 1-26 `bmatch1`로 함수를 만들어 고차 함수와 협업하기

```javascript
console.log(filter(users, bmatch1('age', 32)));
// [{ id: 1, name: 'ID', age: 32 },
// { id: 3, name: 'BJ', age: 32 },
// { id: 6, name: 'JM', age: 32 }]
console.log(map(users, bmatch1('age', 32)));
// [true, false, true, false, false, true, false]
```

현재 사용하고 있는 `bmatch1`은 하나의 `key`에 대한 `value`만 비교할 수 있다.

- 코드 1-27 `bmatch`

```javascript
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
function bmatch(obj2, val) {
  if (arguments.length == 2) obj2 = object(obj2, val);
  return function (obj) {
    return match(obj, obj2);
  };
}
console.log(
  match(find(users, bmatch('id', 3)), find(users, bmatch('name', 'BJ')))
); // true
console.log(
  find(users, function (u) {
    return u.age == 32 && u.name == 'JM';
  })
); // { id: 6, name: "JM", age: 32 }
console.log(find(users, bmatch({ name: 'JM', age: 32 })));
// { id: 6, name: "JM", age: 32 }
```

`bmatch` 함수는 `(key, val)`과 `({ key: val })` 두 가지 방식으로 사용할 수 있다.

또한 `({ key: val })` 방식을 사용하면 두 가지 이상의 값이 모두 동일한지도 확인할 수 있다.

- 코드 1-28 `findIndex`

```javascript
function findIndex(list, predicate) {
  for (var i = 0, len = list.length; i < len; i++) {
    if (predicate(list[i])) return i;
  }
  return -1;
}

console.log(findIndex(users, bmatch({ name: 'JM', age: 32 }))); // 5
console.log(findIndex(users, bmatch({ age: 36 }))); // -1
```

`find` 함수도 조금만 고치면 값을 비교만 하는 `Array.prototype.indexOf`보다 활용도가 훨신 높은 `findIndex`를 만들 수 있다.

## 1.3.4 고차 함수

앞서 구현했던 `map`, `filter`, `find`, `findIndex`, `bvalue`, `bmatch` 같은 함수들은 모두 **고차 함수**다.

**고차 함수**란 함수를 인자로 받거나 함수를 반환하는 함수를 말한다.

보통 **고차 함수**는 함수를 인자로 받아 필요한 때에 실행하거나 클로저를 만들어 반환한다.

앞서 구현한 함수들은 Underscore.js에도 있는 함수들이며 몇가지 인자를 추가해 Underscore.js와 가깝게 고쳐볼 수 있다.

- 코드 1-29 인자 늘리기

```javascript
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

기존의 코드는 `iteratee(list[i])` 처럼 하나의 인자를 넘겼지만 이제는 `iteratee(list[i], i, list)` 처럼 두 개의 인자를 추가했다.

`iteratee`와 `predicate` 함수가 받는 인자가 많아져 조금 더 많은 일을 할 수 있게 되었다.

- 코드 1-30 `predicate`에서 두 번째 인자 사용하기

```javascript
console.log(
  _.filter([1, 2, 3, 4], function (val, idx) {
    return idx > 1;
  })
); // [3, 4]
console.log(
  _.filter([1, 2, 3, 4], function (val, idx) {
    return idx % 2 == 0;
  })
); // [1, 3]
```

`_.filter` 함수의 `predicate` 함수에 두 번쨰 인자로 `i`가 넘어와 위와 같은 함수 조합도 가능해졌다.

<sub id="2021-03-02"><sup>-- 2021-03-02 --</sup></sub>

## 1.3.5 function identity(v) { return v; } 이건 어디다 쓰는거지?

아래의 `identity` 함수는 Underscore.js에 있는 함수다.

- 코드 1-31 `_.identity`

```javascript
_.identity = function (v) {
  return v;
};
var a = 10;
console.log(_.identity(a)); // 10
```

함수를 정희하고 실행하였더니 받은 인자를 그대로 반환하는 함수다.

`_.idnetity` 함수는 아래와 같은 경우에 사용할 수 있다.

- 코드 1-32 `predicate`로 `_.identity`를 사용한 경우

```javascript
console.log(_.filter([true, 0, 10, 'a', false, null], _.identity));
// [true, 10, 'a']
```

`_.filter`를 `_.identity`와 함께 사용했더니 참으로 판단되는 값들만 남았다.

> `false`, `undefined`, `null`, `0`, `NaN`, `""`은 모두 거짓으로 판단되는 값이다.

`_.identity`와 다른 고차함수를 조합하면 여러 유용한 함수를 만들 수 있다.

- <span id="code-1-33">코드 1-33</span> `some`, `every` 만들기 1

```javascript
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

`_.some` 함수는 배열에 들어있는 값 중 하나라도 참 값이면 `true`를 하나도 없다면 `false`를 반환하며 `_.every` 함수는 모두 참 값이면 `true`를 반환한다.

## 1.3.6 연산자 대신 함수로

[코드 1-33](#code-1-33)의 `_.every` 함수는 `filter`를 사용했기 때문에 항상 반복문을 끝까지 돌게된다.

아래와 같이 함수를 두 개를 더 만들면 로직을 개선할 수 있다.

- 코드 1-34 아주 작은 함수 `not`, `beq`

```javascript
function not(v) { return !v; }
function beq(a) {
  return function(b) {
    return a === b;
  }
}
```

`!`과 `===` 연산자를 이용해도 되지만 `not`, `beq` 함수로 연산자를 대신 작성했다.

- 코드 1-35 `some`, `every` 만들기 2

```javascript
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

`not` 함수는 연산자가 아닌 함수이기 때문에 `_.findIndex` 함수와 함께 사용할 수 있다.

개선된 `_.every` 함수는 중간에 거짓 값을 한 번이라도 만나면 루프가 중단되고 부정적인 값이 없다면 `-1`을 반환한다.

`-1`이 나왔다면 `beq(-1)`이 반환한 함수에 인자로 넘어가 `true`가 나오게 된다.

`_.findIndex` 함수로 거짓 값을 하나도 찾지 못했다는 얘기는 모두 참 값만 존재하는 것이다.

- 코드 1-36 함수 쪼개기

```javascript
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

함수가 하나의 일만 할 수 있도록 아래와 같이 함수를 조금 더 쪼갤 수 있다.

함수를 쪼개면서 `positive`와 `negativeIndex`라는 재사용 가능한 함수도 얻을 수 있다.

## 1.3.7 함수 함성

함수를 쪼갤수록 함수의 합성은 더 쉬워지며 Underscore.js에서는 `_.compose` 함수를 이용해 함수를 합성한다.

`_.compose` 함수는 오른쪽 함수의 결과를 왼쪽 함수에게 전달하는 방식의 고차 함수다.

- 코드 1-37 `_.compose`

```javascript
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
  return 'hi: ' + name;
};
var exclaim = function (statement) {
  return statement.toUpperCase() + '!';
};
var welcome = _.compose(greet, exclaim);
console.log(welcome('moe')); // hi: MOE!
```

`welcome` 함수를 실행하면 먼저 `exclaim` 함수를 실행하며 `"moe"`를 인자로 넘겨준다.

`exclaim`의 결과는 대문자로 변환된 `"MOE"`가 되고 그 결과는 `greet`의 인자로 넘어가 최종적으로 `"hi: MOE!"`가 반환되게 된다.

`_.compose` 함수를 이용해 `_.some`, `_.every` 함수를 만들 수 있다.

- 코드 1-38 `_.compose`로 함수 합성하기

```javascript
_.some = _.compose(not, not, positive);
_.every = _.compose(beq(-1), negativeIndex);
```

`_.compose` 함수를 이용해 `_.some`과 `_.every` 함수를 더 간결하게 포현할 수 있어졌다.

**값 대신 함수**로, **for와 if 대신 고차 함수와 보조 함수**로, 연**산자 대신 함수**로, **함수 합성** 등 함수적 기법을 사용하면 코드도 간결해지고 로직을 명확하게 전달할 수 있게 된다.

또한 인자 선언이나 변수 선언이 적어 유지보수 하기 쉬우며 테스트 또한 작성하기 쉬워지게 된다.

작게 쪼개다 보면 쓸모 없어 보이는 함수가 많이 나오기도 하지만 작은 단위로 쪼개 다 보면 재사용성이 높고 재밌는 코드들이 나오게 될 것이다.

<sub id="2021-03-03"><sup>-- 2021-03-03 --</sup></sub>

[[이전으로]](../chapter1-2/README.md) / [[목록으로]](../README.md) / [[다음으로]](../chapter1-4/README.md)