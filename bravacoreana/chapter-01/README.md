# 1장. 함수형 자바스크립트 소개

> 절차지향적으로 작성된 코드를 함수형으로 리팩터링하면서 함수형 자바스크립트의 실용성을 확인한다. 실무에서 사용할 만한 데이터와 코드에서 map, filter, find 등 고차 함수의 로직을 발견한다. 클로저에 대해서는 함수형 자바스크립트적인 관점으로 다시 접근하여 설명한다.

<br/>

좋은 프로그램이란 **사용성, 성능, 확장성, 기획 변경에 대한 대응력** 등을 척도로 삼아 이것들을 효율적, 생산적으로 이뤄낸 프로그램이다. 함수형 프로그래밍은 부수 효과(side effect)를 최대한 멀리하고 조합성을 강조해 성공적인 프로그래밍을 이루도록 함에 그 목적이 있다.

부수 효과를 멀리하는 이유? (1)오류를 줄이기 위해 (2)조합성 혹은 모듈화 수준을 높히기 위해



## 🗂 목차


1.1 [함수형 프로그래밍 그거 먹는건가요?](/bravacoreana/chapter-01/1-1/README.md)

&nbsp;&nbsp;&nbsp;&nbsp; 1.1.1 함수형 자바스크립트를 검색하면 나오는 예제<br/>
&nbsp;&nbsp;&nbsp;&nbsp; 1.1.2 값으로써의 함수와 클로저<br/>


1.2 [함수형 자바스크립트의 실용성](/bravacoreana/chapter-01/1-2/README.md)

&nbsp;&nbsp;&nbsp;&nbsp; 1.2.1 회원 목록 중 여러 명 찾기<br/>
&nbsp;&nbsp;&nbsp;&nbsp; 1.2.2 for에서 filter로, if에서 predicate로<br/>
&nbsp;&nbsp;&nbsp;&nbsp; 1.2.3 함수형 프로그래밍 관점으로 filter 보기<br/>
&nbsp;&nbsp;&nbsp;&nbsp; 1.2.4 map 함수<br/>
&nbsp;&nbsp;&nbsp;&nbsp; 1.2.5 실행 결과로 바로 실행하기<br/>
&nbsp;&nbsp;&nbsp;&nbsp; 1.2.6 함수를 값으로 다룬 예제의 필요성<br/>


1.3 [함수형 자바스크립트의 실용성 2](/bravacoreana/chapter-01/1-3/README.md)

&nbsp;&nbsp;&nbsp;&nbsp; 1.3.1 회원 목록 중 한 명 찾기<br/>
&nbsp;&nbsp;&nbsp;&nbsp; 1.3.2 값에서 함수로<br/>
&nbsp;&nbsp;&nbsp;&nbsp; 1.3.3 함수를 만드는 함수와 find, filter 조합하기<br/>
&nbsp;&nbsp;&nbsp;&nbsp; 1.3.4 고차 함수<br/>
&nbsp;&nbsp;&nbsp;&nbsp; 1.3.5 function identity(v) {return v;}, 이건 어디다 쓰는거지?<br/>
&nbsp;&nbsp;&nbsp;&nbsp; 1.3.6 연산자 대신 함수로<br/>
&nbsp;&nbsp;&nbsp;&nbsp; 1.3.7 함수 합성<br/>


1.4 [함수형 자바스크립트를 위한 기초](/bravacoreana/chapter-01/1-4/README.md)

&nbsp;&nbsp;&nbsp;&nbsp; 1.4.1 일급 함수<br/>
&nbsp;&nbsp;&nbsp;&nbsp; 1.4.2 클로저<br/>
&nbsp;&nbsp;&nbsp;&nbsp; 1.4.3 클로저의 실용 사례<br/>
&nbsp;&nbsp;&nbsp;&nbsp; 1.4.4 클로저를 많이 사용하라!<br/>
&nbsp;&nbsp;&nbsp;&nbsp; 1.4.5 고차 함수<br/>
&nbsp;&nbsp;&nbsp;&nbsp; 1.4.6 콜백 함수라 잘못 불리는 보조 함수<br/>
&nbsp;&nbsp;&nbsp;&nbsp; 1.4.7 함수를 리턴하는 함수와 부분 적용<br/>


1.5 [정리](/bravacoreana/chapter-01/1-5/README.md)



