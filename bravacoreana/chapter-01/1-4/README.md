
<div id="1-4"></div>

## 1.4 함수형 자바스크립트를 위한 기초

함수를 잘 다루려면 함수와 관련된 개념들과 관련된 몇 가지 기능들에 대해 잘 알아야 하는데 이를테면 **일급 함수, 클로저, 고차함수, 콜백 패턴, 부분 적용, arguments 객체 다루기, 함수 객체의 메서드(bind, call, apply)** 등이 있다. 자바스크립트에서의 함수는 대충 익히고 넘기기엔 너무나 중요하다! 특히 소프트웨어 규모가 커지고 복잡도가 높아질수록 함수의 중요성은 더욱 커진다. 그러니.. 열심히 공부해보자 🥶

<br/>
<br/>
<br/>

<div id="1-4-1"></div>

### 1.4.1 일급 함수

자바스크립트에서 함수는 일급 객체이자 일급 함수다. 자바스크립트에서 객체는 일급 객체다. 여기서 `일급`은 값으로 다룰 수 있다는 의미로 다음의 조건을 만족해야 한다.

> "일급" 을 만족하기 위한 조건
> - 변수에 담을 수 있다.
> - 함수나 메서드의 인자로 넘길 수 있다.
> - 함수나 메서드에서 리턴할 수 있다.

자바스크립트에서 모든 값은 일급이다. 자바스크립트에서 모든 객체는 일급 객체이며 함수도 객체이자 일급 객체다. 그렇다면 일급 함수는 무엇일까? 보통 일급함수는 아래와 같은 추가적인 조건을 더 만족한다.

> "일급 함수"를 만족하기 위한 조건
> - 아무 때나(런타임에서도) 선언이 가능하다.
> - 익명으로 선언할 수 있다.
> - 익명으로 선언한 함수도 함수나 메서드의 인자로 넘길 수 있다.


자바스크립트의 함수는 위 조건을 모두 만족하는 일급 함수다!

```javascript
// 코드 1-39

// 1
function f1() {
  var a = typeof f1 == "function" ? f1 : function () {};
}

// 2
function f2() {
  return function () {};
}

// 3
(function (a, b) { return a + b; })(10, 5);

function callAndAdd(a, b) {
  return a() + b();
}

// 4
callAndAdd(function () { return 10; },function () { return 5; });
```

1. f1은 함수를 값으로 다룰 수 있음을 보여준다. typeof 연산자를 사용해 'function' 인지 확인하고 변수 a에 f1을 담고 있다.
2. f2는 함수를 리턴한다.
3. a와 b를 더하는 익명 함수를 선언했고, a, b에 각각 10, 5를 전달해 즉시 실행했다.
4. callAndAdd를 실행하면서 익명 함수들을 선언했고 바로 인자로 사용되었다. callAndAdd는 넘겨받은 함수 둘을 실행하여 결과들을 더한다.
<br/>
<br/>
함수는 언제든지 선언할 수 있고 인자로 사용할 수 있다. 또한 함수는 인자로 받은 함수를 실행할 수 있고, 함수를 리턴할 수 있다. 메서드를 가진 객체와는 다르게 자기 자신이 곧 기능인 함수는 쉬운 참조, 쉬운 전달, 쉬운 실행이 가능하다. 함수로 기능을 동작시키는 것은, 만들어 둔 클래스의 인스턴스를 생성하고 다루면서 기능을 동작시키는 것보다 간단하고 쉽다. 

<br/>
<br/>
<br/>

<div id="1-4-2"></div>

### 1.4.2 클로저

클로저는 자바스크립트에서 매우 주요하며 계속해서 활용되기 때문에 정확한 이해가 필요하다! 스코프에 대한 개념을 잘 알고 있다면 이해가 좀 더 쉬울 것이다. 스코프란 변수를 어디에서 찾을지를 정한 규칙으로, 여기서 다루는 스코프는 함수 단위의 변수 참조에 대한 것이다. 

함수는 변수 참조 범위를 결정하는 중요한 기준이다. 함수가 중첩되어 있다면 스코프들 역시 중첩되어 생겨난다.

> 클로저는 자신이 생성될 때의 환경을 기억하는 함수다.

다시 말해, _클로저는 자신의 상위 스코프의 변수를 참조할 수 있다_ 고 말할 수 있다. 맞는 말이지만 오해의 소지가 많은 표현이다. 좀 더 정확한 정의는 다음과 같을 것이다.

> 클로저는 자신이 생성될 때의 스코프에서 알 수 있었던 변수를 기억하는 함수다.

자바스크립트의 모든 함수는 
- 글로벌 스코프에 선언되거나 함수 안에서 선언된다.
- 상위 스코프를 가진다.
- 자신이 정의되는 순간의(정의되는 곳의) 실행 컨텍스트 안에 있다.
- 어느 곳에서 어떤 방법으로 생성하든 자신이 생성될 때의 환경을 기억할 수 있다.

그렇다면 모든 함수는 곧 클로저일까?

관점에 따라 그렇게 해석하거나 정의할 수도 있다. 그러나 함수가 의미적으로나 실제적으로나 진짜 클로저가 되기 위한 가장 중요한 조건은 다음과 같다.

> 클로저로 만들 함수가 myfn 이라면, myfn 내부에서 사용하고 있는 변수 중에 myfn 내부에서 선언되지 않은 변수가 있어야 한다. 그 변수를 a 라고 한다면, a라는 이름의 변수가 myfn을 생성하는 스코프에서 선언되었거나 알 수 있어야 한다. 


```javascript
// 코드 1-40

function parent() {
  var a = 5;
  function myfn() {
    console.log(a);
  }
  // ... 생략
}

function parent2() {
  var a = 5;
  function parent1() {
    function myfn() {
      console.log(a);
    }
    // ... 생략
  }
  // ... 생략
}
```

여기서 `parent`와 `parent2`의 myfn에서는 a라는 변수를 선언하지 않았지만 사용하고 있다. parent의 변수 a는 myfn을 생성하는 스코프에서 정의되었고 parent2의 변수 a는 myfn을 생성하는 스코프의 상위 스코프에 정의되었다. 

위와 같은 조건을 충족시키지 않는다면 그 함수가 아무리 함수 안에서 선언되었더라도 일반 함수와 다를게 없다. `클로저가 기억할 환경`이라는 거은 외부의 변수들(혹은 외부의 함수들)밖에 없기 때문이다. 또한 자신의 상위 스코프에서 알 수 있는 변수를 자신이 사용하고 있지 않다면 그 환경을 기억할 필요가 없다.

글로벌 스코프를 제외한 외부 스코프에 있었던 변수 중 클로저 혹은 다른 누군가가 참조하고 있지 않는 모든 변수는 실행 컨텍스트가 끝난 후 가비지 컬렉션 대상이 된다. 어떤 함수가 외부 스코프의 변수를 사용하지 않았고, 그래서 외부 스코프 환경이 가비지 컬렉션 대상이 된다면 그 함수는 클로저라고 보기 어렵다.

클로저를 다시 재정의 해보면 다음과 같다.

> 클로저는 자신이 생성될 때의 스코프에서 알 수 있었던 변수 중에서 언젠가 자신이 실행될 때 사용할 변수들만 기억하여 유지시키는 함수다.

예제를 통해 클로저에 대해 조금 더 자세히 알아보자.

```javascript
// 코드 1-41.

var a = 10;
var b = 20;
function f1() {
  return a + b;
}
f1(); // 30
```

이 예제에서 f1은 클로저일까? **NOPE!** 일단 f1은 클로저처럼 외부 변수를 참조하여 결과를 만든다. 게다가 상위 스코프의 변수를 사용하고 있으므로 조건을 충족한다. 그런데 왜 클로저가 아닐까??

글로벌 스코프에서 선언된 모든 변수는 그 변수를 사용하는 함수가 있는지 없는지와 관계없이 유지된다. 즉, `a`와 `b` 변수가 **f1에 의해 사라지지 못하는 상황이 아니므로** f1은 클로저가 아니다.

그렇다면 클로저는 "함수 안에서 함수가 생성될 때" 만 생성된다고 할 수 있을까? 그렇지도 않다. 웹 브라우저에서는 함수 내부가 아니라면 모두 글로벌 스코프지만, 요즘 자바스크립트에서는 함수 내부가 아니면서 글로벌 스코프도 아닌 경우도 있다. `Node.js` 가 그렇다. Node.js에서 사용하는 js 파일 하나의 스코프는 글로벌 스코프가 아니다. 그러므로 만일 해당 예제와 동일한 코드가 브라우저가 아닌 Node.js에서 사용할 특정 js 파일에 작성되어 있었다면 f1은 클로저가 맞다.

```javascript
// 코드 1-42.

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

코드 1-42에 클로저가 있을까?? 특히 f3처럼 함수 안에서 함수를 리턴하면 클로저처럼 보인다. 하지만 이 코드의 f4에 담긴 f3(리턴된 함수) 도 클로저가 아니다. 

f3은 f2 안에서 생성되었고 f3 바로 위에는 a, b 라는 지역 변수도 있다. 하지만 f3 안에서 사용되고 있는 변수는 c,d 이고 두 변수 모두 f3에서 정의되었다. f3 자신이 생성될 때의 스코프가 알고 있는 변수 a,b는 사용하지 ㅇ낳았다. 그러므로 f3이 기억해야 할 변수는 하나도 없다! f3 자신이 스스로 정의한 c,d는 f3이 실행되고 나면 없어져 버린다. 다시 실행되면 c,d를 생성하고 리턴 후 변수(c,d)는 사라진다. f3은 기억해 두는 환경도 변수도 없다. 👉🏼 클로저가 아님!

f2에서 정의된 a,b는 f2에서만 쓰였다. f2 안에 f3가 있지만 f3에서는 a,b가 쓸모가 없다. 즉, a,b는 기억될 필요가 없으므로 f2가 실행되고 나면 사라진다. 

f3가 클로저가 아닌 것은 너무나 당연한 일이다. 만일 f3가 클로저라면 거의 모든 함수가 클로저일테고, 가비지 컬렉터가 메모리를 해제할 수 있는 대상도 없을 것이다. 

```javascript
// 코드 1-43.

function f4() {
  var a = 10;
  var b = 20;
  function f5() {
    return a + b;
  }
  return f5();
}
f4(); // 30
```

그러면 코드 1-43에는 클로저가 있을까? 정확히는 `있었다` 가 맞다. 🤯 결과적으로는 클로저는 없다고 볼 수 있다.

f4 실행 ➡️ a,b 할당 ➡️ f5 정의<br/>
f5에서는 자신이 생성된 환경을 기억하는 클로저가 됨! 그런데 f4의 마지막 라인에서 f5를 실행해 리턴한다. 결국 f5를 참조하고 있는 곳이 없으므로 f5는 사라지고, f5가 사라지면 a,b도 사라질 수 있기에 클롲는 f4가 실행되는 동안에만 생겼다가 사라진다.

```javascript
// 코드 1-44

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

여기서 `f7`은 진짜 클로저다. 이제 a는 사라지지 않는다. f7이 a를 사용해야 하므로 a를 기억해야 하고, f6()을 실행해 리턴되는 f7이 f8에 담겼기 때문에 클로저가 되었다. 원래대로라면 f6의 지역 변수는 모두 사라져야 하지만 f6의 실행이 끝나도 f7이 a를 기억하는 클로저가 되었기 때문에 a는 사라지지 않으며, f8을 실행할 때마다 새로운 변수인 b가 함께 사용되어 결과를 만든다. (만약 f6의 실행 결과인 f7을 f8에 담지 않았다면 f7은 클로저가 되지 않는다.)

여기서 메모리 누수가 있을까? 그렇지 않다. 메모리가 해제되지 않는 것과 메모리 누수는 다르다. 메모리 누수는 메모리가 해제되지 않을 때 일어나는 것은 맞지만, 위 상황은 개발자가 의도한 상황이기 때문에 메모리 누수라고 할 수는 없다. 

```js
// 코드 1-45

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

f10에는 익명함수를 담았다. f10이 생성되기 딱 이전 시점에는 b가 20으로 초기화되지 않았다. 클로저는 자신이 생성하는 스코프의 모든 라인, 어느 곳에서 선언된 변수든지 참조하고 기억할 수 있다. 그리고 그것은 변수이기에 클로저가 생성된 이후 언제라도 그 값은 변경될 수 있다. 

클로저는 **자신이 생성될 "때"의 스코프에서 알 수 있었던 변수를 기억하는 함수**라고 했는데 이 예제는 그것을 잘 보여주는 예제다.

- 때가 조금 길다
- 스코프에서 알 수 있었던
  

"때가 조금 길다" 고 했던 이유는, "때"가 함수가 생성되는 라인이나 그 이전이 아니라, **그 스코프가 실행되고 있는 컨텍스트 전체**를 말하기 때문이다. 여기서 그 스코프는 함수일 수 있다. 만일 함수라면 함수가 실행될 때마다 그 스코프의 환경은 새로 만들어진다. 클로저 자신이 생성될 `때의 스코프를 알 수 있었던`의 의미는 `클로저가 생성되고 있는 이번 실행 컨텍스트에서 알 수 있었던` 이라는 의미다. `이번 실행 컨텍스트` 라고 표현한 것은 그것이 계속 다시 발생하는 실행 컨텍스트이기 때문이고, 자신의 부모 스코프의 실행 컨텍스트도 특정 시점 안에 있는 것이기 때문에 `있었던`이라는 시점을 담은 표현으로 설명했다.

다시 한 번 클로저를 조금 더 풀어서 정의 해보자.

> 클로저는 자신이 생성되는 스코프의 실행 컨텍스트에서 만들어졌거나 알 수 있었던 변수 중 언젠가 자신이 실행될 때 사용할 변수들만 기억하는 함수다. 클로저가 기억하는 변수의 값은 언제든지 남이나 자신에 의해 변경될 수 있다.


<br/>
<br/>
<br/>

<div id="1-4-3"></div>

### 1.4.3 클로저의 실용 사례

클로저가 정말 강력하고 실용적으로 쓰일 수 있는 상황
- 이전 상황을 나중에 일어날 상황과 이어 나갈 때
  - 이벤트 리스너로 함수를 넘기기 이전에 알 수 있었던 상황들을 변수로 담아 클로저로 만들어 기억해 두면, 이벤트가 발생되어 클로저가 실행되었을 때 기억해 두었던 변수들로 이전 상황을 이어갈 수 있다. 콜백 패턴에서도 마찬가지로 콜백으로 함수를 넘기기 이전 상황을 클로저로 만들어 기억해두는 식으로 이전의 상황들을 이어갈 수 있다. 
- 함수로 함수를 만들거나 부분 적용을 할 때

```js
// 코드 1-46. 팔로잉 버튼

var users = [
  { id: 1, name: "HA", age: 25 },
  { id: 2, name: "PJ", age: 28 },
  { id: 3, name: "JE", age: 27 },
];
$(".user-list").append(
  _.map(users, function (user) {  // 1. 이 함수는 클로저가 아니다
    var button = $("<button>").text(user.name); // 2.
    button.click(function () {  // 3. 계속 유지되는 클로저 (내부에서 user를 사용했다)
      if (confirm(user.name + "님을 팔로잉 하시겠습니까?")) follow(user);  // 4.
    });
    return button; // 5.
  })
);
function follow(user) {
  $.post("/follow", { user_id: user.id }, function () { // 6. 클로저가 되었다가 없어지는 클로저
    alert(`이제 ${user.name}님의 소식을 보실 수 있습니다.`);
  });
}
```
<!-- lemmi skip this one to work for now. gonna figure it out later 🙈 -->

1. 1과 5에서 users 객체로 `_.map`을 실행하면서 user마다 버튼으로 바꿔준 배열을 리턴하고 있다. 그렇게 만들어진 배열은 바로 `$('.user-list').append` 에 넘겨져 화면에 그려진다.
2. 2에서 버튼을 생성하면서 user.name을 새겼다. `_.map`이 보조 함수를 user마다 각각 실행해 주기 때문에 user 하나에 대한 코드만 생각하면 된다.
3. 3에서는 클릭 이벤트를 달면서 익명 함수를 생성했고, 그 함수는 클로저가 된다. 
4. 3에서 생성된 클로저는 1의 익명 함수의 실행 컨텍스트에서의 환경을 기억한다. 그 중 기억하고 있는 외부 변수는 내부에서 사용하고 있는 user 뿐이다. 3에서 클로저를 만들 때의 컨텍스트는 해당 번째 user를 알고 있었다. 그 user는 외부에서 인자로 선언되었고 3의 내부에서 사용하기 때문에 클로저가 되어 기억하고 유지시킨다. 나중에 클릭을 통해 이 클로저가 실행되면 자신이 기억하고 있던 user를 이용해 1을 실행했을 때의 흐름을 이어간다.
5. 4에서 `user.name`으로 컨펌을 띄우고 기억해 둔 user를 follow 함수에게 넘긴다. 
6. follow 함수는 user를 받는다. 어떤 버튼을 클릭하든지 그에 맞는 유저가 넘어온다.
7. 6에서는 `$.post`를 실행하면서 콜백 함수로 클로저를 만들어 넘겼다. 이 클로저는 방금 follow가 실행되었을 때의 환경을 기억한다. 서버가 응답을 주어 콜백 함수가 실행되고 나면 기억하고 있던 user를 통해 흐름을 이어 간다.

여기서 `_.map` 과 같은 함수는 동시성이 생길 만한 상황이더라도 상태 변화로 인한 부수 효과로부터 자유롭고 편하게 프로그래밍 할 수 있도록 해 준다. 

```js
// 코드 1-47.

// 1. 흔한 클로저 실수 - 어떤 버튼을 클릭해도 JE
var buttons = [];
for (var i = 0; i < users.length; i++) {
  var user = users[i];
  buttons.push(
    $("<button>")
      .text(user.name)
      .click(function () {
        console.log(user.name);
      })
  );
}
$(".user-list").append(buttons);

// 2. 절차지향적 해결 - 어차피 함수의 도움을 받아야 함, 각각 다른 이름이 잘 나옴
var buttons = [];
for (var i = 0; i < users.length; i++) {
  var user = users[i];
  buttons.push(
    $("<button>")
      .text(user.name)
      .click(function () {
        console.log(user.name);
      })
  )(users[i]);
}
$(".user-list").append(buttons);

// 3. 함수적 해결
$(".user-list").append(
  _.map(users, function (user) {
    return $("<button>")
      .text(user.name)
      .click(function () {
        console.log(user.name);
      });
  })
);
```

<br/>
<br/>
<br/>

<div id="1-4-4"></div>

### 1.4.4 클로저를 많이 사용하라!

클로저는 자바스크립트에서 절차지향 프로그래밍, 객체지향 프로그래밍, 함수형 프로그래밍 모두를 지탱하는 아주 중요한 기능이자 개념이다. 클로저는 메모리 누수 같은 위험성을 가지고 있다. 하지만 메모리 누수나 성능 저하의 문제는 클로저의 단점이나 문제가 아니다. 클로저를 정확하게 사용하면 단점을 극복할 수 있다. 

<br/>
<br/>
<br/>

<div id="1-4-5"></div>

### 1.4.5 고차 함수

고차 함수란, 함수를 다루는 함수를 말한다.
1. 함수를 인자로 받아 대신 실행하는 함수
2. 함수를 리턴하는 함수
3. 함수를 인자로 받아서 또 다른 함수를 리턴하는 함수

사실상 함수형 프로그래밍의 절반은 '고차 함수를 적극적으로 활용하는 프로그래밍' 이라고 할 수 있다. 유명한 고차 함수로는 `_.map`, `_.filter`, `_.reduce` 등이 있다.

```js
// 코드 1-48. 함수를 인자로 받아 대신 실행하는 함수

function callWith10(val, func) { return func(10, val); }
function add(a, b) { return a + b; }
function sub(a, b) { return a - b; }
console.log(callWith10(20, add)); // 30
console.log(callWith10(5, sub)); // 5
```

여기서 `add`와 `sub`은 일반 함수다. 함수를 인자로 받거나 함수를 리턴하지 않기 때문이다. `callWith10`은 고차 함수다. 함수를 받아 내부에서 대신 실행하기 때문이다. func라는 이름의 인자로 add나 sub 함수를 받아, 역시 인자로 받았던 val과 함께 10을 인자로 넘기면서 대신 실행한다.
<br/>
<br/>
이번에는 함수를 리턴하는 함수를 확인해보자. 이미 함수를 리턴하는 함수도 보았다. 1.1절에서 봤었던 addMaker와 같은 함수다. constant 함수는 이런 걸 어디에 쓸까 싶을 수 있지만 정말 많이 사용되는 함수이기도 하다.

```js
// 코드 1-49. 함수를 리턴하는 함수

function constant(val) {
  return function () {
    return val;
  };
}

var always10 = constant(10);

console.log(always10()); //10
console.log(always10()); //10
console.log(always10()); //10
```

`constant` 함수는 실행 당시 받았던 10이라는 값ㅇ르 받아 내부에서 익명 함수를 클로저로 만들어 val을 기억하게 만든 후 리턴한다. 이 함수를 always10에 담아준다. always10을 실행하면 항상 10을 리턴한다. constant처럼 함수를 리턴하는 함수도 고차 함수다.

```js
// 코드 1-50. 함수를 대신 실행하는 함수를 리턴하는 함수

function callWith(val1) {
  return function (val2, func) {
    return func(val1, val2);
  };
}

var callWith10 = callWith(10);
callWith10(20, add); // 30

var callWith5 = callWith(5);
callWith5(5, sub); //0
```

여기서 `callWith`는 함수를 리턴하는 함수다. val1을 받아서 val1을 기억하는 함수를 리턴했다. 리턴된 그 함수에는 이후에 val2와 func를 받아 대신 func를 실행해 준다. 리턴된 그 함수는 이후에 val2와 func를 받아 대신 func를 실행해 준다. callWith에 10을 넣어 앞서 만들었던 callWith10과 동일하게 동작하는 함수를 만들었다. 이제는 callWith를 이용해 뭐든 만들 수 있다. 함수를 리턴하는 함수를 사용하는 경우 다음처럼 변수에 담지 않고 바로 실행해도 된다.

```js
// 코드 1-51. 괄호 두번
callWith(30)(20, add); //50
callWith(20)(20, sub); //0
```

여기에 숫자 대신 값을 넣어도 활용이 가능하다.


```js
// 코드 1-52.

callWith([1, 2, 3])(function (v) { return v * 10; }, _.map); //[10, 20, 30]

_.get = function (list, idx) {
  return list[idx];
};

var callWithUsers = callWith([
  { id: 2, name: "HA", age: 25 },
  { id: 4, name: "PJ", age: 28 },
  { id: 5, name: "JE", age: 27 },
]);

callWithUsers(2, _.get); //{ id: 5, name: 'JE', age: 27 }

callWithUsers(function (user) {
  return user.age > 25;
}, _.find);
// { id: 4, name: 'PJ', age: 28 }
// find 함수는 조건에 맞는 걸 찾으면 바로 리턴

callWithUsers(function (user) {
  return user.age > 25;
}, _.filter);
//[ { id: 4, name: 'PJ', age: 28 }, { id: 5, name: 'JE', age: 27 } ]
// filter 함수는 조건에 맞는 리스트를 모두 찾아 배열에 담고, 그 배열을 반환

callWithUsers(function (user) {
  return user.age > 25;
}, _.some);
// true

callWithUsers(function (user) {
  return user.age > 25;
}, _.every);
// true
```

<br/>
<br/>
<br/>

<div id="1-4-6"></div>

### 1.4.6 콜백 함수라 잘못 불리는 보조 함수

콜백 함수를 받아 자신이 해야 할 일을 모두 끝낸 후 결과를 되돌려 주는 함수도 고차 함수다. 보통은 비동기가 일어나는 상황에서 사용되며 콜백함수를 통해 다시 원래 위치로 돌아오기 위해 사용되는 패턴이다. 콜백 패턴은 **끝나면 컨텍스트를 다시 돌려주는 단순한 협업 로직**을 가진다. 컨텍스트를 다시 돌려주는 역할을 가지고 있기 때문에 callback 이라고 함수 이름을 지은 것이다. 콜백 함수는 익명이든 아니든 상관없고 익명 함수가 넘어가는 모양을 가졌다고 해서 반드시 콜백 함수 인 것도 아니다.

`button.click(function() {})` 와 같은 함수도 콜백 함수 보다 이벤트 리스너라고 칭하는 것이 더 적합하다. **함수가 고차 함수에서 쓰이는 역할의 이름으로 불러주면 된다.** `_.each([1,2,3], function() {})`에서의 익명 함수는 콜백이 아니라 `iteratee`이며 `_.filter(users, function() {})` 에서의 익명 함수는 `predicate`다. 콜백 함수는 종료되었을 때 단 한 번 실행되지만 iteratee나 predicate, listener 등은 종료될 때 실행되지 않으며 상황에 따라 여러 벌 실행되기도 하고 각각 다른 역할을 한다.
<div id="1-4-7"></div>

### 1.4.7 함수를 리턴하는 함수와 부분 적용

앞서 봤던 `addMaker`,`bvalue`,`bmatch`,`callWith` 같은 함수들은 약속된 개수의 인자를 받아 미리 받아 둔다. 그 후 클로저로 만들어진 함수가 추가적으로 인자를 받아 로직을 완성해 나가는 패턴을 갖는다. 이와 유사한 기법들로 `bind`, `curry`, `partial` 등이 있다. 이러한 기법들은 다음과 같은 공통점을 갖는다.

> 기억하는 인자 혹은 변수가 있는 클로저를 리턴한다.

bind 함수는 this와 인자들이 부분적으로 적용된 함수를 리턴한다. bind의 경우 인자보다는 주로 함수 안에서 사용될 this를 적용해 두는데 더 많이 사용한다. (작가는 아마 this 적용을 스킵ㅂ할 수 없다는 점과 인자의 부분 적용을 왼쪽에서부터 순서대로만 할 수 있다는 점 때문이라고 추측하고 있다.)

```js
// 코드 1-53. bind

function add(a, b) {
  return a + b;
}

var add10 = add.bind(null, 10);
add10(20);  // 30
```
bind는 첫번째 인자로 bind가 리턴할 함수에서 사용될 this를 받는다. 두번째 인자부터 함수에 미리 적용될 인자들이다. 인자를 미리 적용해 두기 위해 this로 사용될 첫번째 인자에 null을 넣은 후, 10을 넣었다.add10과 같이 this를 사용하지 않는 함수이면서 왼쪽에서부터 순서대로마나 인자를 적용하면 되는 상황에서는 원하는 결과를 얻을 수 있다. 

**bind 함수의 아쉬운 점 2가지**
1. 인자를 왼쪽에서부터 순서대로만 적용할 수 있다.
2. bind를 한 번 실행한 함수의 this는 무엇을 적용해 두었든 앞으로 바꿀 수 없다.

이런 아쉬움을 보완하고자 개발자들이 bind에서 this가 제외된 버전의 curry를 제안했다. 잘 구현된 사례로는 Lodash 의 _.curry가 있다. `_.curry`는 함수가 필요로 하는 인자의 개수가 모두 채워질 때까지는 실행이 되지 않다가 인자의 수가 모두 채워지는 시점에 실행된다. _.curry는 bind와 달리 this를 제외하고 인자만 적용해 둘 수 있어 좀 더 간결한 코딩이 가능하고, 이후에 this를 적용할 수 있다는 점에서 bind 보다 낫다. 그러나 커링은 인자의 수나 형이 명확하게 정해지지 않은 함수와는 잘 맞지 않는다.<br/>
<br/>

참고: [커링](https://ko.javascript.info/currying-partials)

bind는 왼쪽에서부터 원하는 만큼의 인자를 지정해 둘 수 있지만 원하는 지점을 비워두고 적용하는 것은 불가능하다. 이것을 개선한 방식이 바로 `partial` 이다.

```js
// 코드 1-54 존 레시의 partial

Function.prototype.partial = function () {
  var fn = this,
    args = Array.prototype.slice.call(arguments); // 1 
  return function () { // 2
    var arg = 0;
    for (var i = 0; i < args.length && arg < arguments.length; i++) // 5
      if (args[i] === undefined) args[i] = arguments[arg++]; // 6
    return fn.apply(this, args);
  };
};

function abc(a, b, c) {
  console.log(a, b, c);
}

var ac = abc.partial(undefined, "b", undefined); // 3
ac("a", "c"); // 4
// a b c
```

1. partial이 실행되면 fn에 자기 자신인 this를 담는다. 여기서 자기 자신은 abc 같은 함수다. args에는 partial이 실행될 때 넘어온 인자들을 배열로 변경하여 args에 담아 둔다.
2. fn과 args는 리턴된 익명 함수가 기억하게 되므로 지워지지 않는다.
3. abc.partial을 실행할 때 첫 번째 인자와 세 번째 인자로 넘긴 undefined 자리는 나중에 ac가 실행될 때 채워질 것이다.
4. ac를 실행하면서 넘긴 'a'와 'c'는
5. 리턴된 익명 함수의 arguments 에 담겨 있다.
6. for를 돌면서 미리 받아 두었던 args에 undefined가 들어 있던 자리를 arguments에서 앞에서부터 꺼내면서 모두 채운다. 다 채우고 나면 미리 받아 두었던 fn을 apply로 실행하면서 인자들을 배열로 넘긴다.

사실 partial은 구현이 잘 된 것은 아니다. 함수의 인자로 undefined를 사용하고 싶을 수도 있는데 undefined가 인자를 비워 두기 위한 구분자로 사용되고 있기 때문에, undefined를 미리 적용하고 싶다면 방법이 없다. 또한, 초기에 partial을 시랳앟ㄹ 때 나중에 실제로 실행될 함수에서 사용할 인자의 개수만큼 꼭 미리 채워놓아야만 한다. 만일 개수를 채워 놓지 않으면 아래와 같이 동작한다.

```js
// 코드 1-55

var ac2 = abc.partial(undefined, "b");
ac2("a", "c"); // a b undefined

// I get "a b undefined" but the book says "a c undefined" 🤔
```

이처럼 partial이 가진 제약은 '인자 개수 동적으로 사용하기'나 'arguments 객체 활용'과 같은 자바스크립트의 유연함을 반영하지 못한다는 점에서 특히 아쉽다. 

만일 add라는 함수가 다음과 같이 구현되어 있었다면 partial과는 합이 더욱 맞지 않는다.

```js
// 코드 1-56.

function add() {
  var result = 0;
  for (var i = 0; i < arguments.length; i++) {
    result += arguments[i];
  }
  return result;
}
add(1, 2, 3, 4, 5); // 15

var add2 = add.partial(undefined, 2);
add2(1, 3, 4, 5); // 3

var add3 = add.partial(undefined, undefined, 3, undefined, undefined);
add3(1, 2, 4, 5); //15

add3(50, 50, 50, 50); // 15 - 버그
add3(100, 100, 100, 100); // 15 - 버그
```

위 상황에서 add2는 3,4,5 인자를 무시하게 된다. add3처럼 하면 1,2,4,5를 모두 사용할 수 있게 되지만 `undefined`로라도 인자 개수를 채워놔야 해서 코드가 깔끔하지 못하고, partial 이후에는 역시 4개 이상의 인자를 사용할 수 없다는 단점이 생긴다. 그런데 무엇보다 훨씬 치명적인 문제는 partial로 만든 함수는 재사용이 불가능하다는 것이다. 이것을 보완해보자

```js
// 코드 1-57. 실수 고치기

Function.prototype.partial = function () {
  var fn = this,
    _args = arguments; // 1) 클로저가 기억할 변수에는 원본을 남기기
  return function () {
    var args = Array.prototype.slice.call(_args);
      // 2) 리턴된 함수가 실행될 때마다 복사하여 원본 지키기
    var arg = 0;
    for (var i = 0; i < args.length && arg < arguments.length; i++)
      if (args[i] === undefined) args[i] = arguments[arg++];
      // 실행 때마다 새로 들어온 인자 체우기
    return fn.apply(this, args);
  };
};

function add() {
  var result = 0;
  for (var i = 0; i < arguments.length; i++) {
    result += arguments[i];
  }
  return result;
}

var add3 = add.partial(undefined, undefined, 3, undefined, undefined);

add3(1, 2, 4, 5); //15
add3(50, 50, 50, 50); //203
add3(10, 20, 30, 40); //103
```



🔽 gotta study about it.

```js
// 코드 1-58. Underscore.js의 _.partial

var ac = _.partial(abc, _, "b");
ac("a", "c");

var b = _.partial(abc, "a", _, "c");
b("b");

var ab = _.partial(abc, _, _, "c");
ab("a", "b");

var add2 = _.partial(add, _, 2); 
add2(1, 3, 4, 5);
add2(3, 5);

function equal(a, b) {
  return a === b;
}

var isUndefined = _.partial(equal, undefined);
isUndefined(undefined);

var bj = {
  name: "BJ",
  greet: _.partial(
    function (a, b) {
      return a + this.name + b;
    },
    "저는 ",
    "입니다."
  ),
};
bj.greet();

bj.greet.call({ name: "HA" });

var greetPj = bj.greet.bind({ name: "PJ" });
greetPj();

bj.greet();
```

---

Prev: [1-3. 함수형 자바스크립트의 실용성 2](../1-3/README.md) <br/>
Next: [1.5. 정리](../1-5/README.md)

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