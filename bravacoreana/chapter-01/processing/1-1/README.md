<div id="1-1"></div>

### 1.1 함수형 그거 먹는 건가요?


[1.1.1 함수형 자바스크립트를 검색하면 나오는 예제](#1-1-1)<br/>
[1.1.2 값으로써의 함수와 클로저](#1-1-2)<br/>

<div id="1-1-1"></div>

#### 1.1.1 함수형 자바스크립트를 검색하면 나오는 예제

```javascript
// 코드 1-1. addMaker

// 커링의 대표적인 예시
function addMaker(a) {
  return function (b) {
    return a + b;
  };
}
addMaker(10)(5); // 15
```

```javascript
// 코드 1-2. addMaker로 만든 함수

var add5 = addMaker(5);
add5(3); // 8
add5(4); // 9
```

위의 코드를 통해 값으로서의 함수, 클로저, 스코프 등 많은 이야기를 풀어낼 수 있다.

```javascript
// 코드 1-3 값으로서의 함수

var v1 = 100;
var v2 = function () {}; // 변수에 함수를 담고 있다
function f1() { return 100; }
function f2() { return function () {};} // f2 함수가 또 다른 함수를 리턴한다

```

<div id="1-1-2"></div>

#### 1.1.2 값으로써의 함수와 클로저


함수는 값을 리턴할 수 있고 함수는 값이 될 수 있다.

```javascript
// 코드 1-4. addMaker 다시보기

function addMaker(a) {
  return function (b) {
    return a + b;
  };
}

var add5 = addMaker(5); //15
add5(3); // 8
add5(4); // 9

var add3 = addMaker(3);
add3(3); // 6
add3(4); // 7
```


여기서 addMaker가 리턴한 익명 함수는 클로저가 되었다.

**클로저의 특징**: 리턴된 익명 함수 내부에서 a 를 정의한 적은 없지만 부모 스코프에 있는 a를 참조하고 있다.  (위에서는 a 값이 불변하며 상수로 쓰이지만 클로저가 기억하는 변수의 값은 변할 수 있음에 주의하자. → 1.4절 참고)
<br/>