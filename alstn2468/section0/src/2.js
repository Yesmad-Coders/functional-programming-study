import log from '../../lib/log';

// 일급 함수
// - 함수를 값으로 다룰 수 있다.
// - 조합성과 추상화의 도구
// - 자바스크립트에서 함수는 일급이다.

const add5 = (a) => a + 5; // add5 변수는 함수를 값으로 담고있다.
log(add5); // 함수를 출력할 수 있다. -> ƒ add5(a) { return a + 5; }
log(add5(5)); // 함수를 평가해 결과로 만들어 값을 만들 수 있다.

const f1 = () => () => 1; // 함수를 리턴하는 함수
log(f1()); // 함수의 실행결과 값이 함수 -> // ƒ () { return 1; }

const f2 = f1(); // 함수를 실행해 반환된 함수를 다시 변수에 담을 수 있다.
log(f2); // ƒ () { return 1; }
log(f2()); // 원하는 시점에 평가해 결과를 만들 수 있다. -> 1