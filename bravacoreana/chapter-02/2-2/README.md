
## 2.2 함수 정의 다시 보기

[2.2.1 기본 정의](#2-2-1)<br/>
[2.2.2 호이스팅](#2-2-2)<br/>
[2.2.3 호이스팅 활용하기](#2-2-3)<br/>
[2.2.4 괄호 없이 즉시 실행하기](#2-2-4)<br/>
[2.2.5 new Function이나 eval을 써도 될까요?](#2-2-5)<br/>
[2.2.6 간단 버전 문자열 화살표 함수와 new Function 성능 ](#2-2-6)<br/>
[2.2.7 유명(named) 함수](#2-2-7)<br/>
[2.2.8 유명 함수를 이용한 재귀](#2-2-8)<br/>
[2.2.9 자바스크립트에서 재귀의 아쉬움](#2-2-9)<br/>

<br/>
<br/>
<br/>

<br/>
<br/>
<br/>
<div id="2-2-1">

### 2.2.1 기본 정의

자바스크립트에서 함수를 정의하는 대표적인 방법은 다음과 같다.

```js
// 코드 2-13.일반적인 함수 정의

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

함수를 정의하는 데 있어서 호이스팅을 확인 해 볼 필요가 있다.

<br/>
<br/>
<br/>
<div id="2-2-2">

### 2.2.2 호이스팅

`호이스팅(hoisting)`이란 변수나 함수가 어디서 선언되든지 해당 스코프 최상단에 위치하게 되ㅓ 동일 스코프 어디서든 참조 할 수 있는 것을 말한다. 

```js
// 코드 2-14. 에러가 나는 상황이지만 호이스팅이다

console.log(add1(10, 5)); // 15
add2(10, 5); // TypeError: add2 is not a function

function add1(a, b) {
  return a + b;
}

var add2 = function (a, b) {
  return a + b;
};
```

`코드 2-14`의 `add1` 과 `add2`에는 호이스팅이 적용된다. 여기서 `add2`가 실행이 안되기 때문에 호이스팅이 아니라고 생각할 수 있겠지만, 그것은 오해다. 물론 add2는 선헌하기 전 라인에서 실행할 수 없다. 하지만 분명히 add2도 호이스팅이 적용된 것이다. 선언은 되었지만 아직 초기화되지 않은 상태에서 실행했기 때문에 에러가 난 것이다.

여기서 우리가 짚고 넘어가야 할 중요한 키워드가 두 개 있다. 👉🏼 `선언`, `참조`

예제에서 `add2`는 실행되지 않았고, `add2 is not a function` 이라는 에러 메세지가 출력되었다. 그렇다면 선언 한 적이 없는 함수를 실행하면 어떻게 될까?

```js
// 코드 2-15. 선언한 적 없는 함수 실행

hi(); // hi is not defined
```

선언한 적이 없는 함수를 실행하면 에러 메세지(`hi is not defined`)가 다르다. 자바스크립트에서는 아예 선언된 적이 없는 것을 참조하려고 할 때 이런 에러가 난다. 실행하지 않고 참조만 하려고 해도 동일한 에러가 난다.

```js
// 코드 2-16. 선언한 적 없는 변수 참조하기

var a = hi; // ReferenceError: hi is not defined
```

이 에러 메세지는 코드 2-14의 add2를 실행했을 때 출력된 메세지 `add2 is not a function`과는 다르다. 코드 2-14에서의 에러는 호이스팅에 의해 참조는 가능하지만 아직 function은 아니라는 에러고, 코드 2-15와 코드 2-16의 에러는 선언되지 않았다는 에러다. 

- 코드 2-14: `add is not a function` - "참조는 가능한데 아직 함수는 아니야"
- 코드 2-15 & 코드 2-16: `hi is not defined` - "아직 선언이 안됐는데?"


```js
// 코드 2-17. 실행하지 않고 참조만 해보기

console.log(add1); // [Function: add1]
console.log(add2); // undefined

function add1(a, b) {
  return a + b;
}
var add2 = function (a, b) {
  return a + b;
};
```

이번에 `add2`는 에러가 나지 않았고 `undefined`가 출력되었다. 그렇다면 왜 add1 은 실행이 되고 add2 는 실행이 안되는 걸까?

이는 **변수 선언과 함수 선언에서의 차이** 때문이다. 변수는 선언 단계와 초기화 단계가 구분되어 있다. 변수는 선언과 초기화가 동시에 이루어지지 않기 때문에 호이스팅에 의해 참조만 가능하고, 아직 값이 담기지 않아 실행은 불가능하다. 반면에 함수 선언은 선언과 동시에 초기화가 이루어지기 때무에 참조 뿐 아니라 실행도 가능하다.

- 변수: 선언과 초기화가 동시에 이루어지지 않음 👉🏼 선언 X 참조 O
- 함수: 선언과 동시에 초기화가 이루어짐 👉🏼 선언 O 참조 O

호이스팅에 의해 add1은 미리 실행할 수 있고, add2는 호이스팅에 의해 미리 참조할 수 있지만 값이 없어 실행할 수는 없다.

<br/>
<br/>
<br/>
<div id="2-2-3">

### 2.2.3 호이스팅 활용하기

```js
// 코드 2-18. 호이스팅을 이용하여 return 문 아래애 함수 선언하기

function add(a, b) {
  return valid() ? a + b : new Error();
  function valid() {
    return Number.isInteger(a) && Number.isInteger(b);
  }
}

console.log(add(10, 5)); // 15
console.log(add(10, "a")); // Error(...)
```

위와 같이 return 문 아래에 정의한 함수도 실행이 가능하다. 코드 2-18과 같은 스타일의 코드는 어떤 곳에서는 추천하지 않기도 하지만, 이런 기법이 유용할 때가 있다. 

```js
// 코드 2-19. 호이스팅을 이용해 코드의 순서를 이해하기 편하게 배치

// [1] end 가 먼저 정의되어 코드가 다소 복잡하게 읽힌다.
app.post("/login", function (req, res) {  
  db.select( "users", { where: { email: req.body.email } }, function (err, user) {
      function end(user) {
        req.session.user = user;
        res.redirect("/");
      }

      if (user && user.password === req.body.password) return end(user);
      
      db.insert("users", {
          email: req.body.email,
          password: req.body.password,
        }, function (err, user) {
          end(user);
        });
    });
});

// [2] 호이스팅 덕분에 end를 나중에 정의해도 잘 동작한다. 읽기 더 편하다.
app.post("/login", function (req, res) {    // 3
  db.select("users", { where: { email: req.body.email } }, function (err, user) {
      if (user && user.password === req.body.password) return end(user);
      db.insert(
        "users", {
          email: req.body.email,
          password: req.body.password,
        }, function (err, user) {
          end(user);
        });
      function end(user) {
        req.session.user = user;
        res.redirect("/");
      }
    });
});
```

이 코드는 Node.js와 Express.js 등으로 개발하는 상황에서 호이스팅을 이용해 코드의 가독성을 높인 사례다. 여기에서 클로저가 사용되었다고 메모리 누수를 걱정할 필요는 없다. end 에서 res, req를 사용하기 때문에 end는 클로저다. 

<small>
--- 오타에서 막혔엉... 뭘까..뭐였을까...
</small>

<br/>
<br/>
<br/>

<div id="2-2-4">

### 2.2.4 괄호 없이 즉시 실행하기

```js
// 코드 2-20. 일반적인 즉시 실행 방식

(function (a) {
  console.log(a);
})(100); // 100
```

자바스크립트에서는 위와 같이 괄호를 통해 익명 함수를 즉시 실행할 수 있다. 괄호 없이 실행하면 어떻게 될까?

```js
// 코드 2-21. 에러가 난 경우

function (a) {
    console.log(a);
  }(100); // SyntaxError: Function statements require a function name
```

에러가 났다! 왜? 익명 함수를 잘못 실행한 것이 아니라 익명 함수 선언 자체가 실패했기 때문이다. 다음 예제를 보면 쉽게 알 수 있다.

```js
// 코드 2-22. 선언만 시도해도 에러가 나는 경우

function() {}
// SyntaxError: Function statements require a function name
```

실행 없이 선언만 시도해도 에러가 난다. 그런데 우리는 이와 비슷한데 에러가 나지 않는 코드를 봤었다.

```js
// 코드 2-23. 괄호 없이 정의했는데 에러가 나지 않는 경우

function f1() {
  return function () {};
}

f1();
console.log(f1()); //[Function (anonymous)]
```

위 코드는 함수를 괄호로 감싸지 않았는데 문법 에러가 나지 않고 정상적으로 동작한다. 이 상황에서 에러가 나지 않는다면 괄호 없이 즉시 실행도 되지 않을까?


```js
// 코드 2-24. 괄화 없이 즉시 실행했는데 에러가 나지 않는 경우

function f1() {
  return (function (a) {
    console.log(a);
  })(1);
}

f1(); // 1
```

f1이라는 함수 안에 있는 익명 함수는 괄호 없이도 즉시 실행되었다. 만일 `f1`이라는 함수의 `return` 바로 뒤에서 함수를 즉시 실행하고 싶다면, 그 상황에서는 괄호 없이도 익명 함수를 즉시 실행할 수 있다. 

```js
// 코드 2-25. 괄호 없이 정의가 가능한(즉시 실행도 가능한) 다양한 상황

!(function (a) {
  console.log(a);
})(1);

true &&
  (function (a) {
    console.log(a);
  })(1);

1
  ? (function (a) {
      console.log(a);
    })(1)
  : 5;

0,
  (function (a) {
    console.log(a);
  })(1);

var b = (function (a) {
  console.log(a);
})(1);

function f2() {}
f2(
  (function (a) {
    console.log(a);
  })(1)
);

var f3 = (function c(a) {
  console.log(1);
})(1);  

new (function () {
  console.log(1);
})();
```

<br/>
<br/>
<br/>
<div id="2-2-5">

### 2.2.5 new Function이나 eval을 써도 될까요?
<br/>
<br/>
<br/>
<div id="2-2-6">

### 2.2.6 간단 버전 문자열 화살표 함수와 new Function 성능 
<br/>
<br/>
<br/>
<div id="2-2-7">

### 2.2.7 유명(named) 함수
<br/>
<br/>
<br/>
<div id="2-2-8">

### 2.2.8 유명 함수를 이용한 재귀
<br/>
<br/>
<br/>
<div id="2-2-9">

### 2.2.9 자바스크립트에서 재귀의 아쉬움



