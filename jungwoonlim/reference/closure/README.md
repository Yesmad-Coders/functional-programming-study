# 클로저 (Closure)

---

## 클로저란?

### MDN

함수와 함수가 선언된 언어적(정적) 환경의 조합

### 생활코딩에서 정의한 클로저의 개념

*클로저(closure)는 내부함수가 외부함수의 맥락(context)에 접근할 수 있는 것을 가르킨다. 클로저는 자바스크립트를 이용한 고난이도의 테크닉을 구사하는데 필수적인 개념으로 활용된다.*

JavaScript에서는 특정 함수 내부에 또다른 함수를 선언하는 것이 가능합니다.

이것을 '내부함수'라고 부르며 이것을 통해 구현한 것이 '클로저'힙니다.

예제 : 클로저 사용하기.

```jsx
// 유저의 이름을 담은 변수를 선언.
var users = [
	{ name : '김민수' },
	{ name : 'NoMoreBuild' },
	{ name : '임정운' },
	{ name : '김리하' },
	{ name : '최수현' },
	{ name : '성현제 Stevy' },
	{ name : '채혜민' },
	{ name : '김우리' },
	{ name : 'Henry' },
];

// 함수를 담을 변수를 선언.
var members = [];

// YesmadCoders라는 함수를 선언.
function YesmadCoders(name) {
	var _name = name;
	return function() {
		console.log(`${_name} is a member of the yesmadcoders group`);
	};
}

// members[0-8] 클로저를 선언.
for(let i = 0; i < users.length; i++){
	// 클로저에 name의 환경이 저장.
	members[i] = YesmadCoders(users[i].name);	
}

// 클로저 실행 - console.log
for(let i = 0; i < users.length; i++) {
	members[i]();
}

// 메모리를 release 시키기 위해서 클로저의 참조를 제거해야 합니다.
// 클로저를 통해 내부 변수를 참조하는 동안에는 내부 변수가 차지하는 메모리를 GC가 회수하지 않기 때문입니다.
members = null;
```

### 참고 사이트

- [https://likelion-kgu.tistory.com/74](https://likelion-kgu.tistory.com/74)
- [https://poiemaweb.com/js-closure](https://poiemaweb.com/js-closure)
- [https://hyunseob.github.io/2016/08/30/javascript-closure/](https://hyunseob.github.io/2016/08/30/javascript-closure/)
- [https://developer.mozilla.org/ko/docs/Web/JavaScript/Closures](https://developer.mozilla.org/ko/docs/Web/JavaScript/Closures)
- [https://chrisjune-13837.medium.com/자바스크립트-클로저란-d0150952b9df](https://chrisjune-13837.medium.com/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%ED%81%B4%EB%A1%9C%EC%A0%80%EB%9E%80-d0150952b9df)