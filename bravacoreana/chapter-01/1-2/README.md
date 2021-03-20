
<div id="1-2"></div>

## 1.2 함수형 자바스크립트의 실용성

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

### 1.2.1 회원 목록 중 여러 명 찾기

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

### 1.2.2 for에서 filer로, if에서 predicate로

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

### 1.2.3 함수형 프로그래밍 관점으로 filter 보기

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

### 1.2.4 map 함수
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

### 1.2.5 실행 결과로 바로 실행하기

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

### 1.2.6 함수를 다른 값으로 다룬 예제의 실용성
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


---

Prev: [1.1 함수형 프로그래밍 그거 먹는건가요?](../1-1/README.md)
Next: [1.3 함수형 자바스크립트의 실용성 2](../1-3/README.md)

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