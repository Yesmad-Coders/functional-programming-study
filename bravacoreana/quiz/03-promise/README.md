# Promise

### 프로미스

- 서버에서 받아온 데이터를 화면에 표시할 때 사용
- 비동기 메서드에서 마치 동기 메서드처럼 값 반환 가능 (최종 결과가 아니라 프로미스를 반환)
- 프로미스 상태 3가지: pending / fulfilled / rejected 

### 프로미스 ES6

- constructor(생성자)를 이용해 생성 가능
- 인자는 언제나 함수로 받음
- resolve / reject 중 하나라도 호출하지 않으면 pending forever
- 


```js

const pending = new Promis ((resolve)=>{});

```