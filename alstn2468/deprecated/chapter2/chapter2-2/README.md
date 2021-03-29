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

`new Funcion`이나 `eval`을 이용하는 방법은 보안 문제가 있다는 이야기가 많다.

하지만 서버에서 클라이언트가 보낸 값을 이용해 `new Function`이나 `eval`을 사용하는 것이 아니라면 보안 문제는 있을 수 없다.

서버에서도 마찬가지로 서버에서 생성한 값만으로 `new Function`이나 `eval`을 사용하면 보안적 문제가 생기지 않는다.

보안과 `eval`의 직접적인 연관은 없으며, 어디까지나 보안에 대한 과제는 클라이언트의 요청에 대해 서버에서 응답을 줘도 될 것인지 안될 것인지 판단하는데 달려 있다.

또한 `new Function`이나 `eval`을 성능상 이유를 사용하지 말라고도 한다.

`eval`은 문자열을 자바스크립트 코드로 변환해야 하기 때문에 일반 코드에 비해 느린 것은 당연하다.

하지만 해당 기법을 대체할 기능이 없다면 기법이 느리든 빠르든 사용해야 한다.

자바스크립트로 HTML 템플릿 엔진을 만든다거나, 기타 특정 상황에서는 `new Function`이 꼭 필요할 때가 있다.

- 코드 2-28 `eval`과 `new Function` 사용법

```javascript
var a = eval('10 + 5');
console.log(a); // 15
var add = new Function('a', 'b', 'return a + b;');
console.log(add(10, 5)); // 15
```

`eval`과 `new Function`은 위 코드와 같이 사용할 수 있다.

## 2.2.6 간단 버전 문자열 화살표 함수와 new Function 성능

화살표 함수는 ES6에서 사용할 수 있다.

ES5 환경에서도 화살표 함수의 짧고 간결한 표현을 사용하고 싶다면 아래와 같이 만들어 사용할 수 있다.

- 코드 2-29 간단 버전 문자열 화살표 함수

```javascript
function L(str) {
  var splited = str.split('=>');
  return new Function(splited[0], 'return (' + splited[1] + ')');
}

console.log(L('n => n * 10')(10)); // 100
console.log(L('n => n * 10')(20)); // 200
console.log(L('n => n * 10')(30)); // 300
console.log(L('a, b => a + b')(10, 20)); // 30
console.log(L('a, b => a + b')(10, 5)); // 15
```

문자열에서 =>를 기준으로 나눠 앞부분을 `new Function`의 첫 번째 인자에 넣었다.

`new Function`의 첫 번째 인자는 함수의 인자 선언붕 사용될 코드가 된다.

`split[1]`은 함수의 몸통 부분으로 사용된다.

`L`을 사용하면 간단한 한 줄짜리 코드를 화살표 함수처럼 작성할 수 있다.

- 코드 2-30 10,000번 선언해보기

```javascript
console.time('익명 함수');
for (var i = 0; i < 10000; i++) {
  (function (v) {
    return v;
  })(i);
}
console.timeEnd('익명 함수'); // 익명 함수: 1.811ms

console.time('new Function');
for (var i = 0; i < 10000; i++) {
  L('v => v')(i);
}
console.timeEnd('new Function'); // new Function: 15.273ms
```

둘 다 동일한 일을 하지만 함수를 선언하는데 소요된 시간의 차이가 크다.

- 코드 2-31 익명 함수와 문자열 화살표 함수

```javascript
console.time('1');
var arr = Array(10000);
_.map(arr, function (v, i) {
  return i * 2;
});
console.timeEnd('1'); // 1: 1.706ms

console.time('2');
_.map(arr, L('v, i => i * 2'));
console.timeEnd('2'); // 2: 2.861ms
```

_.map을 이용해 length가 10,000인 배열을 돌면서 i를 곱해 [0, 2, 4, ...]의 새로운 배열 객체를 만드는 코드를 이용해 성능을 비교했다.

위의 코드에서는 성능 차이가 거의 존재하지 않는다.

위의 예제를 잘 확인해보면 10,000번 반복되었지만 `new Function`은 한 번만 실행된다.

L 함수는 한 번만 실행되었고 한 번의 `new Function`으로 만들어진 함수를 iteratee로 _.map에 넘겼다.

_.map의 입장에서는 함수가 일반 자바스크립트로 정의되었든 `new Function`으로 정의되었든 그저 함수일 뿐이다.

- 코드 2-32 `eval`로 한 번 더 감싼 경우

```javascript
console.time('3');
var arr = Array(10000);
_.map(arr, eval("L('v, i => i * 2')"));
console.timeEnd('3'); // 3: 1.757ms
```

`eval`을 사용해 한 번 더 감싸도 성능 차이는 거의 없다.

크게 느리지 않은 것도 사실이지만 분명히 성능의 차이는 존재한다.

- 코드 <span id="code-2-33">2-33</span> 300배의 성능 차이

```javascript
console.time('4');
var arr = Array(10000);
_.map(arr, function (v, i) {
  return (function (v, i) {
    return i * 2;
  })(v, i);
});
console.timeEnd('4'); // 4: 2.649ms

console.time('5');
var arr = Array(10000);
_.map(arr, function (v, i) {
  return L('v, i => i * 2')(v, i);
});
console.timeEnd('5'); // 5: 18.288ms
```

두 경우 모두 10,000번의 루프를 돌며 계속해서 새로운 함수를 생성하여 즉시 실행하는데, 둘의 성능 차이가 크다.

하지만 위와 같은 상황에서 `new Function`을 사용해도 성능 이슈를 없앨 수 있다.

- 코드 2-34 메모제이션(memoization) 기법

```javascript
function L(str) {
  var splited = str.split('=>');
  return new Function(splited[0], 'return (' + splited[1] + ')');
}

function L2(str) {
  if (L2[str]) return L2[str];
  var splited = str.split('=>');
  return (L2[str] = new Function(splited[0], 'return (' + splited[1] + ')'));
}
```

기존의 L을 간단하게 고쳐 L2 함수를 생성했다.

L2 함수는 이전에 들어왔던 것과 같은 인자가 들어오면 새롭게 생성하지 않고 원래 있던 함수를 반환한다.

이전에 들어왔던 문자열과 동일한 문자열로 작성된 화살표 함수 표현식이 들어오면, 기존에 만들어 둔 함수를 활용한다.

- 코드 2-35 코드 구조는 그대로지만 성능은 다시 좋아졌다.

```javascript
console.time('6');
var arr = Array(1000);
_.map(arr, function (v, i) {
  return L2('v, i => i * 2')(v, i);
});
console.timeEnd('6'); // 6: 0.384ms
```

함수도 객체라는 점과 객체의 키를 []를 통해 동적으로 정할 수 있다는 점을 활용했다.

[코드 2-33](#code-2-33)의 익명 함수를 이용한 코드보다 더 빠르게 코드가 실행되었다.

코드 2-33의 코드는 익명 함수를 매번 생성하지만, 위의 예시는 L2 함수를 통해 함수를 한 번만 생성하고, 다시 들어왔을 때는 기존에 만들어진 함수를 참조만 하기 때문이다.

- 코드 2-36 Partial.js의 문자열 화살표 함수

```javascript
var _ = {};

try {
  var has_lambda = true;
  eval('a=>a');
} catch (err) {
  var has_lambda = false;
}
_.l = _.lambda = function f(str) {
  if (typeof str !== 'string') return str;
  if (f[str]) return f[str]; // (1)
  if (!str.match(/=>/))
    return (f[str] = new Function('$', 'return (' + str + ')')); // (2)
  if (has_lambda) return (f[str] = eval(str)); // (3)
  var ex_par = str.split(/\s*=>\s*/);
  return (f[str] = new Function( // (4)
    ex_par[0]
      .replace(
        /(?:\b[A-Z]|\.[a-zA-Z_$])[a-zA-Z_$\d]*|[a-zA-Z_$][a-zA-Z_$\d]*\s*:|this|arguments|'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"/g,
        ''
      )
      .match(/([a-z_$][a-z_$\d]*)/gi) || [],
    'return (' + ex_par[1] + ')'
  ));
};

console.log(_.l('(a, b) => a + b')(10, 10)); // 20
console.log(_.l('a => a * 5')(10)); // 50
console.log(_.l('$ => $ * 10')(10)); // 100

console.log(_.l('$ * 10')(10)); // 100
console.log(_.l('++$')(1)); // 2
```

1에서 동일한 str이 들어오면 캐시된 함수를 반환한다.

3에서 화살표 함수가 정식 지원되고 있는 경우에 ES6에게 위임하고 아닐 때는 4에서 `new Function`을 활용한다.

2에서 ES6의 화살표 함수에서 인자를 생략한 더 간단한 문법을 추가로 지원하고 있다.

## 2.2.7 유명(named) 함수

## 2.2.8 유명 함수를 이용한 재귀

## 2.2.9 자바스크립트에서 재귀의 아쉬움

[[이전으로]](..//chapter2-1/README.md) / [[목록으로]](../README.md) / [[다음으로]](../chapter2-3/README.md)