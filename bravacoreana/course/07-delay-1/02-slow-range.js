log("🔸 02.slow range 🔸");
const L = {};

L.range = function* (length) {
  log("hi~~~~~~~");
  let i = -1;
  while (++i < length) {
    log("L.range : ", i);
    yield i;
  }
};

// log("L.range(5) : ", L.range(5)); //L.range {<suspended>}
// log("L.range(2) : ", L.range(2)); //L.range {<suspended>}

// range() 로 나온 배열 값들 모두 더하기
const list2 = L.range(5);

// list2.next().value; // 이렇게 해줘야만 순서대로 출력됨
// list2.next().value;
// log("reduce(add2, list2) : ", reduce(add2, list2)); //10

/*

log(L.range(5)); 에서 리턴 값이 L.range {<suspended>} 이렇게 출력 되는데
이는 next()를 통해 값을 받아오는 이터레이터이다 .
리듀스가 이터러블을 받기 때문이다. 
이터러블을 받는다는 것은 list도 이터러블이고, 이터레이트도 이터러블이여서
이터러블을 이터레이터로 만든 다음에 안에 있는 값을 하나씩 조회해 값이 출력됨
*/

/* range의 경우 모든 부분이 바로 평가되어 값이 만들어 지지만
L.range의 경우 `const list2 = L.range(5);` 만 했을 때는
어떠한 값도 평가되지 않는다.

reduce(add2, list2) 처럼 어떤 값을 실제로 출력하기 전까지는
굳이 배열의 형태가 아니어도 된다는 것이다. 
따라서 L.range 같은 경우 배열이 아닌 상태로 있다가, 
reduce 안에서 실제로 값이 필요 할 때까지 기다렸다가 평가가 이루어져서 값을 꺼내도록 한다

*/
