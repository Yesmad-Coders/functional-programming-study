# 2.2 함수 정의 다시 보기

## 2.2.1 기본 정의

자바스크립트에서 함수를 정의하는 방법은 아래와 같이 다양하다.

- 코드 2-13 일반적인 함수 정의

```javascript
function add1(a, b) {
  return a + b;
}
var add2 = function (a, b) {
  return a + b;
};
var m = {
  add3: function (a, b) {
    return a + b;
  },
};
```

함수를 정의하는 것은 이미 익숙하겠지만 호이스팅에 대해서 한번 확인할만하다.

## 2.2.2 호이스팅

호이스팅은 변수나 함수가 어디서 선언되든지 해당 스코프 최상단에 위치하게 되어 동일 스코프 어디서든 참조할 수 있는 것을 말한다.

- 코드 <span id="code-2-14">2-14</span> 에러가 나는 상황이지만 호이스팅이다

```javascript
console.log(add1(10, 5)); // 15
console.log(add2(10, 5)); // TypeError: add2 is not a function

function add1(a, b) {
  return a + b;
}
var add2 = function (a, b) {
  return a + b;
};
```

위 코드의 add1과 add2에는 호이스팅이 적용된다.

add2는 오류가 발생하며 실행이 되지 않았지만 분명 호이스팅이 적용된 것이다.

- 코드 2-15 선언한 적 없는 함수 실행

```javascript
hi(); // ReferenceError: hi is not defined
```

add2 함수가 실행되지 않은 이유는 선언되지 않은 것이 아니라 초기화되지 않았기 때문이다.

위의 코드의 경우 add2 함수를 호출한 것과 에러 메시지가 다르다.

- 코드 2-16 선언한 적 없는 변수 참조하기

```javascript
var a = hi; // ReferenceError: hi is not defined
```

마찬가지로 실행하지 않고 참조만 하려고 해도 동일한 오류가 발생한다.

[코드 2-14](#code-2-14)의 에러는 호이스팅에 의해 참조는 가능하지만 아직 함수가 아니기 때문에 발생하는 오류다.

- 코드 2-17 실행하지 않고 참조만 해보기

```javascript
console.log(add1); // [Function: add1]
console.log(add2); // undefined
function add1(a, b) {
  return a + b;
}
var add2 = function (a, b) {
  return a + b;
};
```

위의 코드에서는 오류가 발생하지 않고 undefined만 출력되었다.

add1과 add2의 차이는 변수 선언과 함수 선언에서의 차이가 존재한다.

변수는 선언 단계와 초기화 단계가 구분이 되어있어 선언과 초기화가 동시에 이루어지지 않는다.

따라서 호이스팅에 의해 참조만 가능하고 아직 값이 담기지 않아 실행은 불가능하다.

<sub id="2021-03-21"><sup>-- 2021-03-21 --</sup></sub>

## 2.2.3 호이스팅 활용하기

함수 선언과 호이스팅을 이용하면 아래와 같이 코드를 작성할 수 있다.

- 코드 2-18 호이스팅을 이용하여 return문 아래에 함수 선언하기

```javascript
function add(a, b) {
  return valid() ? a + b : new Error();

  function valid() {
    return Number.isInteger(a) && Number.isInteger(b);
  }
}

console.log(add(10, 5)); // 15
console.log(add(10, 'a')); // Error
```

return문 아래에 정의한 함수도 실행이 가능하며 복잡한 코드를 하단에 정의하고 실행부 코드는 깔끔하게 유지하는 방법으로 활용할 수 있다.

위 코드는 어떤 스타일 가이드에서는 권장하지 않는 형식이지만 아래와 같이 유용하게 사용될 수 있다.

- 코드 2-19 호이스팅을 이용해 코드의 순서를 이해하기 편하게 배치

```javascript
// 1 - end가 먼저 정의되어 코드가 다소 복잡하게 읽힌다.
app.post('/login', function (req, res) {
  db.select('users', {
    where: { email: req.body.email },
    function(err, user) {
      function end(user) {
        req.sesson.user = user;
        res.redirect('/');
      }

      if (user && user.password === req.body.password) return end(user);

      db.insert(
        'users',
        {
          email: req.body.email,
          password: req.body.password,
        },
        function (err, user) {
          end(user);
        }
      );
    },
  });
});

// 2 - 호이스팅 덕분에 end를 나중에 정의해도 잘 동작한다.
app.post('/login', function (req, res) {
  db.select('users', {
    where: { email: req.body.email },
    function(err, user) {
      if (user && user.password === req.body.password) return end(user);

      db.insert(
        'users',
        {
          email: req.body.email,
          password: req.body.password,
        },
        function (err, user) {
          end(user);
        }
      );

      function end(user) {
        req.sesson.user = user;
        res.redirect('/');
      }
    },
  });
});
```

이 코드는 Node.js와 Express.js 등으로 개발하는 상황에서 호이스팅을 이용해 코드의 가독성을 높인 사례다.

1을 보면 end는 마지막에 실행되지만 코드가 먼저 나와있어 실행 순서와 달라 읽기가 불편하다.

2는 이런 점을 개선하기 위해 호이스팅의 특성을 활용하여 좀 더 읽기 좋은 코드로 만들었다.

## 2.2.4 괄호 없이 즉시실행하기

- 코드 2-20 일반적인 즉시 실행 방식

```javascript
(function (a) {
  console.log(a); // 100
})(100);
```

자바스크립트에서는 위와 같이 괄호를 통해 익명 함수를 즉시 실행할 수 있다.

- 코드 2-21 에러가 난 경우

```javascript
function (a) {
  console.log(a);
}(100);
// SyntaxError: Function statements require a function name
```

위와 같이 괄호 없이 익명 함수를 실행하면 오류가 발생한다.

오류가 발생한 이유는 익명 함수를 잘못 실행한 것이 아니라 익명 함수 선언 자체가 실패했기 때문이다.

- 코드 2-22 선언만 시도해도 에러가 나는 경우

```javascript
// SyntaxError: Function statements require a function name
function () {
}
```

위의 코드에서 익명 함수는 실행 없이 선언만 시도해도 오류가 발생한다.

- 코드 2-23 괄호 없이 정의했는데 에러가 나지 않는 경우

```javascript
function f1() {
  return function () {
  }
}
f1();
```

위 코드는 함수를 괄호로 감싸지 않았는데 문법 오류가 발생하지 않고 정상적으로 동작한다.

- 코드 2-24 괄호 없이 즉시 실행했는데 에러가 나지 않는 경우

```javascript
function f1() {
  return function (a) {
    console.log(a); // 1
  }(1);
}
f1();
```

위 코드도 정상적으로 동작한다. f1이라는 함수 안에 있는 익명 함수는 괄호 없이도 즉시 실행이 된다.

- 코드 2-25 괄호 없이 정의가 가능한(즉시 실행도 가능한) 다양한 상황

```javascript
!function (a) {
  console.log(a); // 1
}(1);

true && function (a) {
  console.log(a); //1
}(1);

1 ? function (a) {
  console.log(a); // 1
}(1) : 5;

var b = function (a) {
  console.log(a); // 1
}(1);

function f2() {}
f2(function (a) {
  console.log(a); // 1
}(1));

var f3 = function c(a) {
  console.log(a); // 1
}(1);

new function() {
  console.log(1);
}
```

위와 같은 상황들에서는 괄호없이도 익명 함수를 즉시 실행할 수 있다.

이 상황들의 공통점은 연산자와 함께 있고, 함수가 값으로 다루어 졌다.

그리고 모두 익명 함수 선언에 대한 오류가 발생하지 않는다.

함수를 정의할 수 있는 곳이라면 그곳이 어디든 실행도 할 수 있다.

연산자의 피연산자가 되거나 return 등과 함께 사용되면 익명 함수를 선언할 수 있게 되고 익명 함수를 선언할 수 있으면 즉시 실행도 할 수 있다.

- 코드 2-26 객체 생생하기

```javascript
var pj = new function () {
  this.name = 'PJ';
  this.age = 28;
  this.constructor.prototype.hi = function () {
    console.log('hi');
  };
};
console.log(pj); // { name: 'PJ', age: 28 }
pj.hi(); // hi
```

위와 같이 코드를 작성하면 함수를 즉시 실행해 객체를 하나 만들 수도 있다.

이처럼 값으로 함수를 잘 다룰 수 있다면 즉시 실행도 자유롭게 잘 다룰 수 있다.


- 코드 2-27 즉시 실행하며 this 할당하기

```javascript
var a = function (a) {
  console.log(this, a); // [1], 1
}.call([1], 1);
```

함수의 call 메서드를 바로 `.`으로 접근할 수 도 있으며 익명 함수를 즉시 실행하면서 this를 할당할 수도 있다.

<sub id="2021-03-22"><sup>-- 2021-03-22 --</sup></sub>

## 2.2.5 new Function이나 eval을 써도 될까요?

## 2.2.6 간단 버전 문자열 화살표 함수와 new Function 성능

## 2.2.7 유명(named) 함수

## 2.2.8 유명 함수를 이용한 재귀

## 2.2.9 자바스크립트에서 재귀의 아쉬움

[[이전으로]](..//chapter2-1/README.md) / [[목록으로]](../README.md) / [[다음으로]](../chapter2-3/README.md)