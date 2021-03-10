
# 1.4 함수형 자바스크립트를 위한 기초

## 1.4.1 일급 함수

자바스크립트에서 함수는 **일급 객체**이자 **일급 함수**다.

여기에서 **일급**은 값으로 다룰 수 있다는 의미로 아래와 같은 조건을 만족해야 한다.

- 변수에 담을 수 있다.
- 함수나 메서드의 인자로 넘길 수 있다.
- 함수나 메서드에서 리턴할 수 있다.

자바스크립트에서 모든 값은 일급이며 모든 객체는 일급 객체이며 **함수는 객체이자 일급 객체**다.


- 아무 때나(런타임에서도) 선언이 가능하다.
- 익명으로 선언할 수 있다.
- 익명으로 선언한 함수도 함수나 메서드의 인자로 넘길 수 있다.

일급함수는 위와 같은 추가적인 조건을 추가적으로 만족하며 아래의 예시들은 일급 함수의 특징을 표현한다.

- 코드 1-39(1) 값으로 다룰 수 있는 함수

```javascript
function f1() {}
var a = typeof f1 == 'function' ? f1 : function() {};
```

위 코드에서 `f1`은 함수를 값으로 다룰 수 있음을 보여준다. `typeof` 연산자를 사용해 `function`인지 확인하고 변수 `a`에 `f1`을 담고 있다.

- 코드 1-39(2) 함수를 반환하는 함수

```javascript
function f2() {
  return function() {}
}
```

`f2` 함수는 함수를 반환한다.

- 코드 1-39(3) 익명 함수 선언과 즉시 실행 가능한 함수

```javascript
(function (a, b) {
  return a + b;
})(10, 5); // 15
```

`a`와 `b`를 더하는 익명 함수를 선언하고 각각 10, 5를 전달하여 함수 선언 후 즉시 실행하고 있다.

- 코드 1-39(4) 익명 함수를 인자로 넘겨 실행하는 함수

```javascript
function callAndAdd(a, b) {
  return a() + b();
}
callAndAdd(function () { return 10; }, function () { return 5; }); // 15
```

`callAndAdd` 함수를 실행하면서 익명 함수를 선언해 바로 인자로 넘겼으며 `callAndAdd` 함수는 인자로 받은 함수를 실행해 결과를 반환한다.

위와 같이 함수는 언제든지 선언할 수 있고 인자로 사용할 수 있다. 또한 인자로 받은 함수를 실행할 수 있으며, 함수를 반환할 수 도 있다.

메서드를 가진 객체와 달리 함수는 자신이 곧 기능이기 때문에 보다 쉽게 참조할 수 있고 전달할 수 있고, 쉽게 실행 가능하다.

## 1.4.2 클로저

함수는 변수 참조 범위를 결정하는 중요한 기준이 된다. 함수가 중첩되어 있다면 스코프 역시 중첩되어 생겨난다.

> 클로저는 자신이 생성될 때의 환경을 기억하는 함수다.

클로저의 정의는 보통 위와 같이 설명되며 실용적으로 표현하자면 아래와 같이 표현할 수 있다.

> 클로저는 자신이 생성될 때의 스코프에서 알 수 있었던 변수를 기억하는 함수다.

자바스크립트의 모든 함수는 글로벌 스코프에 선언되거나 함수 안에서 선언된다.

자바스크립트의 모든 함수는 상위 스코프를 가지며 모든 함수는 자신이 정의되는 순간의 실행 컨텍스트 안에 있다.

따라서 자바스크릅트의 모든 함수는 어느 곳에서 생성하든 어떤 방법으로 생성하든 자신이 생성될 때의 환경을 기억할 수 있다.

관점에 따라 모든 함수는 클로저라 해석이 되거나 정의되는 경우도 존재한다.

함수가 진짜 클로저가 되기 위한 가장 중요한 조건은 아래와 같다.

- 코드 1-40 클로저가 되기 위한 가장 중요한 조건

```javascript
function parent() {
  var a = 5;
  function myfn() {
    console.log(a);
  }
}
function parent2() {
  var a = 5;
  function parent1() {
    function myfn() {
      console.log(a);
    }
  }
}
```

`parent`와 `parent2` 내부의 `myfn` 함수에서는 `a`라는 변수를 선언하지 않았지만 사용하고 있다.

`parent`의 변수 `a`는 `myfn`을 생성하는 스코프에서 정의되었고 `parent2`의 변수 `a`는 `myfn`을 생성하는 스코프의 상위 스코프에 정의되었다.

클로저의 정의를 조금 더 정확하게 정의해보면 아래와 같이 표현할 수 있을 것 이다.

> 클로저는 자신이 생성될 때의 스코프에서 알 수 있었던 변수 중 언젠가 자신이 실행될 때 사용할 변수들만 기억하여 유지시키는 함수다.

아래의 예제를 통해 클로저에 대해서 더 자세히 확인할 수 있다.

- 코드 1-41

```javascript
var a = 10;
var b = 20;
function f1() {
  return a + b;
}
f1(); // 30
```

위의 `f1` 함수는 클로저가 아니다. `f1` 함수는 클로저처럼 외부 변수를 참조해 결과를 반환하게 된다.

하지만 글로벌 스코프에서 선언된 모든 변수는 그 변수를 사용하는 함수가 있는지 없는지와 관계없이 유지된다.

`a`와 `b` 변수가 `f1` 함수에 의해 사라지지 못하는 상황이 아니므로 `f1` 함수는 클로저가 아니다.

웹 브라우저의 경우 함수 내부가 아닐 경우 모두 글로벌 스코프이지만 Node.js와 같은 환경에서는 사용하는 자바스크립트 파일 하나의 스코프는 글로벌 스코프가 아니다.

그러므로 위의 코드가 브라우저가 아닌 Node.js 환경에서 사용할 특정 자바스크립트 파일에 작성되어 있을경우 `f1` 함수는 클로저가 될 수 있다.

- 코드 1-42

```javascript
function f2() {
  var a = 10;
  var b = 20;
  function f3(c, d) {
    return c + d;
  }
  return f3;
}
var f4 = f2();
f4(5, 7); // 12
```

위의 코드 역시 클로저가 아니다. `f3` 함수는 `f2` 함수 안에서 생성되었고 `f3` 함수 바로 위에는 `a`, `b`라는 지역 변수 또한 존재한다.

하지만 `f3` 함수 안에서 사용되는 두 변수는 모두 `f3`안에서 정의되었으며 자신이 생성될 때의 스코프가 알고 있는 변수 `a`, `b`는 사용하지 않았으므로 기억되지 않는다.

- 코드 1-43

```javascript
function f4() {
  var a = 10;
  var b = 20;
  function f5() {
    return a + b;
  }
  return f5;
}
f4(); // 30
```

위의 예시는 클로저가 '있었다'라는 표현이 정확하며 결과적으로는 클로저가 없다.

`f4` 함수가 실행되고 `a`, `b`가 할당된 후 `f5` 함수가 정의도니다. 그리고 `f5` 함수에서는 `a`, `b`가 사용되었으므로 `f5` 함수는 클로저가 된다.

하지만 `f4` 함수의 마지막 라인을 보면 `f5` 함수를 실행하여 값을 반환한다.

결국 `f5` 함수를 참조하고 있는 곳이 어디에도 없으므로 `f5` 함수는 사라지고 `a`와 `b` 또한 사라질 수 있기에 클로저는 `f4` 함수가 실행되는 사이에 생겼다 사라진다.

- 코드 1-44

```javascript
function f6() {
  var a = 10;
  function f7(b) {
    return a + b;
  }
  return f7;
}
var f8 = f6();
f8(20); // 30
f8(10); // 20
```

위 코드의 `f7`은 클로저다. 위의 코드에서 `a`는 사라지지 않는다.

`f7` 함수가 `a`를 사용하기 때문에 `a`를 기억해야 하고 `f7` 함수가 `f8` 함수에 담겼기 때문에 클로저가 되었다.

> 위의 예제에서도 `f6` 함수의 결과인 `f7`을 `f8`에 담지 않았다면 `f7`은 클로저가 되지 않는다.

`f6` 함수의 실행이 끝났어도 `f7`이 `a`를 기억하는 클로저가 되었기 때문에 `a`는 사라지지 않으며 `f8`을 실행할 때 마다 새로운 변수인 `b`와 함께 사용되어 결과를 생성한다.

- 코드 1-45

```javascript
function f9() {
  var a = 10;
  var f10 = function (c) {
    return a + b + c;
  };
  var b = 20;
  return f10;
}
var f11 = f9();
f11(30); // 60
```

변수 `b`는 함수 `f10`보다 늦게 선언되었지만 `f11(30)`의 실행 결과는 60이다.

위의 예제는 클로저가 기억하고 있는 **자신이 생성될 때**의 범위를 보여주는 예시다.

`f10`이 생성될 시점에는 `b`가 20으로 초기화되지 않았다.

클로저는 자신이 생성되는 스코프의 모든 라인, 어느 곳에서 선언된 변수든지 참조하고 기억할 수 있으며 그것들은 **변수이기 때문에 클로저가 생성된 이후 언제라도 변경될 수 있다**.

다시 한번 클로저를 조금 더 풀어서 정의하면 아래와 같을 것 이다.

> 클로저는 자신이 생성되는 스코프의 실행 컨텍스트에서 만들어졌거나 알 수 있었던 변수 주 언젠가 자신이 실행될 때 사용할 변수들만 기억하는 함수이다. 클로저가 기억하는 변수의 값은 언제든지 남이나 자신에 의해 변경될 수 있다.

<sub id="2021-03-05"><sup>-- 2021-03-05 --</sup></sub>

## 1.4.3 클로저의 실용 사례

클로저에서 은닉은 의미 있는 기술이자 개념이지만 아래와 같이 정말 강력하고 실용적인 상황도 존재한다.

- 이전 상황을 나중에 일어날 상황과 이어 나갈 때
- 함수로 함수를 만들거나 부분 적용을 할 때

'이전 상황을 나중에 일어날 상황과 이어 나갈 때'란 아래와 같은 상황을 의미한다.

이벤트 리스너로 함수를 넘기기 이전에 알 수 있던 상황들을 변수에 담아 클로저로 만들어 기억해 두면, 이벤트가 발생되어 클로저가 실행되었을 때 기억해 두었던 변수들로 이전 상황을 이어갈 수 있다.

콜백 패턴에서도 마찬가지로 콜백으로 함수를 넘기기 이전 상황을 클로저로 만들어 기억해 두는 방식으로 이전의 상황을 이어갈 수 있다.

- 코드 1-46 팔로잉 버튼

아래 예제는 jQuery와 Underscore.js가 있다고 가정했다.

```html
<div class="user-list"></div>
<script>
  var users = [
    { id: 1, name: 'HA', age: 25 },
    { id: 2, name: 'PJ', age: 28 },
    { id: 3, name: 'JE', age: 27 },
  ];
  $('.user-list').append(
    _.map(users, function (user) {
      // (1) 이 함수는 클로저가 아니다.
      var button = $('<button>').text(user.name); // (2)
      button.click(function () {
        // (3) 계속 유지되는 클로저 (내부에서 user를 사용했다.)
        if (confirm(user.name + '님을 팔로잉 하시겠습니까?')) follow(user); // (4)
      });
      return button; // (5)
    })
  );
  function follow(user) {
    $.post('/follow', { user_id: user.id }, function () {
      // (6) 클로저가 되었다가 없어지는 클로저
      alert('이제 ' + user.name + '님의 소식을 보실 수 있습니다.');
    });
  }
</script>
```

3에서 클릭 이벤트를 추가하며 익명 함수를 생성하였고 그 함수는 클로저가 된다.

3에서 클로저를 만들 때의 컨텍스트는 해당 번째의 `user`를 기억하고 있으며 그 `user`는 외부에서 인자로 선언되었고 3의 내부에서 사용하기 때문에 클로저가 되어 기억하고 유지시킨다.

나중에 클릭을 통해 이 클로저가 실행되면 자신이 기억하고 있던 `user`를 이용해 1을 실행했을 때의 흐름을 이어간다.

또한 `follow` 함수는 `user`를 받으며 어떤 버튼을 클릭해도 그에 맞는 `user`가 넘어가며 `$.post`를 실행시키며 콜백 함수로 클로저를 만들어 넘긴다. 이 클로저는 `follow`가 실행되었을 때의 환경을 기억해 콜백 함수가 실행되고 나면 기억하고 있던 `user`를 통해 흐름을 이어 간다.

- 코드 1-47 (1) 흔한 클로저 실수

```javascript
var buttons = [];
for (var i = 0; i < users.length; i++) {
  var user = users[i];
  buttons.push(
    $('<button>')
      .text(user.name)
      .click(function () {
        console.log(user.name);
      })
  );
}
$('.user-list').append(buttons);
```

위와 같이 for문을 돌며 click 이벤에 리스너를 등록할 경우 `i++` 떄문에 지역 변수의 갑시 먼저 변해 의도한것과 다르게 동작할 수 있다. 위의 예시는 모든 버튼을 클릭해도 마지막 `user`인 JE만 출력된다.

- 코드 1-47 (2) 절차지향적 해결

```javascript
var buttons = [];
for (var i = 0; i < users.length; i++) {
  (function (user) {
    buttons.push(
      $('<button>')
        .text(user.name)
        .click(function () {
          console.log(user.name);
        })
    );
  })(users[i]);
}
$('.user-list').append(buttons);
```

위의 코드 처럼 다른 함수의 도움을 받아 절차지향적으로 문제를 해결할 수 있다.

- 코드 1-47 (3) 함수적 해결

```javascript
$('.user-list').append(
  _.map(users, function (user) {
    return $('<button>')
      .text(user.name)
      .click(function () {
        console.log(user.name);
      });
  })
);
```

위의 코드는 `_.map` 함수가 `i`가 변할 때마다 `iteratee`를 실행해 항상 새로운 실행 컨텍스트를 만들어 주기 때문에 잘 동작한다.

`_.map`과 같은 함수는 동시성이 생길 만한 상황이더라도, 상태 변화로 인한 부수 효과로부터 자유롭고 편하게 프로그래밍할 수 있도록 해준다.

함수형 프로그래밍은 서로 다른 실행 컨텍스트에 영향을 줄 수 있을 만한 상태 공유나 상태 변화를 만들지 않는 것이 목표에 가깝다.

### 1.4.4 클로저를 많이 사용하라!

클로저는 분명하게도 메모리 누수 같은 위험성을 가지고 있다.

그러나 메모리 누수나 성능 저하의 문제는 클로저의 단점이나 문제가 아니다.

클로저를 조심히 사용하기 보다 정확하게 사용해야하며 사용하다보면 메모리 누수가 일어나지 않는 설계를 깨우치게 될 것이다.

또한 클로저를 사용하다 보면 클로저를 활용한 아름다운 패턴들도 자연스럽게 알게 될 것이다.

<sub id="2021-03-06"><sup>-- 2021-03-06 --</sup></sub>

### 1.4.5 고차 함수

고차 함수란 아래와 같이 함수를 다루는 함수를 말한다.

1. 함수를 인자로 받아 대신 실행하는 함수
2. 함수를 리턴하는 함수
3. 함수를 인자로 받아서 또 다른 함수를 리턴하는 함수

함수를 인자로 받아 대신 실행하는 함수는 앞에서도 만들어 보았던 `_.map`, `_.filter`와 같은 함수다.

- 코드 1-48 함수를 인자로 받아 대신 실행하는 함수

```javascript
function calcWith10(val, func) {
  return func(10, val);
}
function add(a, b) {
  return a + b;
}
function sub(a, b) {
  return a - b;
}
console.log(calcWith10(20, add)); // 30;
console.log(calcWith10(5, sub)); // 5
```

위 코드에서 `add`, `sub` 함수는 함수를 인자로 받고나 리턴하지 않기 때문에 일반 일반 함수이며 `calcWith10` 함수는 함수를 받아 내부에서 대신 실행하므로 고차 함수다.

> 함수형 프로그래밍은 함수에 인자를 언제 어떻게 적용할 것인가, 함수를 인자로 언제 어떻게 적용할 것인가, 인자로 받은 함수를 언제 어디서 평가할 것인가에 대한 이야기다.

`calcWith10` 함수는 고차 함수이자 응용형 함수다. 응용형 함수는 함수를 인자로 받아 내부에서 알고 있는 값을 인자로 받은 함수에 적용하는 식으로 이루어진다.

함수형 프로그래밍은 응용형 함수와 고차 함수들을 만들고, 클로저, 인자 합성 등의 함수 기능을 충분히 활용하여 부분 적용, 함수 합성, 함수를 다르는 함수를 만들어 조합하고 연속적으로 실행하고 응용하며 이해하기 쉬운 좋은 함수로 발전시켜 나간다.

- 코드 1-49 함수를 리턴하는 함수

```javascript
function constant(val) {
  return function () {
    return val;
  };
}
var always10 = constant(10);
console.log(always10()); // 10;
console.log(always10()); // 10;
console.log(always10()); // 10;
```

`constant` 함수는 실행 당시 받았던 10이라는 값을 받아 내부에서 익명 함수를 클로저로 만들어 `val`을 기억하게 만든후 반환한다.

반환된 함수에는 `always10`이라는 이름을 지어 사용하였으며 `always10` 함수는 항상 10을 반환한다.

`constant` 함수처럼 함수를 반환하는 함수도 고차 함수다.

- 코드 1-50 함수를 대신 실행하는 함수를 리턴하는 함수

```javascript
function callWith(val1) {
  return function (val2, func) {
    return func(val1, val2);
  };
}
var callWith10 = callWith(10);
console.log(callWith10(20, add)); // 30
var callWith5 = callWith(5);
console.log(callWith5(5, sub)); // 0
```

`callWith` 함수는 `val1`을 받아 `val1`을 기억하는 함수를 반환한다.

반환된 함수는 이후에 `val2`과 `func`를 받아 대신 `func` 함수를 실행한다.

`callWith` 함수에 10을 넣어 `callWith10` 함수를 만들 수 있고 5를 넣어 `callWith5`를 만들 수도 있다.

또한 함수를 반환하는 함수를 사용할 경우 아래와 같이 변수에 담지 않고 바로 실행할 수 있다.

- 코드 1-51 괄호 두번

```javascript
console.log(callWith(30)(20, add)); // 50
console.log(callWith(20)(20, sub)); // 0
```

`callWith10` 함수가 아닌 `callWith` 함수가 되어 또 다르게 함수를 사용할 수 있는 가능성이 생겼다.

아래 코드와 같이 숫자가 아닌 값 또한 활용이 가능하다.

- 코드 1-52 `callWith` 활용

```javascript
console.log(
  callWith([1, 2, 3])(function (v) {
    return v * 10;
  }, _.map)
); // [10, 20, 30]
_.get = function (list, idx) {
  return list[idx];
};
var callWithUsers = callWith([
  { id: 2, name: 'HA', age: 25 },
  { id: 4, name: 'PJ', age: 28 },
  { id: 5, name: 'JE', age: 27 },
]);
console.log(callWithUsers(2, _.get)); // { id: 5, name: "JE", age: 27 }
console.log(
  callWithUsers(function (user) {
    return user.age > 25;
  }, _.find)
); // { id: 4, name: "PJ", age: 28 }
console.log(
  callWithUsers(function (user) {
    return user.age > 25;
  }, _.filter)
); // [ { id: 4, name: "PJ'"" age: 28 }, { id: 5, name: "JE", age: 27 } ]
console.log(
  callWithUsers(function (user) {
    return user.age > 25;
  }, _.some)
); // true
console.log(
  callWithUsers(function (user) {
    console.log(user);
    return user.age > 25;
  }, _.every)
); // false
```

위의 코드에서는 변수 선언 대신 함수의 요소 중 하나인 인자를 활용해 더 많은 가능성을 열었다.

<sub id="2021-03-09"><sup>-- 2021-03-09 --</sup></sub>

### 1.4.6 콜백 함수라 잘못 불리는 보조 함수

[[이전으로]](../chapter1-3/README.md) / [[목록으로]](../README.md)