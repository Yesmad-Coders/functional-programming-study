# 1장. 함수형 자바스크립트 소개

> 절차지향적으로 작성된 코드를 함수형으로 리팩터링하면서 함수형 자바스크립트의 실용성을 확인한다. 실무에서 사용할 만한 데이터와 코드에서 map, filter, find 등 고차 함수의 로직을 발견한다. 클로저에 대해서는 함수형 자바스크립트적인 관점으로 다시 접근하여 설명한다.

<br/>

좋은 프로그램이란 **사용성, 성능, 확장성, 기획 변경에 대한 대응력** 등을 척도로 삼아 이것들을 효율적, 생산적으로 이뤄낸 프로그램이다. 함수형 프로그래밍은 부수 효과(side effect)를 최대한 멀리하고 조합성을 강조해 성공적인 프로그래밍을 이루도록 함에 그 목적이 있다.

부수 효과를 멀리하는 이유? (1)오류를 줄이기 위해 (2)조합성 혹은 모듈화 수준을 높히기 위해

## 🗂 목차
<details>
<!-- <summary>1.1 <a href="1-1/README.md">함수형 프로그래밍 그거 먹는건가요?</a></summary>  -->
<summary>1.1 <a href="#1-1">함수형 프로그래밍 그거 먹는건가요?</a></summary>
<div markdown="1">
&nbsp&nbsp&nbsp&nbsp 1.1.1 <a href="#1-1-1">함수형 자바스크립트를 검색하면 나오는 예제</a> <br/>
&nbsp&nbsp&nbsp&nbsp 1.1.2 <a href="#1-1-2">값으로써의 함수와 클로저</a><br/>
</div>
</details>

<details>
<summary>1.2 <a href="#1-2">함수형 자바스크립트의 실용성</a> </summary>
<div markdown="1">
&nbsp&nbsp&nbsp&nbsp 1.2.1 <a href="#1-2-1">회원 목록 중 여러 명 찾기</a><br/>
&nbsp&nbsp&nbsp&nbsp 1.2.2 <a href="#1-2-2">for에서 filter로, if에서 predicate로</a><br/>
&nbsp&nbsp&nbsp&nbsp 1.2.3 <a href="#1-2-3">함수형 프로그래밍 관점으로  filter 보기</a><br/>
&nbsp&nbsp&nbsp&nbsp 1.2.4 <a href="#1-2-4">map 함수</a><br/>
&nbsp&nbsp&nbsp&nbsp 1.2.5 <a href="#1-2-5">실행 결과로 바로 실행하기</a><br/>
&nbsp&nbsp&nbsp&nbsp 1.2.6 <a href="#1-2-6">함수를 값으로 다룬 예제의 필요성</a><br/>
</div>
</details>

<details>
<summary>1.3 <a href="#1-3">함수형 자바스크립트의 실용성 2</a></summary>
<div markdown="1">
&nbsp&nbsp&nbsp&nbsp 1.3.1 <a href="#1-3-1">회원 목록 중 한 명 찾기</a><br/>
&nbsp&nbsp&nbsp&nbsp 1.3.2 <a href="#1-3-2">값에서 함수로</a><br/>
&nbsp&nbsp&nbsp&nbsp 1.3.3 <a href="#1-3-3">함수를 만드는 함수와 find, filter 조합하기</a><br/>
&nbsp&nbsp&nbsp&nbsp 1.3.4 <a href="#1-3-4">고차 함수</a><br/>
&nbsp&nbsp&nbsp&nbsp 1.3.5 <a href="#1-3-5">function identity(v) {return v;}, 이건 어디다 쓰는거지?</a><br/>
&nbsp&nbsp&nbsp&nbsp 1.3.6 <a href="#1-3-6">연산자 대신 함수로</a><br/>
&nbsp&nbsp&nbsp&nbsp 1.3.7 <a href="#1-3-7">함수 합성</a><br/>
</div>
</details>

<details>
<summary>1.4 <a href="#1-4">함수형 자바스크립트를 위한 기초</a></summary>
<div markdown="1">
&nbsp&nbsp&nbsp&nbsp 1.4.1 <a href="#1-4-1">일급 함수</a><br/>
&nbsp&nbsp&nbsp&nbsp 1.4.2 <a href="#1-4-2">클로저</a><br/>
&nbsp&nbsp&nbsp&nbsp 1.4.3 <a href="#1-4-3">클로저의 실용 사례</a><br/>
&nbsp&nbsp&nbsp&nbsp 1.4.4 <a href="#1-4-4">클로저를 많이 사용하라!</a><br/>
&nbsp&nbsp&nbsp&nbsp 1.4.5 <a href="#1-4-5">고차 함수</a><br/>
&nbsp&nbsp&nbsp&nbsp 1.4.6 <a href="#1-4-6">콜백 함수라 잘못 불리는 보조 함수</a><br/>
&nbsp&nbsp&nbsp&nbsp 1.4.7 <a href="#1-4-7">함수를 리턴하는 함수와 부분 적용</a><br/>
</div>
</details>

<details>
<summary>1.5 <a href="#1-5">정리</a></summary>
<div markdown="1">
</div>
</details>

## 📝 용어 정리
<details>
<summary>커링(Currying)</summary>
<div markdown="2">
&nbsp&nbsp&nbsp&nbsp 인자를 여러개 받는 함수를 분리하여, 인자를 하나씩만 받는 함수의 체인으로 만드는 방법. 함수형 프로그래밍의 기법 중 하나로 함수를 재사용하는데 유용하게 쓰일 수 있는 기법이다. 자바스크립트 내부에는 커링이 내장되어 있지 않지만 자바스크립트로도 구현이 가능하다.
</div>
</details>
<details>
<summary>부분 적용(Partial Application)</summary>
<div markdown="2">
&nbsp&nbsp&nbsp&nbsp 그 함수를 처리할 수 있는 파라미터의 범위가 부분적이다. 파라미터 값의 일부 범위만 처리할 수 있다.
</div>
</details>
<details>
<summary>클로저(Clojure)</summary>
<div markdown="2">
&nbsp&nbsp&nbsp&nbsp 내부함수가 외부함수의 지역변수에 접근 할 수 있고, 외부함수는 외부함수의 지역변수를 사용하는 내부함수가 소멸될 때까지 소멸되지 않는 특성을 의미한다. 내부함수는 외부함수의 지역변수에 접근 할 수 있는데 외부함수의 실행이 끝나서 외부함수가 소멸된 이후에도 내부함수가 외부함수의 변수에 접근 할 수 있다. 
</div>
</details>


---
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

<div id="1-2"></div>

### 1.2 함수형 자바스크립트의 실용성

절차지향적으로 작성된 코드를 함수형으로 변경하며 함수형 자바스크립트의 실용성을 알아보자.

[1.2.1 회원 목록 중 여러 명 찾기](#1-2-1)<br/>
[1.2.2 for에서 filer로, if에서 predicate로](#1-2-2)<br/>
[1.2.3 함수형 프로그래밍 관점으로 filter 보기](#1-2-3)<br/>
[1.2.4 map 함수](#1-2-4)<br/>
[1.2.5 실행 결과로 바로 실행하기](#1-2-5)<br/>
[코드 1-12와 코드 1-5 비교 해보기 (함수형 vs 반복문)](#comparison-1)<br/>
[1.2.6 함수를 다른 값으로 다룬 예제의 실용성](#1-2-6)<br/>

<br/>


<div id="1-2-1"></div>

#### 1.2.1 회원 목록 중 여러 명 찾기

```javascript
// 코드 1-5. for 문으로 필터링하기

var users = [
  { id: 1, name: "ID", age: 32 },
  { id: 2, name: "HA", age: 25 },
  { id: 3, name: "BJ", age: 32 },
  { id: 4, name: "PJ", age: 28 },
  { id: 5, name: "JE", age: 27 },
  { id: 6, name: "JM", age: 32 },
  { id: 7, name: "HI", age: 24 },
];

// (1) user 중 나이 30 미만을 모아서 emp_users에 담아 출력한다
var temp_users = [];
for (var i = 0, len = users.length; i < len; i++) {
  if (users[i].age < 30) temp_users.push(users[i]);
}
console.log(temp_users.length); // 4

// (2) 그들의 나이만 다시 모아 출력한다
var ages = [];
for (var i = 0, len = temp_users.length; i < len; i++) {
  ages.push(temp_users[i].age);
}
console.log(ages); // [25,28,27,24]

// (3) 나이 30 이상을 모아서 temp_users에 담아 출력한다
var temp_users = [];
for (var i = 0, len = users.length; i < len; i++) {
  if (users[i].age >= 30) temp_users.push(users[i]);
}
console.log(temp_users.length); // 3

// (4) 그들의 이름만 다시 모아 출력한다
var names = [];
for (var i = 0, len = temp_users.length; i < len; i++) {
  names.push(temp_users[i].name);
}
console.log(names); // ['ID','BJ','JM']

```
(1)과 (3)의 for 문에서 조건(`age >= 30, age < 30`)을 제외하고는 모두 동일한 코드를 가지고 있다. 이런 중복을 제거하기 위해 함수를 활용하면 쉽게 추상화가 가능하다.

<div id="1-2-2"></div>

#### 1.2.2 for에서 filer로, if에서 predicate로

```javascript
// 코드 1-6. filter

// 기존 코드
/*
var temp_users = [];
for (var i = 0, len = users.length; i < len; i++) {
  if (users[i].age < 30) temp_users.push(users[i]);
}
console.log(temp_users.length); // 4
*/

// 바꾼 코드
function filter(list, predicate) {
  var new_list = [];
  for (var i = 0, len = list.length; i < len; i++) {
    if (predicate(list[i])) new_list.push(list[i]);
  }
  return new_list;
}
```

filter 함수는 인자로 `list`와 `predicate 함수`를 받는다. 루프를 돌며 list의 i 번째의 값을 predicate에게 넘겨준다. predicate 함수는 list.length 만큼 실행되며, predicate 함수의 결과가 참일 때만 new_list.push 를 실행한다. **new_list.push가 실행될지 여부를 predicate 함수에게 완전히 위임한 것**이다. filter 함수는 predicate 함수 내부에서 어떤 일을 하는지(어떤 조건을 만드는지) 모르고, 오직 predicate 의 결과에만 의존한다.

마지막에 new_list 를 리턴하는데 여기서 `new_` 는 함수형 프로그래밍에서 상징적인 부분이다. 이전 값의 상태를 변경하지 않고(조건에 맞지 않는 값을 지우거나 하지 않고) 새로운 값을 만드는 식으로 값을 다루는 것은 함수형 프로그래밍의 매우 중요한 콘셉트 중 하나다.

```javascript
// 코드 1-7. filter 사용

// (1)
                                    //predicate
var users_under_30 = filter(users, function (user) {
  return user.age < 30;
});
console.log(users_under_30.length); // 4

var ages = [];
for (var i = 0, len = users_under_30.length; i < len; i++) {
  ages.push(users_under_30[i].age);
}
console.log(ages); // [25,28,27,24]

// (2)
var users_over_30 = filter(users, function (user) {
  return user.age >= 30;
});
console.log(users_over_30.length); // 3

var names = [];
for (var i = 0, len = users_over_30.length; i < len; i++) {
  names.push(users_over_30[i].name);
}
console.log(names); // [ 'ID', 'BJ', 'JM' ]
```

(1), (2)에서 filter 함수를 실행하며 predicate 자리에 익명 함수를 정의해 넘겼다. 여기서 익명함수는 true/false 를 리턴하며, filter 함수는 익명함수가 true 를 넘겨줄 때만 new_list에 user를 담아 리턴한다.(코드 1-6, 코드 1-7)

<div id="1-2-3"></div>

#### 1.2.3 함수형 프로그래밍 관점으로 filter 보기

`filter` 함수는 **항상 동일하게 동작하는 함수**다. 한가지 로직을 가졌다는 얘기다. filter 함수의 로직은 외부나 내부의 어떤 상태 변화에도 의존하지 않는다. 또한, new_list는 이 함수에서 최초로 만들어졌고, new_list가 완성될 때 까지는 외부에서 어떠한 접근도 할 수 없기 때문에 filter의 결과도 달라질 수 없다. new_list 가 완성되고 나면 new_list를 리턴해버리고 filter는 <u>완전히 종료</u> 된다. new_list가 외부로 전달되고 나면 new_list와 filter와의 연관성도 없어진다.

```javascript
// 코드 1-6. filter

function filter(list, predicate) {
    var new_list = [];
    for(var i=0, len=list.length; i<len;i++>) {
        if(predicate(list[i])) new_list.push(list[i]);
    }
    return new_list;
}
```

filter의 if는 predicate 결과에만 의존한다. 코드 1-7에서 filter를 사용하는 부분에는 for 도 없고 if 도 없기 때문에 별도의 로직이라고 할 만한 것이 없으며 매우 단순하고 쉽다. predicate 에서도 역시 변경되는 값이 없으며 true/false 를 if 에게 전달하는 일만 한다.

```javascript
// 코드 1-7의 일부분을 떼어왔다

filter(users, function (user) { return user.age < 30 });
```
- 절차지향 프로그래밍: 위에서 아래로 내려가며 특정 변수의 값을 변경해 나가는 식으로 로직을 만든다.
- 객체지향 프로그래밍: 객체들을 만들어놓고 객체들 간의 협업을 통해 로직을 만든다. 이벤트 등으로 서로 연결한 후 상태 변화를 감지해 자신의 랎을 변경하거나 상대의 메서드를 직접 실행해 상태를 변경하는 식이다.
- 함수형 프로그래밍: **항상 동일하게 동작하는 함수** 를 만들고 보조 함수를 조합하는 식을 로직을 완성한다. 내부에서 관리하고 있는 상태를 따로 두지 않고 넘겨진 인자에만 의존한다. 동일한 인자가 들어오면 항상 동일한 값을 리턴한다. 보조 함수 역시 인자이며, 보조함수에서도 상태를 변경하지 않으면 보조 함수를 받은 함수는 항상 동일한 결과를 만드는 함수가 된다.

> 현대 프로그래밍에서 다루는 값은 대부분 객체이므로 함수형 프로그래밍에서도 결국 객체를 다뤄야 한다. 다만 기능 확장을 객체의 확장으로 풀어가느냐 함수 확장으로 풀어가느냐의 차이다. 객체를 확장하느냐 객체를 다루는 함수를 늘리느냐의 차이이며 추상화의 단위가 클래스냐, 함수냐의 차이다.

#### 1.2.4 map 함수
리팩터링의 핵심은 중복을 제거하고 의도를 드러내는 것이다.

```javascript
// 코드 1-8. map

// 기존 코드(코드 1-7.)
/*
var ages = [];
for (var i = 0, len = users_under_30.length; i < len; i++) {
  ages.push(users_under_30[i].age);
}
console.log(ages); // [25,28,27,24]

var names = [];
for (var i = 0, len = users_over_30.length; i < len; i++) {
  names.push(users_over_30[i].name);
}
console.log(names); // [ 'ID', 'BJ', 'JM' ]
*/

// 바꾼 코드
function map(list, iteratee) {
  var new_list = [];
  for (var i = 0, len = list.length; i < len; i++) {
    new_list.push(iteratee(list[i]));
    // new_list에 무엇을 push 할 지 iteratee 함수에게 위임했다
  }
  return new_list;
}
```

map  함수를 사용해 보자.

```javascript
// 코드 1-9 map 사용

var users_under_30 = filter(users, function (user) { return user.age < 30; });
console.log(users_under_30.length); //4

var ages = map(users_under_30, function (user) { return user.age; });
console.log(ages); // [25 ,28, 27, 24]

var users_over_30 = filter(users, function (user) { return user.age >= 30; });
console.log(users_over_30.length); // 3

var names = map(users_over_30, function (user) { return user.name;});
console.log(names); // ["ID", "BJ", "JM"]

```

- 회원 중 나이가 30세 미만인 사람들을 뽑아 users_under_30에 담는다.
- users_under_30에 담긴 회원의 나이만 뽑아서 출력한다.
- 회원 중 나이가 30세 이상인 사람들을 뽑아 users_over_30에 담는다.
- users_over_30에 담긴 회원의 이름만 뽑아서 출력한다.

for도 없고, if도 없다. 코드가 매우 단순해졌으며, 코드를 해석한 내용과 코드의 내용이 거의 일치하고 읽기 쉽다.

<div id="1-2-5"></div>

#### 1.2.5 실행 결과로 바로 실행하기

함수의 리턴값을 바로 다른 함수의 인자로 사용하면 변수 할당을 줄일 수 있다. filter 함수의 결과가 배열이므로 map의 첫 번째 인자로 바로 사용 가능하다.

<span style="color:green">Q. 변수 할당을 줄였을 때 장점이 있나?</span>

```javascript
// 코드 1-10 함수 중첩

var ages = map(
  filter(users, function (user) { return user.age < 30; }),
  function(user) { return user.age; });

console.log(ages.length); // 4
console.log(ages); // [25, 28, 27, 24]

var names = map(
  filter(users, function (user) { return user.age >= 30; }),
  function (user) { return user.name; });

console.log(names.length); // 3
console.log(names); // ["ID", "BJ", "JM"]
```

여기서 작은 함수를 하나 더 만들면 변수 할당(ages, names)을 모두 없앨 수 있다.


```javascript
// 코드 1-11 합수 중첩2
function log_length(value) {
  console.log(value.length);
  return value;
}

console.log(log_length(
  map(
                  // predicate
    filter(users, function (user) { return user.age < 30; }),
    function (user) { return user.age;})));
// 4
// [25, 28, 27, 24]

console.log(log_length(
  map(
                  // predicate
    filter(users, function(user) { return user.age >= 30; }),
    function(user) { return user.name; })))
// 3
// ["ID", "BJ", "JM"]
```
```javascript
// 코드 1-8. map
function map(list, iteratee) {
  var new_list = [];
  for (var i = 0, len = list.length; i < len; i++) {
    new_list.push(iteratee(list[i]));
  }
  return new_list;
}
```
filter 함수는 predicate를 통해 값을 필터링하여 map에게 전달하고, map은 받은 iteratee를 통해 새로운 값들을 만들어 log_length에게 전달한다. log_length는 length(`value.length`)를 출력한 후 받은 인자를 그대로 console.log에게 전달하고 console.log는 받은 값을 출력한다
코드 1-5를 완전히 함수형으로 변화시킨 코드는 아래와 같다.
```javascript
// 코드 1-12. filter, map
function filter(list, predicate) {
  var new_list = [];
  for (var i = 0, len = list.length; i < len; i++) {
    if (predicate(list[i])) new_list.push(list[i]);
  }
  return new_list;
}
function map(list, iteratee) {
  var new_list = [];
  for (var i = 0, len = list.length; i < len; i++) {
    new_list.push(iteratee(list[i]));
  }
  return new_list;
}
function log_length(value) {
  console.log(value.length);
  return value;
}
console.log(log_length(
    map(
      filter(users, function (user) { return user.age < 30;}),
      function (user) { return user.age; })));
console.log(log_length(
    map(
      filter(users, function (user) { return user.age >= 30; }),
      function (user) { return user.age; })));
```
<br/>

<div id="comparison-1"></div>

👉🏼 코드 1-12와 코드 1-5 비교 해보기 (함수형 vs 반복문)
![code-comparison](/bravacoreana/chapter-01/img/code-comparison.png)

💁🏻‍♀️ 현재까지의 코드 자체는 길어졌지만 filter, map, log_length 함수를 재활용 할 수 있게 되어 본격적으로 코드가 길어지는 경우 훨씬 더효율적인 코드 작성이 가능해졌다. 게다가 반복문을 피하면서 코드가 훨씬 예뻐졌다! 🎉

<div id="1-2-6"></div>

#### 1.2.6 함수를 다른 값으로 다룬 예제의 실용성
1.1 절에 나왔던 addMaker 와 비슷한 패턴의 함수가 실제로도 많이 사용되는데 이것과 비슷한 패턴의 함수인 bvalue 함수를 만들면 코드 1-12 의 코드를 더 줄일 수 있다.

```javascript
// 코드 1-13. 함수를 리턴하는 함수 bvalue
// 코드 1-1. addMaker
function addMaker(a) {
    return function (b) {
      return a + b;
    };
  }
  
function bvalue(key) {
    return function(obj) {
        return obj[key];
    }
}
bvalue('a')({a:"hi", b:"hello"}); // hi
```

![code-1-13](img/1-13.jpeg)

`bvalue` 를 실행할 때 넘겨준 인자 key(위에서는 'a')를 나중에 obj를 받을 익명함수(파란박스)가 기억한다.(**클로저!**) bvalue의 실행 결과는 key를 기억하는 함수고 이 함수에는 key/value 쌍으로 구성된 객체를 인자로 넘길 수 있다. 이 함수(파란박스)는 obj을 받아 앞에서 받아두었던 key(a)로 value(hi) 값을 리턴한다. 즉, a 를 기억해 두었다가 넘겨진 객체의 obj['a']에 해당하는 결과값 "hi" 를 리턴한다.

```javascript
// 코드 1-14. bvalue로 map의 iteratee 만들기

// (1)
console.log(log_length(
    map(filter(users, function (user) { return user.age < 30;}),
    bvalue("age"))));

console.log(log_length(
    map(filter(users, function (user) { return user.age >= 30; }),
    bvalue("name"))));
```

▶ (1)의 코드 설명: `filter`로 걸러진 obj를 `map`이 돌리고 그 중 `bvalue`(obj에서 key에 따른 value를 뽑는 함수)를 통해 age라는 key의 value를 추출한다.
<br/><br/>
map이 사용할 iteratee 함수를 bvalue가 리턴한 함수로 대체했다.<br/>
(원래 `map(list, iteratee)` 형태임을 기억하자.)<br/>
익명 함수 선언 대신 `bvalue`를 넣음으로서 코드가 더욱 짧아졌다!

```javascript
// 코드 1-15. 화살표 함수와 함께

const log_length = require("./data/log_length");
const users = require("./data/users");
const map = require("./data/map");
const filter = require("./data/filter");
const bvalue = require("./data/bvalue");

// ES6
console.log(log_length(
    map(filter(users, u => u.age < 30), u => u.age)));
console.log(log_length(
    map(filter(users, u => u.age >= 30), u => u.name)));

// 이것도 괜찮다
var under_30 = u => u.age < 30;
var over_30 = u => u.age >= 30;

console.log(log_length(map(filter(users, under_30), u => u.age)));
console.log(log_length(map(filter(users, over_30), u => u.name)));

// // 아니면 이것도 괜찮다
var ages = list => map(list, v => v.age);
var names = list => map(list, v => v.name);

console.log(log_length(ages(filter(users, under_30))));
console.log(log_length(names(filter(users, over_30))));

// 마지막으로 한 번만 고쳐보자
var bvalues = (key) => (list) => map(list, v => v[key]);
var ages = bvalues("age");
var names = bvalues("name");

// bvalue가 있으면 화살표 함수가 아니어도 충분히 간결해진다
function bvalues(key) {
  return function (list) {
    return map(list, function (v) { return v[key]; });
  };
}

var ages = bvalues("age");
var names = bvalues("name");
var under_30 = function (u) { return u.age < 30; };
var over_30 = function (u) { return u.age >= 30; };

console.log("No7", log_length(ages(filter(users, under_30))));
console.log("No8", log_length(names(filter(users, over_30))));

// bvalue는 이렇게도 할 수 있다. (진짜 마지막!)
function bvalues(key) {
  var value = bvalue(key);
  return function (list) {
    return map(list, value);
  };
}
```

<div id="1-3"></div>

### 1.3 함수형 자바스크립트의 실용성 2

[1.3.1 회원 목록 중 한명 찾기](#1-3-1)<br/>
[1.3.2 값에서 함수로](#1-3-2)<br/>
[1.3.3 함수를 만드는 함수와 find, filter 조합하기](#1-3-3)<br/>
[1.3.4 고차 함수](#1-3-4)<br/>
[1.3.5 function identity(v) {return v;}, 이건 어디다 쓰는 거지?](#1-3-5)<br/>
[1.3.6 연산자 대신 함수로](#1-3-6)<br/>
[1.3.7 함수 합성](#1-3-7)<br/>

<div id="1-3-1"></div>

#### 1.3.1 회원 목록 중 한명 찾기

회원 목롱 중 특정 조건을 가진 회원 한 명을 찾고자 한다. 예를 들어 id 값으로 말이다.

```javascript
// 코드 1-16. filter로 한 명 찾기

var users = [
  { id: 1, name: "ID", age: 32 },
  { id: 2, name: "HA", age: 25 },
  { id: 3, name: "BJ", age: 32 },
  { id: 4, name: "PJ", age: 28 },
  { id: 5, name: "JE", age: 27 },
  { id: 6, name: "JM", age: 32 },
  { id: 7, name: "HI", age: 24 },
];

console.log(
  filter(users, function (user) { return user.id == 3 })[0]);
  // { id: 3, name: 'BJ', age: 32 }
```

▶ 코드 설명: filter가 배열로 반환되고 그 안에 우리가 원하는 obj 이 있기 때문에 `[0]`를 써서 배열로부터 obj을 꺼내준다. 즉, `filter(users, function (user) { return user.id == 3 })`까지만 봤을 때의 리턴값은 `[{ id: 3, name: 'BJ', age: 32 }]`가 된다.
<br/><br/>
이 코드의 경우 filter를 사용해 원하는 결과값을 찾을 수는 있지만 filter 함수는 무조건 `list.length`만큼 predicate(filter의 두번째 파라미터 값)가 실행되기 때문에 비효율적이고, 동일 조건에 값이 두 개 이상이라면 두 개 이상의 값을 찾는다. 따라서 코드 1-17과 같은 코드가 좀 더 효율적일 것이다.

```javascript
// 코드 1-17. break
// 코드 1-16 보다는 효율적이지만 재사용이 불가능하다

var user;
for (var i = 0, len = users.length; i < len; i++) {
  if (users[i].id == 3) {
    user = users[i];
        break;
    }
}
console.log(user);  // { id: 3, name: "BJ", age: 32 }
```
코드 1-17의 경우 filter 함수를 쓸 때와는 다르게 내가 원하는 값을 찾는 순간 break로 for문을 빠져 나올 수 있다. 따라서 코드 1-16 보다 효율적이다. 하지만 **재사용이 불가능**하다. 이것을 재사용이 가능하도록 다시 만든다면 코드 1-18 과 같다.

```javascript
// 코드 1-18. findById
// 재사용은 가능해졌지만 찾으려는 요소마다 함수를 따로 실행해야 하므로 효율적이지 못하다.

function findById(list, id) {
  for (var i=0, len=list.length; i < len; i++) {
    if(list[i].id == id) return list[i];
    }
}
console.log(findById(users, 3));    // { id: 3, name: "BJ", age: 32 }
console.log(findById(users, 5));    // { id: 5, name: "JE", age: 27 }
```

findById 함수는 list와 id를 받아서 for문을 돌다가 id가 같은 객체를 만나면 (1)그 값을 리턴하고 (2)함수도 종료되고 (3)for문도 멈춘다. 만약 for문을 다 돌았는데도 못찾았다면 undefined 가 리턴된다.

```javascript
// 코드 1-19. findByName

function findByName(list, name) {
    for (var i=0, len=list.length; i<len; i++) {
        if(list[i].name == name) return list[i];
    }
}

console.log(findByName(users, "BJ")); // { id: 3, name: "BJ", age: 32 }
console.log(findByName(users, "JE")); // { id: 5, name: "JE", age: 27 }
```

```javascript
// 코드 1-20. findByAge

function findByAge(list, age) {
    for(var i=0, len = list.length; i<len; i++) {
        if(list[i].age == age) return list[i];
    }
}

console.log(findByAge(users, 28));  // { id: 4, name: "PJ", age: 28 }
console.log(findByAge(users, 25));  // { id: 2, name: "HA", age: 25 }
```

코드 1-18, 1-19, 1-20 는 모두 코드에 중복이 있기에 같으면서 다르다.(same same but different!🤨) 결론부터 말하자면 이 함수들은 함수형이 아니다! 반복 요소를 줄일 수 있는 방법을 찾아보자.

```javascript
// 코드 1-21. findBy
// 반복은 피했지만 여전히 한계점이 있다.

function findBy(key, list, val) {
    for(var i=0, len=list.length; i<len; i++) {
        if(list[i][key]===val) return list[i];
    }
}

console.log(findBy('name', users, "BJ"));   // { id: 3, name: 'BJ', age: 32 }
console.log(findBy("id", users, 2));    // { id: 2, name: 'HA', age: 25 }
console.log(findBy('age', users, 28));  // { id: 4, name: 'PJ', age: 28 }
```

이렇게 만들면 이름, 나이, 아이디 뿐 아니라 object 내의 다른 값도 내 마음대로 골라 찾을 수 있다! Key로 value를 얻을 수 있는 객체들을 가진 배열마다 무엇이든 받을 수 있다는 말이다. 객체의 key 값이 뭐가 됐든 간에 찾아줄 수 있어서 훨씬 더 유연한(많은 경우를 대응할 수 있는) 함수가 되었다. 하지만! 아직 다음과 같은 상황을 지원하지 못하는 아쉬움이 있다.

- key가 아닌 method를 통해 값을 얻어야 할 때
- 두 가지 이상의 조건이 필요할 때
- ===이 아닌 다른 조건으로 찾고자 할 때

다음 예제는 user 객체가 메서드로 값을 얻어야 하는 객체인 경우에 발생하는 난감한 상황을 보여준다.

```javascript
// 코드 1-22. findBy로 안되는 경우
function User(id, name, age) {
    this.getId = function() { return id; }
    this.getName = function() { return name; }
    this.getAge = function() { return age; }
}

function findBy(key, list, val) {
    for(var i=0, len=list.length; i<len; i++) {
        if(list[i][key] === val) return list[i];
    }
}

var users2 = [
    new User(1, "ID", 32),
    new User(2, "HA", 25),
    new User(3, "BJ", 25),
    new User(4, "PJ", 25),
    new User(5, "JE", 25),
    new User(6, "JM", 25),
    new User(7, "HI", 25),
]

console.log(findBy('age', users2, 25)); // undefined
```
<div id="limitation"></div>
👉🏼 한계점: 코드 1-22에서 user의 나이를 getAge()로 얻어야 하기 때문에 findBy 함수로는 위 상황을 대응할 수 없음을 알 수 있다. 이름에 "P"가 포함된 user를 찾고 싶다거나, 나이가 32이면서 이름이 'JM'인 user를 찾고 싶다거나 하는 것도 불가능하다. 나이가 30 미만인 사람을 찾는 것도 findBy로는 할 수 없다. 이런 문제들을 함수형 프로그래밍을 통해 해결 해보자.

<div id="1-3-2"></div>

#### 1.3.2 값에서 함수로

앞서 만들었던 filter나 map처럼 인자로 키와 값 대신에 **함수**를 사용해보자. 그렇게 하면 모든 상황에 대응 가능한 find 함수를 만들 수 있다.

```javascript
// 코드 1-23. find

function find(list, predicate) {
    for (var i=0, len=list.length; i<len; i++) {
        if(predicate(list[i])) return list[i];
    }
}

console.log(find(users2, function(u) { return u.getAge() == 25;}).getName());
// HA
console.log(find(users, function(u) { return u.name.indexOf("P") != -1; }));
// { id: 4, name: 'PJ', age: 28 }
console.log(find(users, function(u) { return u.age == 32 && u.name == "JM"; }));
// { id: 6, name: 'JM', age: 32 }
console.log(find(users2, function(u) { return u.getAge() < 30; }).getName());
// HA
```

코드 1-21에서는 findBy의 인자로 `key`, `list`, `val` 를 받았지만 코드 1-23에서는 find의 인자로 `key`와 `predicate`를 받았다. list와 val 대신 predicate 함수를 받은 것이다. 다시 말해, **값 대신 함수를 받았다**. 덕분에 if 안쪽에서 할 수 있는 일이 훨씬 많아졌고 <a href="#limitation">앞서 언급했던 한계점</a>들도 극복할 수 있게 되었다. getAge같은 메서드 실행을 통해 값을 비교하기도 했고, indexOf와 같은 메서드를 통해 이름에 "P"가 포함되는지를 알아내기도 했다. 또한 두가지 조건을 모두 만족하는 값도 찾을 수 있고, range를 통한 값 찾기도 가능해졌다.
<br/>
<br/>
인자를 String이나 Number 대신 Function으로 변경했더니 매우 큰 차이를 만들었다. 덕분에 find는 이제 배열에 어떤 값이 들어 있든 사용할 수 있게 되었다. 앞서 만든 map과 filter도 마찬가지다.
> 함수형 자바스크립트는 이처럼 다형성이 높은 기법을 많이 사용하며 이런 기법은 정말 실용적이다.

<br/>
우리가 만든 filter, map, find 함수들은 들어온 데이터가 무엇이든지 루프를 돌리거나 분기를 만들거나 push를 하거나 predicate를 실행하거나 등의 자기 할 일을 한다. find는 전달 받을 데이터와 데이터의 특성에 맞는 보조 함수(predicate)도 함께 전달 받는다. 들어온 데이터의 특성은 보조 함수가 대응해 주기 때문에 find 함수는 데이터의 특성에서 완전히 분리될 수 있다. 이러한 방식은 다형성을 높이며 동시에 안정성도 높인다.
<br/>
filter나 find는 list 내부에 무엇이 들어 있는 지는 관심이 없다. 배열 내부 값의 상태를 변경하지도 않고 들여다 보지도 않는다. 객체지향 프로그래밍이 약속된 이름의 메서드를 대신 실행해 주는 식으로 외부 객체에 위임을 한다면, 함수형 프로그래밍은 보조 함수를 통해 완전히 위임하는 방식을 취한다. 이는 더 높은 다형성과 안정성을 보장한다.
<br/>
다음과 같은 함수들을 사용하면 각 데이터에 맞는 보조 함수로 대응하는 사례다.

```javascript
// 코드 1-24. 다형성

// 코드 1-16 에서 선언한 users
console.log(
    map(
        filter(users, function(u) { return u.age >= 30 }),
        function(u) { return u.name; }));
// [ 'ID', 'BJ', 'JM' ]

// 코드 1-22 에서 선언한 users2로 교체
console.log(map(
    filter(users2, function(u) { return u.getAge() > 30 }), // 메서드 실행으로 변경
    function(u) { return u.getName(); })); // 메서드 실행으로 변경
// ["ID"]
```

<div id="1-3-3"></div>

#### 1.3.3 함수를 만드는 함수와 find, filter 조합하기

User 등의 커스텀 객체가 아닌 자바스크립트 기본 객체로 만들어진 users를 사용한 예제로 돌아오자. 함수로 함수를 만들어 find 함수와 함께 사용하면 코드를 더욱 간결한게 만들 수 있다.

```javascript
// 코드 1-25. bmatch1로 predicate 만들기
// 하나의 key에 대한 value 만 비교할 수 있어서 bmatch1 이다.

function bmatch1(key, val) {
  return function (obj) {
    return obj[key] === val;
  };
}

console.log(find(users, bmatch1("id", 1))); // { id: 1, name: "ID", age: 32 }
console.log(find(users, bmatch1("name", "HI"))); // { id: 3, name: "HI", age: 24 }
console.log(find(users, bmatch1("age", 27))); // { id: 5, name: "JE", age: 27 }

```

bmatch1의 실행 결과는 함수다. key와 val을 미리 받아서 나중에 들어올 obj와 비교하는 익명 함수를 클로저로 만들어 리턴한다. bmatch1을 통해 id, name, age를 비교하는 predicate를 3개 만들어 find에게 넘겼다. bmatch1은 함수를 리턴하기 때문에 filter나 map과도 조합이 가능하다. _인자와 결과만으로 협업_하기 때문에 여기저기 붙이기 쉽다는 장점이 있다.


```javascript
// 코드 1-26. bmatch1 로 함수를 만들어 고차 함수와 협업하기

console.log(filter(users, bmatch1("age", 32)));
// [{ id: 1, name: "ID", age: 32 },
//   { id: 3, name: "BJ", age: 32 },
//   { id: 6, name: "JM", age: 32 }];

console.log(map(users, bmatch1("age", 32)));
// [true, false, true, false, false, true, false]
```

`bmatch1`은 하나의 key에 대한 value 만 비교할 수 있다. 여러 개의 key에 해당하는 value들을 비교하는 함수를 만들어 보자.

```javascript
// 코드 1-27 bmatch

var users = [
  { id: 1, name: "ID", age: 32 },
  { id: 2, name: "HA", age: 25 },
  { id: 3, name: "BJ", age: 32 },
  { id: 4, name: "PJ", age: 28 },
  { id: 5, name: "JE", age: 27 },
  { id: 6, name: "JM", age: 32 },
  { id: 7, name: "HI", age: 24 },
];

function bmatch(obj2, val) {
  if (arguments.length == 2) {
    obj2 = object(obj2, val);
  }
  return function (obj) {
    return match(obj, obj2);
  };
}

function object(key, val) {
  var obj = {};
  obj[key] = val;
  return obj;
}

function match(obj, obj2) {
  for (var key in obj2) {
    if (obj[key] !== obj2[key]) return false;
  }
  return true;
}

function find(list, predicate) {
  for (var i = 0, len = list.length; i < len; i++) {
    if (predicate(list[i])) return list[i];
  }
}

// [코드 1]
console.log(
  match(find(users, bmatch("id", 3)), find(users, bmatch("name", "BJ")))
);
// true;

console.log(find(users, bmatch({ name: "JM", age: 32 })));
// { id: 6, name: 'JM', age: 32

console.log(
  find(users, function (u) { return u.age == 32 && u.name == "JM"; })
);
// { id: 6, name: 'JM', age: 32

console.log(find(users, bmatch({ name: "JM", age: 32 })));
// { id: 6, name: 'JM', age: 32
```

👉🏼 코드 뜯어보기<br/>

```javascript
// [코드 1]

console.log(
        // A                           // B
  match(find(users, bmatch("id", 3)), find(users, bmatch("name", "BJ")))
);
// match(A,B) A 와 B 를 비교할거야 👉🏼 match 함수로 보냄
// match 함수로 들어가면 B 의 Object가 가진 key를 순차적으로 돌릴거야.
// 이 때 Object A 가 갖고 있는 key와 똑같은 key를 B에서 찾으면 true 아니면 false 를 보내줘.
```

```javascript
// [코드 1-A]

find(users, bmatch("id", 3))
// find 함수를 통해서 users 배열 내부의 객체를 하나씩 순서대로 bmatch 에 보내준다.
// 가장 먼저 users 의 첫번째 값인 { id: 1, name: "ID", age: 32 }를 가지고 bmatch와 비교하게 됨.
// bmatch를 이용해 우리가 찾고자 하는 값은 users 리스트 내부의 객체 중 id가 3인 객체다.
```

```javascript
// bmatch

function bmatch(obj2, val) {
  if (arguments.length == 2) {
    obj2 = object(obj2, val);
  }
  return function (obj) {
    return match(obj, obj2);
  };
}

// bmatch("id", 3) 이 들어왔고, arguments 가 2개 이므로 if문 내부로 들어간다.
// object 함수를 통하며 obj2 = { id : 3 } 이 되었다. (이 코드는 쉬워서 생략)
// obj는 users 리스트에서 순차적으로 들어오는 객체 값 (find 함수를 통해 넘어왔음)
// 가장 먼저 { id: 1, name: 'ID', age: 32 } 부터 하나씩 순차적으로 obj 에 들어오게 됨
// obj = { id: 1, name: "ID", age: 32 }
// obj2 = { id : 3 }
// 이 두 값을 match 함수로 넘겨준다
```

```javascript
// match

function match(obj, obj2) {
  for (var key in obj2) {
    if (obj[key] !== obj2[key]) return false;
  }
  return true;
}

// if 문 내에서 id가 3인 값을 못 찾으면 false / 찾으면 true를 내보냄
// 어떻게?
// obj의 key의 value 가 obj2의 key의 value와 다르면 false, 같으면 true를 넘겨준다.
// obj의 key의 value 는 1, 'ID', 32 가 들어오고, 이를 obj2의 key의 value인 3과 비교한다.
// 같은 값이 없으므로 false를 내보낸다.

// true를 만날 때 까지 users 의 값이 순차적으로 들어오며 비교한다.
```

여기서 `bmatch` 함수 내부에 `if (arguments.length == 2) obj2 = object(obj2, val);` 이런 조건문을 줌으로서 `(key, val)` 처럼 인자 2개를 보낼 수도 있고, `({ key: val })` 처럼 인자 1개로 만들어 사용할 수도 있다. 여기서 `({ key:val })` 방식을 사용하면 두 가지 이상의 값이 모두 동일한지도 확인할 수 있다. <br/><br/>

이번에는 find를 조금만 고쳐서 값 비교만 하는 `Array.prototype.indexOf` 보다 훨씬 활용도가 높은 findIndex를 만들어보자.

```javascript
// 코드 1-28. findIndex

function findIndex(list, predicate) {
  for (var i = 0, len = list.length; i < len; i++) {
    if (predicate(list[i])) return i;
  }
  return -1;
}

console.log(findIndex(users, bmatch({ name: "JM", age: 32 }))); // 5
console.log(findIndex(users, bmatch({ age: 36 }))); // -1

```

<div id="1-3-4"></div> 

#### 1.3.4 고차 함수

앞서 구현했던 map, filter, find, findIndex, bvalue, bmatch 같은 함수들은 모두 고차 함수다. 고차 함수란 **함수를 인자로 받거나 함수를 리턴하는 함수**를 말한다. 보통 고차 함수는 함수를 인자로 받아서 필요할 때 실행하거나 클로저를 만들어 리턴한다.<br/>

앞서 만든 map, filter, find, findIndex는 `Undersccore.js`에도 있는 함수들이다. [Underscore.js](https://underscorejs.org/)는 유명한 함수형 자바스크립트 라이브러리다.
Underscore.js은 `_.map`, `_.filter`, `_.find`, `_.findIndex`는 interatee와 predicate가 사용할 인자를 몇 가지 더 제공한다. 우리가 만든 map, filter, find, findIndex를 _.map, _.filter, _.find, _.findIndex에 가깝게 조금 더 고쳐 보자.


```javascript
// 코드 1-29. 인자 늘리기

_.map = function (list, iteratee) {
  var new_list = [];
  for (var i = 0, len = list.length; i < len; i++) {
    new_list.push(iteratee(list[i], i, list));
  }
  return new_list;
};

_.filter = function (list, predicate) {
  var new_list = [];
  for (var i = 0, len = list.length; i < len; i++) {
    if (predicate(list[i], i, list)) new_list.push(list[i]);
  }
  return new_list;
};

_.find = function (list, predicate) {
  for (var i = 0, len = list.length; i < len; i++) {
    if (predicate(list[i], i, list)) return list[i];
  }
};

_.findIndex = function (list, predicate) {
  for (var i = 0, len = list.length; i < len; i++) {
    if (predicate(list[i], i, list)) return i;
  }
  return -1;
};
```

원래는 `iteratee(list[i])` 처럼 인자를 한 개만 넘겼지만, 이제는 `iteratee(list[i], i, list)` 처럼 총 세 개의 인자를 넘긴다. iteratee와 predicate 함수가 받는 인자가 많아지며 좀 더 다양한 일을 할 수 있게 되었다. `_.filter` 함수의 predicate에게 두 번째 인자로 i가 넘어오는 덕분에 다음과 같은 함수 조합도 가능해졌다.

```javascript
// 코드 1-30. predicate에서 두 번재 인자 사용하기

console.log(
  _.filter([1, 2, 3, 4], function (val, idx) { return idx > 1; })
); // [3,4]

console.log(
  _.filter([1, 2, 3, 4], function (val, idx) { return idx % 2 == 0; })
); // [1,3]
```

<div id="1-3-5"></div> 

#### 1.3.5 function identity(v) {return v;}, 이건 어디다 쓰는 거지?

정말 쓸모 없어 보이는 함수가 있다. 코드 1-31이 그것인데, 이것은 Underscore.js 라이브러리에도 있는 함수다.

```javascript
// 코드 1-31. _.identity

_.identity = function (v) { return v; };
var a = 10;
console.log(_.identity(a)); // 10
```

이 함수는 그냥 받은 인자를 그대로 내뱉는 함수다. 이런 아무런 기능이 없는 함수는 언제 써야 할까?

```javascript
// 코드 1-32. predicate로 _.identity 를 사용한 경우
console.log(_.filter([true, 0, 10, "a", false, null], _.identity));
// [true, 10, 'a']
```

`_.filter`와 `_.identity`를 함께 사용했더니 **Truthy Values** 만 남았다. 이렇게 놓고 보니 `_.identity` 함수가 좀 더 실용적으로 보이지 않는가? `_.identity`를 다른 고차 함수와 조합하는 식으로 코드 1-33과 같은 유용한 함수들을 만들 수 있다.


> 🤚🏼 잠깐만요!
> false, undefined, null, 0, NaN, "" 은 모두 Boolean 으로 평가했을 때 false다. 따라서 이것들을 모두 Falsy values 라고 부른다. Falsy values 가 아닌 모든 값들은 Truthy values다.
> _.falsy = function(v) { return !v; }
> _.truthy = function(v) { return !!v; }


```javascript
// 코드 1-33. some, every 만들기 1

_.some = function (list) {
  return !!_.find(list, _.identity);
};

_.every = function (list) {
  return _.filter(list, _.identity).length == list.length;
};

console.log(_.some([0, null, 2])); // true
console.log(_.some([0, null, false])); // false

console.log(_.every([0, null, 2])); // false
console.log(_.every([{}, true, 2])); // true
```

여기서 `_.some`은 배열에 들어 있는 값 중 하나라도 true 가 있으면 true를 반환하고, 하나도 없으면 false 를 리턴한다. `_.every`는 모두 true 여야 true를 리턴한다. `_.some`, `_.every`는 if나 predicate 등과 함께 사용할 때 매우 유용하다. 그런데 코드 1-33에서 아쉬운 점이 하나 있다. filter를 사용했기 때문에 항상 루프 끝까지 돌게 된다는 것이다. 함수를 두 개 더 만들면 로직을 개선할 수 있다.


<div id="1-3-6"></div> 

#### 1.3.6 연산자 대신 함수로

```javascript
// 코드 1-34. 아주 작은 함수 not, beq

function not(v) { return !v; }

function beq(a) {
  return function (b) {
    return a === b;
  };
}
```

`!` 를 써도 되는데 왜 not 함수가 필요할까? `===`로 비교하면 되는데 왜 beq 함수가 필요할까? 얘들을 굳이 만들어야 하나? 하나하나 뜯어보면서 궁금증을 해결해 보자.


```javascript
// 코드 1-35. some, every 만들기 2

_.some = function (list) {
  return !!_.find(list, _.identity);
};

_.every = function (list) {
  return beq(-1)(_.findIndex(list, not));
};

console.log(_.some([0, null, 2])); // true
console.log(_.some([0, null, false])); // false
console.log(_.every([0, null, 2])); // false
console.log(_.every([{}, true, 2])); // true
```

not은 연산자 `!` 가 아닌 함수이기 때문에 `_.findIndex`와 함께 사용할 수 있다. list의 값 중 하나라도 부정적인 값을 만나면 predicate가 not 이므로 true를 리턴하여 해당 번째 i 값을 리턴하게 된다. 중간에 부정적인 값을 한 번이라도 만나면 루프가 중단된다. 만일 부정적인 값이 하나도 없다면 -1 을 리턴한다. -1이 나왔다면, beq(-1) 이 리턴한 함수에 인자로 넣어 true가 나올 것이고, 이것은 `_.every`의 리턴값이 된다. findIndex 로 부정적인 값을 하나도 찾지 못했다는 얘기는 결국 모두 긍정적인 값이라는 얘기가 된다.

`_.every`는 쓸모 없어 보이지만 작은 함수 not 덕분에 로직이 개선됐다. 여기서 가능한 함수가 한 가지 일만 하도록 함수를 조금 더 쪼개보자.

```javascript
// 코드 1-36. 함수 쪼개기

function positive(list) {
  return _.find(list, _.identity);
}

function negativeIndex(list) {
  return _.findIndex(list, not);
}

_.some = function (list) {
  return not(not(positive(list)));
};

_.every = function (list) {
  return beq(-1)(negativeIndex(list));
};

console.log(_.some([0, null, 2])); // true
console.log(_.some([0, null, false])); // false
console.log(_.every([0, null, 2])); // false
console.log(_.every([{}, true, 2])); // true
```

좀 더 깔끔해졌고, `positive`와 `negativeIndex`라는 재사용 가능한 함수도 얻었다!

<div id="1-3-7"></div>

#### 1.3.7 함수 합성

함수를 쪼갤수록 함수 합성은 쉬워진다. Underscore.js에 `_.compose` 라는 함수가 있따. 이 `_.compose`는 오른쪽 함수의 결과를 바로 왼쪽의 함수에게 전달한다. 그리고 해당 함수의 결과를 다시 자신의 왼쪽 함수에게 전달하는 고차 함수다. 코드 1-37은 Underscore.js 사이트에 있는 예제와 Underscore.js 내부의 코드다. <br/>
`arguments`, `apply`, `call` 객체 등이 익숙하다면 `_.compose` 함수의 코드를 읽는 것이 크게 어렵지 않을 것이다. arguments 객체는 함수형 자바스크립트를 다루다 보면 자주 만나게 된다. `arguments` 객체에 대해서는 2장에서 자세히 다룰 것이므로 가볍게 봐도 좋다 :)

```javascript
// underscore.js 중

_.compose = function () {
  var args = arguments;
  var start = args.length - 1;
  return function () {
    var i = start;
    var result = args[start].apply(this, arguments);
    while (i--) result = args[i].call(this, result);
    return result;
  };
};

var greet = function (name) {
  return "hi:" + name;
};

var exclaim = function (statement) {
  return statement.toUpperCase() + "!";
};

var welcome = _.compose(greet, exclaim);

console.log(welcome("moe"));  // hi:MOE!
```

welcome을 실행하면 먼저 exclaim을 실행하면서 "moe" 인자를 넘겨준다. exclaim의 결과는 대문자로 변환된 "MOE!" 이고 그 결과는 다시 greet의 인자로 넘어가 최종 결과로 "hi:MOE!"를 리턴한다. 이번엔 `_.compose`를 이용해 `_.some`과 `_.every`를 만들어보자.

```javascript
// 코드 1-38. _.compose로 함수 합성하기

/* 원래 코드 
_.some = function(list) {
    return not(not(positive(list)));
};
_.every = function(list) {
    return beq(-1)(negativeIndex(list));
}

*/
_.some = _.compose(not, not, positive);
_.every = _.compose(beq(-1), negativeIndex);
```

`_.compose`을 써서 `_.some`, `_.every`를 더 간결하게 표현했다. 맨 오른쪽의 함수가 인자를 받아 결과를 만들고 결과는 다시 그 왼쪽의 함수에게 인자로 전달된다. 오른쪽에서부터 왼쪽으로 연속적으로 실행되어 최종 결과를 만든다.

값 대신 함수로 for와 if 대신 고차 함수와 보조 함수로, 연산자 대신 함수로, 함수 합성 등 앞서 설명한 함수적 기법들을 사용하면 간결한 코드와 함수명으로 로직을 더 명확히 전달할 수 있다.

짧고 읽기 좋은 코드도 중요한 가치지만 좀 더 고상한 이점이 있다. 인자 선언이나 변수 선언이 적어진다는 것이다. 코드에 인자와 변수가 등장하지 않고 함수의 내부({statement})가 보이지 않는다는 새로운 상황도 생기지 않는다. 새로운 상황이 생기지 않는다는 것은 계발자가 예측하지 못할 상황이 없다는 말이다!🥳 에러 없는 함수들이 인자와 결과에 맞게 잘 조합되어 있다면 전체의 결과 역시 에러가 날 수 없다. 
<div id="1-4"></div>

### 1.4 함수형 자바스크립트를 위한 기초

함수를 잘 다루려면 함수와 관련된 개념들과 관련된 몇 가지 기능들에 대해 잘 알아야 하는데 이를테면 **일급 함수, 클로저, 고차함수, 콜백 패턴, 부분 적용, arguments 객체 다루기, 함수 객체의 메서드(bind, call, apply)** 등이 있다. 자바스크립트에서의 함수는 대충 익히고 넘기기엔 너무나 중요하다! 특히 소프트웨어 규모가 커지고 복잡도가 높아질수록 함수의 중요성은 더욱 커진다. 그러니.. 열심히 공부해보자 🥶


<div id="1-4-1"></div>

#### 1.4.1 일급 함수

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

<div id="1-4-2"></div>

#### 1.4.2 클로저

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

<div id="1-4-3"></div>

#### 1.4.3 클로저의 실용 사례

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
<div id="1-4-4"></div>

#### 1.4.4 클로저를 많이 사용하라!

클로저는 자바스크립트에서 절차지향 프로그래밍, 객체지향 프로그래밍, 함수형 프로그래밍 모두를 지탱하는 아주 중요한 기능이자 개념이다. 클로저는 메모리 누수 같은 위험성을 가지고 있다. 하지만 메모리 누수나 성능 저하의 문제는 클로저의 단점이나 문제가 아니다. 클로저를 정확하게 사용하면 단점을 극복할 수 있다. 

<div id="1-4-5"></div>

#### 1.4.5 고차 함수

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
<div id="1-4-6"></div>

#### 1.4.6 콜백 함수라 잘못 불리는 보조 함수

콜백 함수를 받아 자신이 해야 할 일을 모두 끝낸 후 결과를 되돌려 주는 함수도 고차 함수다. 보통은 비동기가 일어나는 상황에서 사용되며 콜백함수를 통해 다시 원래 위치로 돌아오기 위해 사용되는 패턴이다. 콜백 패턴은 **끝나면 컨텍스트를 다시 돌려주는 단순한 협업 로직**을 가진다. 컨텍스트를 다시 돌려주는 역할을 가지고 있기 때문에 callback 이라고 함수 이름을 지은 것이다. 콜백 함수는 익명이든 아니든 상관없고 익명 함수가 넘어가는 모양을 가졌다고 해서 반드시 콜백 함수 인 것도 아니다.

`button.click(function() {})` 와 같은 함수도 콜백 함수 보다 이벤트 리스너라고 칭하는 것이 더 적합하다. **함수가 고차 함수에서 쓰이는 역할의 이름으로 불러주면 된다.** `_.each([1,2,3], function() {})`에서의 익명 함수는 콜백이 아니라 `iteratee`이며 `_.filter(users, function() {})` 에서의 익명 함수는 `predicate`다. 콜백 함수는 종료되었을 때 단 한 번 실행되지만 iteratee나 predicate, listener 등은 종료될 때 실행되지 않으며 상황에 따라 여러 벌 실행되기도 하고 각각 다른 역할을 한다.
<div id="1-4-7"></div>

#### 1.4.7 함수를 리턴하는 함수와 부분 적용

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

