# 1장 함수형 자바스크립트 소개

## ⚾Title

1. 함수형 프로그래밍 그거 먹는건가요?
2. 예제 코드를 작성하더라도 **생각하며 코드 작성**하기

## 1.1함수형 프로그래밍 그거 먹는건가요?

- 1.1.1 함수형자바스크립트를 검색하면 나오는 예제

*1-1*

```javascript
function addMaker(a) {
  return function (b) {
    return a + b;
  };
}

addMaker(10)(5); // 15
```
addMaker 함수에 인자 10을 넘겨주며 실행하면 바로 함수가 리턴되고 리턴된 함수를 인자 5화 실행되어 결과 15를 얻을수있다.

*1-2*
```javascript
var add5 = addMAker(5);
add5(3); //8
add5(4); //9
```

addMaker(5)를 실행하여 add5라고 이름을 지어주고 3, 4를 더해 결과를 얻었다. 
→이 예제들은 간단하지만 값으로서 함수, 클로저, 스코프 등의 많은 얘기를 담고있다.

*1-3*
```javascript
var v1 = 100;
var v2 = function () { };
function f1() { return 100; }
function f2() { return function () { }}
```

v1은 변수에 100을 v2는 변수에 함수를 담고있다. 
f1함수는 100을 리턴하며, f2함수는 함수를 리턴한다. 
v2와 f2처럼 함수는 값으로다뤄질수있다. 


- 1.1.2 값으로써의 함수와 클로저
 *1-4*
```javascript
function addMaker(a) {
    return function(b) {
        return a+b;
    }
}
addMaker(10)(15) // 15
var add5 = addMaker(5);
add5(3); //8
add5(4); //9

var add3 = addMaker(3);
add3(3) //6
add3(4) //7

```

함수는 값을 리턴할 수 있고 함수는 값이 될 수 있다. 
addMaker가 리턴한 익명함수는 클로저가 되었다.
코드 1-4에서 addMaker의 인자인 a는 불변하며 상수로 쓰이게된다 
→*이 상황에서 a는 불변하지만 모든 경우의 클로저가 그렇지는 않다.*


## 1.2 함수형 자바스크립트의 실용성
절차지향적으로 작성된 코드를 함수형으로 변경하면서 함수형 자바스크립트의 실용성을 알아보자.

```javascript
var users = [
  { id: 1, name: 'ID', age: 32 },
  { id: 2, name: 'HA', age: 25 },
  { id: 3, name: 'BJ', age: 32 },
  { id: 4, name: 'PJ', age: 28 },
  { id: 5, name: 'JE', age: 27 },
  { id: 6, name: 'JM', age: 32 },
  { id: 7, name: 'HI', age: 24 },
];
```
①
```javascript
var temp_users = [];
for (var i = 0, len = users.length; i < len; i++) {
  if (users[i].age < 30) temp_users.push(users[i]);
}
console.log(temp_users.length); // 4
```
①에서는 user중에 age가 30미만인 user[i]만 모아서 몇명인지를 출력하고

②
```javascript
var ages = [];
for (var i = 0, len = temp_users.length; i < len; i++) {
  ages.push(temp_users[i].age);
}
console.log(ages); // [25, 28, 27, 24]
```
②에서는 그들의 나이만 다시 모아 출력한다. 

③
```javascript
var temp_users = [];
for (var i = 0, len = users.length; i < len; i++) {
  if (users[i].age >= 30) temp_users.push(users[i]);
}
console.log(temp_users.length); // 3
```
③에서는 나이가 30이상인 temp_user가 몇명인지를 출력하고

④
```javascript
var names = [];
for (var i = 0, len = temp_users.length; i < len; i++) {
  names.push(temp_users[i].name);
}
console.log(names); // ["ID", "BJ", "JM"]
```
④에서는 그들의 이름만 모아 출력한다. 

- 1.2.2 for에서 filter로, if에서 predicate로

```javascript
function filter(list, predicate) {
  var new_list = [];
  for (var i = 0, len = list.length; i < len; i++) {
    if (predicate(list[i])) new_list.push(list[i]);
  }
  return new_list;
}
```   
filter함수는 인자로 list와 predicate함수를 받는다. 
루프를 돌며 list의 1번째값을 preicate에게 넘겨준다. predicate함수는 list.length만큼 실행되며 
predicate함수의 결과가 참일때만 new_list.push를 실행한다. 

- 1.2.3 함수형 프로그래밍 관점으로 filter보기
**filter함수는 항상 동일하게 동작하는 함수다.**
filter함수는 new_list의 값을 바꾸고 있지만 **그 변화에 의존하는 다른로직이 없다.** 
for는 인덱스의 변화에 의존하여 루프를 돌지만 그외의 **인덱스 변화에 의존한 다른 로직은없다**
new_list는 이 함수에서 최초로 만들어졌고 **외부의 어떠한 상황이나 상태와도 무관하다.** 
filter의 if는 predicate의 결과에만 의존한다. 

**절차지향 프로그래밍에서는 위에서 아래로 내려가면서 특정 변수의 값을 변경해 나가는 식으로 로직을 만든다.**
**객체 지향 프로그래밍에서는 객체를 만들어 놓고 객체들간의 협업을 통해 로직을 만든다.**
**함수형 프로그래밍에서는 항상 동일하게 동작하는 함수를 만들고 보조함수를 조합하는 식으로 프로그래밍을한다**

- 1.2.4 map 함수
리팩터링의 핵심은 중복을 제거하고 의도를 드러내는 것이다. 

```javascript
function map(list, iteratee) {
  var new_list = [];
  for(var i=0; len=list.legth; i<i++>) {
    new_list.push(iteratee(list[i]))
  }
  return new_list;
}
```


<div align="center">

<sub><sup>Written by <a href="https://github.com/woori3104">@woori3104</a></sup></sub><small>⚾</small>

</div>
