# 2장. 함수형 자바스크립트를 위한 문법 다시 보기

> 추상화, 모듈화, 패턴, 클래스, 프레임워크, 아키텍처 등에서 잠시 눈을 돌려 자바스크립트 문법과 기본적인 동작에 집중해 보자. 👉🏼 함수 하나가 정의되고 실행되고 참조되는 과정, 인자를 받거나 넘기는 과정, 클로저가 되거나 비동기가 일어나는 과정, 괄호, 대괄호, 점, 쉼표 등.
> 문법적 감각이 좋아지면 원하는 곳 어디에서나 함수를 열고 실행할 수 있게 된다.

## 🗂 목차

2-1 [객체와 대괄호 다시 보기](/bravacoreana/chapter-02/2-1/README.md)

&nbsp;&nbsp;&nbsp;&nbsp; 2.1.1 난해해 보이는 문법들을 확인하는 목적<br/>
&nbsp;&nbsp;&nbsp;&nbsp; 2.1.2 객체와 key<br/>
&nbsp;&nbsp;&nbsp;&nbsp; 2.1.3 함수나 배열에 달기<br/>
&nbsp;&nbsp;&nbsp;&nbsp; 2.1.4 delete<br/>
&nbsp;&nbsp;&nbsp;&nbsp; 2.1.5 코드가 실행될 수 있는 영역<br/>

2-2 [함수 정의 다시 보기](/bravacoreana/chapter-02/2-2/README.md)

&nbsp;&nbsp;&nbsp;&nbsp; 2.2.1 기본 정의<br/>
&nbsp;&nbsp;&nbsp;&nbsp; 2.2.2 호이스팅<br/>
&nbsp;&nbsp;&nbsp;&nbsp; 2.2.3 호이스팅 활용하기<br/>
&nbsp;&nbsp;&nbsp;&nbsp; 2.2.4 괄호 없이 즉시 실행하기<br/>
&nbsp;&nbsp;&nbsp;&nbsp; 2.2.5 new Function이나 eval을 써도 될까요?<br/>
&nbsp;&nbsp;&nbsp;&nbsp; 2.2.6 간단 버전 문자열 화살표 함수와 new Function 성능<br/>
&nbsp;&nbsp;&nbsp;&nbsp; 2.2.7 유명(named)함수<br/>
&nbsp;&nbsp;&nbsp;&nbsp; 2.2.8 유명 함수를 이용한 재귀<br/>
&nbsp;&nbsp;&nbsp;&nbsp; 2.2.9 자바스크립트에서 재귀의 아쉬움<br/>

2-3 [함수 실행과 인자 그리고 점 다시 보기](/bravacoreana/chapter-02/2-3/README.md)

&nbsp;&nbsp;&nbsp;&nbsp; 2.3.1 () 다시 보기<br/>
&nbsp;&nbsp;&nbsp;&nbsp; 2.3.2 인자 다시 보기<br/>
&nbsp;&nbsp;&nbsp;&nbsp; 2.3.3 this 다시 보기<br/>
&nbsp;&nbsp;&nbsp;&nbsp; 2.3.4 call, apply 다시 보기<br/>
&nbsp;&nbsp;&nbsp;&nbsp; 2.3.5 call의 실용적 사례<br/>

2-4 [if else ||&& 삼항 연산자 다시 보기](/bravacoreana/chapter-02/2-4/README.md)

&nbsp;&nbsp;&nbsp;&nbsp; 2.4.1 if의 괄호<br/>
&nbsp;&nbsp;&nbsp;&nbsp; 2.4.2 ||&&<br/>
&nbsp;&nbsp;&nbsp;&nbsp; 2.4.3 삼항 연산자<br/>


2-5 [함수 실행의 괄호](/bravacoreana/chapter-02/2-5/README.md)

&nbsp;&nbsp;&nbsp;&nbsp; 2.5.1 함수 실행을 통해 생기는 새로운 공간<br/>
&nbsp;&nbsp;&nbsp;&nbsp; 2.5.2 기본적인 비동기 상황<br/>
&nbsp;&nbsp;&nbsp;&nbsp; 2.5.3 함수 실행 괄호의 마법과 비동기<br/>
&nbsp;&nbsp;&nbsp;&nbsp; 2.5.4 비동기와 재귀<br/>

2-6 [화살표 함수](/bravacoreana/chapter-02/2-6/README.md)

&nbsp;&nbsp;&nbsp;&nbsp; 2.6.1 익명 함수와의 문법 비교<br/>
&nbsp;&nbsp;&nbsp;&nbsp; 2.6.2 익명 함수와의 기능 비교<br/>
&nbsp;&nbsp;&nbsp;&nbsp; 2.6.3 화살표 함수의 실용 사례<br/>
&nbsp;&nbsp;&nbsp;&nbsp; 2.6.4 화살표 함수 재귀<br/>

2-7 [정리](/bravacoreana/chapter-02/2-7/README.md)