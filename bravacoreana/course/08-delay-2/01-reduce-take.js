/*

// > map, filter 계열 함수들이 가지는 결합 법칙

- 사용하는 데이터가 무엇이든지
- 사용하는 보조 함수가 순수 함수라면 무엇이든지
- 아래와 같이 결합한다면 둘 다 결과가 같다.

[[mapping, mapping], [filtering, filtering],[mapping, mapping]] 
=
[[mapping, filtering, mapping], [mapping, filtering, mapping]]

*/

// > 결과를 만드는 함수 reduce, take
