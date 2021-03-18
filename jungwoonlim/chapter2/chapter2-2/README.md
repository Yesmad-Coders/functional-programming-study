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

<sub id="2020-03-18"><sup>-- 2020-03-18 --</sup></sub>