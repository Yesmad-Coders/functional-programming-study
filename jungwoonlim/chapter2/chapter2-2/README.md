# 2.2 함수 정의 다시 보기

### 2.2.1 기본 정의

코드 2-13 일반적인 함수 정의

```jsx
function add1(a, b) {
	return a + b;
}
var add2 = function(a, b) {
	return a + b;
}
var m = {
	add3: function(a, b) {
		return a + b;
	}
};
```

### 2.2.2 호이스팅

> 호이스팅 : 함수 안에 있는 선언들을 모두 끌러올려서 해당 함수 유효 범위의 최상단에 선언하는 것.

코드 2-14 에러가 나는 상황이지만 호이스팅이다.

```jsx
add1(10, 5); // 15
add2(10, 5); // Uncaught TypeError: add2 is not a function(...) (anonymous function)

function add1(a, b) {
	return a + b;
}

var add2 = function(a, b) {
	return a + b;
};
```

add2는 호이스팅은 되었지만 초기화가 되지 않은 상태이기에 에러가 발생한다.

코드 2-15 선언한 적 없는 함수 실행

```jsx
hi(); // Uncaught ReferenceError: hi is not defined
```

에러가 다르다. 위 함수는 선언되지 않은 것이고 코드 2-14는 정의되었지만 초기화가 되지 않은 상태인 것이다.

 코드 2-16 선언한 적 없는 변수 참조하기

```jsx
var a = hi;
// Uncaught ReferenceError: hi is not defined
```

위 에러는 코드 2-14의 add2를 실행했을 때의 에러와 차이가 있다.

코드 2-14는 호이스팅에 의해 참조는 가능하지만 아직 function이 아니기에 나온 에러이고,

코드 2-15, 2-16은 선언되지 않았다는 에러이다.

코드 2-17 실행하지 않고 참조만 해보기

```jsx
console.log(add1); // function add1(a, b) { return a + b; }
console.log(add2); // undefiend

function add1(a, b) {
	return a + b;
}

var add2 = function(a, b) {
	return a + b;
}
```

둘의 차이를 명확하게 확인해보자.

add1과 add2의 차이는 변수 선언과 함수 선언의 차이다.

- 변수는 선언 단계와 초기화 단계가 구분되어 있다. 선언과 초기화가 동시에 이루어지지 않기 때문에 호이스팅에 의해 참조만 가능하고, 아직 값이 담기지 않아 실행은 불가능하다.
- 함수는 선언 단계와 초기화 단계가 동시에 이루어진다. 참조뿐 아니라 실행도 가능하다.

### 2.2.3 호이스팅 활용하기

코드 2-18 호이스팅을 이용하여 return문 아래에 함수 선언하기

```jsx
function add(a, b) {
	return valid() ? a + b : new Error();

	function valid() {
		return Number.isInteger(a) && Number.isInteger(b);
	}
}

console.log(add(10, 5)); // 15
console.log(add(10, "a")); // Error(...)
```

함수 선언과 호이스팅을 이용하면 다음과 같이 코드를 작성할 수 있다.

비교적 복잡한 코드를 하단부에 정의하고 실행부 코드는 깔끔하게 유지하는 등으로 활용할 수도 있다.

하지만 코드 2-18은 모 스타일 가이드에서는 권장하지 않는 형식이다.

지금은 이러한 기법이 유용할 때가 있다는 것을 알아두려는 것이니, 참고만 하면 좋을 것이다.

코드 2-19 호이스팅을 이용해 코드의 순서를 이해하기 편하게 배치

코드 2-19-1 end가 먼저 정의되어 코드가 다소 복잡하게 읽힌다.

```jsx
app.post('/login', function(req, res) {
	db.select('users', { where: {email: req.body.email } }, function(err,user) {
		function end(user){
			req.session.user = user;
			res.redirect('/');
		}

		if(user && user.password === req.body.password) return end(user);

		db.insert('users', {
			email: req.body.email,
			password: req.body.password,
		}, function(err, user) {
			end(user);
		});
	}); 
});
```

코드 2-19-2 호이스팅 덕분에 end를 나중에 정의해도 잘 동작한다. 가독성이 좋다.

```jsx
app.post('login', function(req,res) {
	db.select('users', { where: { email: req.body.email } }, function(err, user) {
		if(user && user.password === req.body.password) return end(user);

		db.insert('users', {
			email: req.body.email,
			password: req.body.password,
		}, function(err, user) {
			end(user);
		});

		function end(user) {
			req.session.user = user;
			res.redirect('/');
		}
	});
});
```

코드 2-19-2는 Node.js와 Express.js 등으로 개발하는 상황을 호이스팅을 이용해 코드의 가독성을 높인 사례다.

비동기 상황에서 분기도 필요해서 약간은 복잡할 수 있다. 하지만 end를 뒤로 두어 가독성이 좋아졌다.

여기서 사용한 end는 클로저다. req, res를 사용하기 때문이다.

end를 참조하는 곳이 익명 함수인 function (req,res) { ... } 이므로 함수들이 실행되고 나면 end, req, res 모두 메모리에 남지 않기 때문에 메모리 누수는 걱정하지 않아도 된다.

### 2.2.4 괄호 없이 즉시 실행하기

코드 2-20 일반적인 즉시 실행 방식

```jsx
(function(a) {
	console.log(a); // 100
})(100);
```

코드 2-21 에러가 난 경우

```jsx
function(a) {
	console.log(a);
}(100); // Uncaught SyntaxError : Unexpected token (
```

에러의 원인 : 익명 함수 선언 자체가 실패함.

코드 2-22 선언만 시도해도 에러가 나는 경우

```jsx
function () {
} // Uncaught SyntaxError: Unnexpected token (
```

실행없이 선언만해도 에러가 발생한다.

코드 2-23 괄호 없이 정의했는데 에러가 나지 않는 경우

```jsx
function f1() {
	return function() {
	}
}
f1();
```

정상 동작한다.

이 상황에서 에러가 나지 않는다면 괄호 없이 즉시 실행도 되지 않을까?

코드 2-24

```jsx
function f1() {
	return function(a){
		console.log(a);
	}(1);
}
f1(); // 1
```

정상 동작한다.

f1이라는 함수 안에 있는 익명 함수는 괄호 없이도 즉시 실행이 되었다.

코드 2-25 괄호 없이 정의가 가능한 (즉시 실행도 가능한) 다양한 상황

```jsx
!function(a) {
	console.log(a);
}(1); // 1

true && function(a) {
	console.log(a);
}(1); // 1

1 ? function(a) {
	console.log(a);
}(1) : 5;

0, function(a) {
	console.log(a);
}(1); // 1

var b = function(a) {
	console.log(a);
}(1); // 1

function f2() {}
f2(function(a) {
	console.log(a);
}(1)); // 1

var f3 = function c(a) {
	console.log(a);
}(1); // 1

new function() {
	console.log(1);
}; // 1
```

공통점 : 연산자와 함께 있고 함수가 값으로 다뤄졌다.

익명 함수뿐 아니라 유명 함수도 즉시 실행할 수 있다.

코드를 실행할 수 있는 모든 곳에서

모든 종류의 함수를 선언할 수는 없지만,

함수를 선언할 수 있는 모든 영역에서는 익명 함수든 유명 함수든 일반 함수든 메서드든 모두 실행할 수 있다.

연산자의 피연산자가 되면,  return등과 함께 사용되면 익명 함수를 선언할 수 있게 되고

익명 함수를 선언할 수 있으면 즉시 실행도 가능하다.

코드 2-26

```jsx
var pj = new function() {
	this.name = "PJ";
	this.age = 28;
	this.constructor,prototype.hi = function() {
		console.log('hi');
	}
};
console.log(pj); // { name: "PJ", age: 28 }
pj.hi(); // h1
```

위 코드와 같이 객체를 만드는 것도 가능하다.

값으로 함수를 잘 다룰 수 있다면 즉시 실행도 자유롭게 잘 다룰 수 있다는 것을 보여주기 위해 즉시 실행 방법에 대해 알아보았다. 다음과 같은 응용도 존재한다.

코드 2-27 즉시 실행하며 this 할당하기

```jsx
var a = function(a) {
	console.log(this, a);
}.call([1], 1); // [1], 1
```

함수의 메서드인 call을 바로 .으로 접근할 수도 있으며, 익명 함수를 즉시 실행하면서 this를 할당할 수도 있다.

즉시 실행 기법은 최상위 스코프에서만 사용하는 것이 아니다. 모듈간의 혼선을 보호하거나 은닉을 하기 위해서만 사용하는 것도 아니다.

(f())만 써야 하는 것도, (f)()만 써야 하는 것도 아니다. 특정 상황에 꼭 맞는 문법을 선택하면 된다.

### 2.2.5 new Function이나 eval을 써도 될까요?

함수를 정의하는 방법 중에는 new Function을 활용하는 방법이 있다.

여러가지 부정적인 의견이 있지만 인동님의 견해는 이렇다.

- 보안에 대한 과제는 클라이언트의 특정 요청에 대해 서버에서 응답을 줘도 될 것인지 안 될 것인지 잘 판단하는 데 달려있다.
- 소프트웨어의 성능은 어떤 기법을 어떻게 사용했는지에 따라 결정된다. 어떤 기법이든 좋은 로직이 뒷받침되어야 알맞고 효율적으로 사용할 수 있다.
- Javascript로 HTML 템플릿 엔진을 만든다거나, 기타 특정 상황에서 new Function이 꼭 필요할 때가 있다. 그럴 때 로직을 잘 보완하면 해당 코드가 성능에 미칠 부정적인 영향을 얼마든지 최소화할 수 있다.

아래 코드는 eval과 new Function의 사용법이다.

코드 2-28

```jsx
var a = eval('10 + 5');
console.log(a); // 15

var add = new Function('a, b', 'return a + b;');
add(10, 5); // 15
```

### 2.2.6 간단 버전 문자열 화살표 함수와 new Function 성능

ES6에서 화살표 함수를 사용할 수 있다.

2016년을 기준으로 Node.js 환경에서는 ES6의 화살표 함수가 정식으로 지원되고 있다.

그러므로 2.2.6 단원은 new Function이 무엇인지와 메모이제이션(memoization) 기법만 살펴보고 넘어가도록 하겠다.

ES5 환경에서도 화살표 함수를 사용해보고 싶다면 교재에 적혀있는대로 사용하는 방법도 가능하지만,

별로 이렇게 사용하고 싶지 않으니 기존 화살표 함수를 사용하겠다.

어떻게 정의하는지만 간단하게 표시하겠다.

- new Function 문법

함수 표현식과 함수 선언문 이외에 함수를 만들 수도 있는 방법이다.

```jsx
let func = new Function('a', 'b', 'return a + b;');
console.log(func(1,2)); // 3
```

- 메모이제이션(memoization)
    - 컴퓨터 프로그램이 동일한 계산을 반복해야 할 때, 이전에 계산한 값을 메모리에 저장함으로써 동일한 계산의 반복 수행을 제거하여 프로그램 실행 속도를 빠르게 하는 기술.
    - 동적 계획법의 핵심이 되는 기술이다. - 위키백과

간단하게 설명하면 아래와 같다.

```jsx
function longTimeFn(arg){
	if(/* arg로 캐시된 작업 결과가 있는가? */)
		return cache;
	else {
		// 아주 긴 시간 동안 긴 작업을 수행한다.
		// 캐시에 결과를 저장한다.
	}
	return result;
}

longTimeFn('jCloud'); // 캐시된 작업 결과가 없어 작업을 수행한다. 이후 캐시에 결과가 저장된다.
longTimeFn('noCloud'); // 캐시된 작업 결과가 없어 작업을 수행한다. 이후 캐시에 결과가 저장된다.
longTimeFn('noCloud'); // noCloud는 이미 실행된 작업이므로 캐시 결과를 반환한다.
longTimeFn('jCloud'); // jCLoud는 이미 실행된 작업이므로 캐시 결과를 반환한다.
```

반복 작업을 할때는 캐시에 저장하면 좋다.

ex 코드 제곱근

```jsx
function sqrt(arg) {
	if(!sqrt.cache)
		sqrt.cache = {};
	if(!sqrt.cache[arg])
		return sqrt.cache[arg] = Math.sqrt(arg);
	return sqrt.cache[arg];
}
```

함수 속성인 캐시 객체에 각 결과가 저장된 sqrt 함수를 볼 수 있다.

```jsx
sqrt(9);
sqrt(4);
console.log(sqrt.cache);
```

![image/_2021-03-25__9.39.10.png](image/_2021-03-25__9.39.10.png)

<sub id="2020-03-25"><sup>-- 2020-03-25 --</sup></sub>