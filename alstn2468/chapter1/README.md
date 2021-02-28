# 1장 함수형 자바스크립트 소개

<details><summary>Table of Contents</summary>

- 1.1 함수형 프로그래밍 그거 먹는 건가요? [:link:](#11-함수형-프로그래밍-그거-먹는-건가요)
- 1.2 함수형 자바스크립트의 실용성 [:link:](#12-함수형-자바스크립트의-실용성)
- 1.3 함수형 자바스크립트의 실용성 2 [:link:](#13-함수형-자바스크립트의-실용성-2)

</details><br/>

모든 프로그래밍 패러다임은 성공적인 프로그래밍을 위해 존재한다.

좋은 프로그램의 척도에는 사용성, 성능, 확장성, 기획 변경에 대한 대응력 등이 있다.

이것들을 효율적이고 생산적으로 이루는 일이 성공적인 프로그래밍이다.

> **함수형 프로그래밍**은 성공적인 프로그래밍을 위해 부수 효과를 최대한 멀리하고 조합성을 강조하는 프로그래밍 패러다임이다.

함수형 프로그래밍이 부수효과를 최대한 멀리하는 이유

- 오류를 줄이기 위해
- 조합성 혹은 모듈화 수준을 높이기 위해

높은 모듈화 수준은 생산성을 높이고, 오류 없는 함수들의 조합은 프로그램 전체의 안정성을 높여 준다.

## 1.1 함수형 프로그래밍 그거 먹는 건가요?

### 1.1.1 함수형 자바스크립트를 검색하면 나오는 예제

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

<sub id="2020-02-24"><sup>-- 2020-02-24 --</sup></sub>

### 1.1.2 값으로써의 함수와 클로저

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

[[GO TO TOP]](#1장-함수형-자바스크립트-소개)

## 1.2 함수형 자바스크립트의 실용성

### 1.2.1 회원 목록 중 여러 명 찾기

아래 코드는 절차지향적으로 작성된 자바스크립트 코드다.

- <span id="code-1-5">코드 1.5<span> for문으로 필터링하기

```javascript
var users = [
  { id: 1, name: 'ID', age: 32 },
  { id: 2, name: 'HA', age: 25 },
  { id: 3, name: 'BJ', age: 32 },
  { id: 4, name: 'PJ', age: 28 },
  { id: 5, name: 'JE', age: 27 },
  { id: 6, name: 'JM', age: 32 },
  { id: 7, name: 'HI', age: 24 },
];

// 1
var temp_users = [];
for (var i = 0, len = users.length; i < len; i++) {
  if (users[i].age < 30) temp_users.push(users[i]);
}
console.log(temp_users.length); // 4

// 2
var ages = [];
for (var i = 0, len = temp_users.length; i < len; i++) {
  ages.push(temp_users[i].age);
}
console.log(ages); // [25, 28, 27, 24]
```

위 코드의 1 부분은 `users` 중에서 `age` 속성의 값이 30 미만인 `users[i]`만 모아 몇 명인지 출력하는 코드다.

2에서는 1에서 얻은 `temp_users`에서 나이만 다시 모아 출력한다.

```javascript
// 3
var temp_users = [];
for (var i = 0, len = users.length; i < len; i++) {
  if (users[i].age >= 30) temp_users.push(users[i]);
}
console.log(temp_users.length); // 3

// 4
var names = [];
for (var i = 0, len = temp_users.length; i < len; i++) {
  names.push(temp_users[i].name);
}
console.log(names); // ["ID", "BJ", "JM"]
```

3에서는 나이가 30이상인 `temp_users`가 몇명인지 출력하고 4에서 `temp_users`에 있는 값들의 이름만 모아 출력한다.

위의 코드를 함수형으로 리팩터링하기 위해 먼저 **중복된 부분**을 찾아야한다.

1과 3의 for문에서 `users`를 순회하며 특정 조건의 `users[i]`를 새로운 배열에 담고있다.

중복을 제거하기 위해서 30이라는 숫자는 변수로 바꿀 수 있겠지만 `.age`, `<`, `>=` 등은 바꾸기 쉽지 않아 보인다.

이럴 떄 함수를 활용하면 이런 부분까지 쉽게 추상화 할 수 있다.

### 1.2.2 for에서 filter로 if에서 predicate로

기존의 코드를 활용해 아래와 같은 `filter` 함수를 만들 수 있다.

- 코드 1-6 `filter`

```javascript
function filter(list, predicate) {
  var new_list = [];
  for (var i = 0, len = list.length; i < len; i++) {
    if (predicate(list[i])) new_list.push(list[i]);
  }
  return new_list;
}
```

`filter` 함수는 `list`와 `predicate` 함수를 받는다.

`predicate` 함수는 `list.length` 만큼 실행되며, `predicate` 함수의 결과가 `true`일 때만 `new_list.push`를 실행한다.

이것은 `new_list.push`의 실행 여부를 `predicate` 함수에게 완전히 **위임**한 것이다.

`filter` 함수는 `predicate` 함수 내부에서 어떤 일을 하는지 모르며 `predicate`의 결과에만 의존한다.

`filter` 함수는 **이전 값의 상태를 변경하지 않고 새로운 값을 만들어 반환**하게 되는데 이는 함수형 프로그래밍에서 매우 중요하다.

- <span id="code-1-7">코드 1-7</span> `filter` 사용

```javascript
var users_under_30 = filter(users, function (user) {
  return user.age < 30;
});
console.log(users_under_30.length); // 4

var ages = [];
for (var i = 0, len = users_under_30.length; i < len; i++) {
  ages.push(users_under_30[i].age);
}
console.log(ages); // [25, 28, 27, 24];

var users_over_30 = filter(users, function (user) {
  return user.age >= 30;
});
console.log(users_over_30.length); // 3

var names = [];
for (var i = 0, len = users_over_30.length; i < len; i++) {
  names.push(users_over_30[i].name);
}
console.log(names); // ["ID", "BJ", "JM"]
```

`filter` 함수를 실행하며 `predicate` 자리에 이름이 없는 익명 함수를 정의해 전달했다.

[코드 1-5](#code-1-5)와 비교해 코드가 꽤 짧아졌으며 사용성 높은 함수 `filter`를 하나 얻을 수 있었다.

### 1.2.3 함수형 프로그래밍 관점으로 filter 보기

`filter` 함수에는 for도 있고 if도 있지만 **동일한 인자를 받으면 항상 동일하게 동작하는 함수**다.

`filter` 함수의 로직은 외부나 내부의 **어떤 상태 변화에도 의존하지 않는다**.

`new_list`는 이 함수에서 최초로 만들어 졌고 외부에서 어떠한 접근도 할수 없기 때문에 `filter`의 결과도 달라질 수 없다.

```javascript
filter(users, function (user) {
  return user.age < 30;
});
```

`filter`를 사용한 코드를 보면 `users`와 `filter`가 사용한 `true`인지 `false`인지 반환하는 `predicate` 함수만 존재한다.

코드에는 for도 없으며 if도 없고 별도의 로직이 없고 매우 단순하고 쉽다.

- 절차지향 프로그래밍: 위에서 아래로 내려가며 특정 변수의 값을 변경해 나가는 식으로 로직을 만든다.
- 객체지향 프로그래밍: 객체들을 만들어 놓고 객체들 간의 협업을 통해 로직을 만든다.
- 항수형 프로그래밍: **항상 동일하게 동작하는 함수**를 만들고 보조 함수를 조합하는 식으로 로직을 만든다.

함수형 프로그래밍은 함수 내부에서 관리하고 있는 상태를 따로 두지않고 넘겨진 인자에만 의존한다.

**즉 동일한 인자가 들어오면 항상 동일한 값을 리턴하도록 한다.**

**보조 함수 역시 인자**이며, 보조 함수에서도 상태를 변경하지 않으면 보조 함수를 받은 함수는 항상 동일한 결과를 만드는 함수가 된다.

함수형 프로그래밍은 **부수 효과**를 최소화하는 것이 목표에 가깝다.

<sub id="2020-02-25"><sup>-- 2020-02-25 --</sup></sub>

### 1.2.4 map 함수

리팩토링의 핵심은 **중복을 제거하고 의도를 드러내는 것**이다.

[코드 1-5](#code-1-7)에서 회원 목록을 통해 나이와 이름을 추출하는데 두 코드에도 중복이 존재한다.

두 코드 모두 for문에서 원본 배열과 1:1로 매핑되는 다른 값을 만들어 담고 있다.

기존 코드를 활용해 `map`이라는 함수를 만들어볼 수 있다.

- 코드 1-8 `map`

```javascript
function map(list, iteratee) {
  var new_list = [];
  for (var i = 0, len = list.length; i < len; i++) {
    new_list.push(iteratee(list[i]));
  }
  return new_list;
}
```

`map` 함수는 `new_list`에 무엇을 `push`할지에 대해 `iteratee` 함수에 위임했다.

- 코드 1-9 `map` 사용

```javascript
var users_under_30 = filter(users, function (user) {
  return user.age < 30;
});
console.log(under_user_30.length); // 4
var ages = map(under_user_30, function (user) {
  return user.age;
});
console.log(ages); // [25, 28, 27, 24]
var users_over_30 = filter(users, function (user) {
  return user.age >= 30;
});
console.log(users_over_30); // 3
var names = map(users_over_30, function (user) {
  return user.name;
});
console.log(names); // ["ID", "BJ", "JM"]
```

코드가 굉장히 단순해지고 for문도 없고 if문도 없다.

### 1.2.5 실행 결과로 바로 실행하기

함수의 리턴값을 바로 다른 함수의 인자로 사용하면 변수의 할당을 줄일 수 있다.

`filter` 함수의 결과가 배열이므로 `map`의 첫 번째 인자로 바로 사용 가능하다.

- 코드 1-10 함수 중첩

```javascript
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

아래와 같이 작은 함수를 하나 더 만들면 변수 할당을 모두 없앨 수 있다.

- <span id="code-1-11">코드 1-11 </span>함수 중첩 2

```javascript
function log_length(value) {
  console.log(value.length);
  return value;
}

console.log(
  log_length(
    map(
      filter(users, function (user) {
        return user.age < 30;
      }),
      function (user) {
        return user.age;
      }
    )
  )
);
// 4
// [25, 28, 27, 24]

console.log(
  log_length(
    map(
      filter(users, function (user) {
        return user.age >= 30;
      }),
      function (user) {
        return user.name;
      }
    )
  )
);
// 3
// ["ID", "BJ", "JM"]
```

`filter` 함수는 `predicate` 함수를 통해 값을 필터링해 `map` 함수에 전달하고 `map`은 전달받은 `iteratee`를 통해 새로운 값을 만들어 `log_length` 함수에 전달한다.

`log_length`는 길이를 출력한 후 받은 인자를 그대로 `console.log`에 전달하고 받은 값을 출력한다.

<sub id="2020-02-28"><sup>-- 2020-02-28 --</sup></sub>

### 1.2.6 함수를 값으로 다룬 예제의 실용성

[코드 1-1](#code-1-1)에서 소개한 `addMaker`와 비슷한 패턴의 함수가 실제로 많이 사용된다.

`addMaker` 함수와 비슷한 패턴의 함수은 `bvalue` 함수를 만들면 [코드1-11](#code-1-11)의 코드를 더 줄일 수 있다.

- 코드 1-13 함수를 리턴하는 함수 `bvalue`

```javascript
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

bvalue('a')({ a: 'hi', b: 'hello' }); // hi
```

`bvalue` 함수를 실행할 때 넘겨준 인자 `key`를 나중에 `obj`를 받을 익명 함수가 기억한다.

`bvalue` 함수의 실행 결과는 `key`를 기억하는 함수이고 객체를 인자로 넘길 수 있다.

`bvalue` 함수에서 반환된 함수는 `obj`를 받아 앞에서 받아 두었던 `key`로 `value` 값을 리턴한다.

- 코드 1-14 `bvalue`로 `map`의 `iteratee` 만들기

```javascript
console.log(
  log_length(
    map(
      filter(users, function (user) {
        return user.age < 30;
      }),
      bvalue('age')
    )
  )
);
// 4
// [25, 28, 27, 24]
```

`map`이 사용할 `iteratee` 함수를 `bvalue`가 반환한 함수로 대체되었으며 익명 함수 선언이 사라져 코드가 더욱 짧아졌다.

## 1.3 함수형 자바스크립트의 실용성 2