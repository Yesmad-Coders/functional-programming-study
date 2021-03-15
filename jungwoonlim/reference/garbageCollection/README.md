# 가비지 컬렉션 (GC, Garbage Collection)

---

## Wiki - 가비지 컬렉션

쓰레기 수집(garbage collection)은 메모리 관리 기법 중 하나로, 프로그램이 동적으로 할당했던 메모리 영역 중에서 필요없게 된 영역을 해제하는 기능이다. 영어를 그대로 읽어 가비지 컬렉션이라 부르기도 한다. 1959년 무렵 리스프의 문제를 해결하기 위해 존 매카시가 개발하였다.

## JavaScript의 가비지 컬렉션

- MDN JavaScript의 메모리 관리

    C 언어 같은 저수준 언어에서는 메모리 관리를 위해 `malloc()`과 `free()`를 시용합니다.

    반면, JavaScript는 객체가 생성되었을 때 자동으로 메모리를 할당하고 쓸모 없어졌을 때 자동으로 해제합니다(가비지 컬렉션). 이러한 자동 메모리 관리는 잠재적 혼란의 원인이기도 한데, 개발자가 메모리에 대해 고민할 필요가 없다는 잘못된 인상을 줄 수 있기 때문입니다.

가비지 컬렉션의 개념은 단순합니다. 

**동적으로 할당된 메모리 중 더 이상 사용하지 않는 메모리(Garbage)를 추적하고 해제하여 다시 사용 가능한 메모리로 만든다.**

## ref.

---

- [https://ko.wikipedia.org/wiki/쓰레기_수집_(컴퓨터_과학)](https://ko.wikipedia.org/wiki/%EC%93%B0%EB%A0%88%EA%B8%B0_%EC%88%98%EC%A7%91_(%EC%BB%B4%ED%93%A8%ED%84%B0_%EA%B3%BC%ED%95%99))
- [https://velog.io/@davin/garbage-collection](https://velog.io/@davin/garbage-collection)