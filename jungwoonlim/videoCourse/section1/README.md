# 1. ES6에서의 순회와 이터러블: 이터레이터 프로토콜
이터레이터 프로토콜 참고 링크 [:link:](../../reference/iterableAndIterator/README.md)


## 기존과 달라진 ES6에서의 리스트 순회

- for i++
- for..of

```tsx
const list = [1,2,3];
for(var i = 0; i < list.length; i++){
	console.log(list[i]);
}

const str = 'abc';
for(var i = 0; i < str.length; i++){
	console.log(str[i]);
}

for(const a of list) {
	console.log(a);
}

for(const a of str) {
	console.log(a);
}
```

### Array를 통해 알아보기

```tsx
const arr = [1,2,3];
let iter1 = arr[Symbol.iterator]();
for(const a of iter1) console.log(a);
```

### Set을 통해 알아보기

```tsx
const set = new Set([1,2,3]);
for(const a of set) console.log(a);
```

### Map을 통해 알아보기

```tsx
const map = new Map([['a', 1], ['b', 2], ['c', 3]]);
for(const a of map.keys()) console.log(a);
for(const a of map.values()) console.log(a);
for(const a of map.entries()) console.log(a);
```

## 이터러블/이터레이터 프로토콜

- 이터러블 : 이터레이터를 리턴하는 [Symbol.iterator]()를 가진 값
- 이터레이터: { value, done } 객체를 리턴하는 next()를 가진 값
- 이터러블/이터레이터 프로토콜: 이터러블을 for..of, 전개 연산자 등과 함께 동작하도록한 규약

### 사용자 정의 이터러블을 통해 알아보기

```tsx
const iterable = {
	[Symbol.iterator]{
		let i = 3;
		return {
			next() {
				return i === 0 ? {done: true} : {value: i--, done: false}; 
			},
			[Symbol.iterator]() {
				return this;
			}
		}
	}
};

let iterator = iterable[Symbol.iterator]();
iterator.next();
iterator.next();
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());

for(const a of iterator) console.log(a);

const arr2 = [1,2,3];
let iter2 = arr2[Symbol.iterator]();
iter2.next(0;
console.log(iter2[Symbol.iterator]() == iter2);
for(const a of iter2) log(a);

for(const a of document.querySelectorAll('*')) console.log(a);
const all = document.querySelectorAll('*');
let iter3 = all[Sumbol.iterator]();
console.log(iter3.next());
console.log(iter3.next());
console.log(iter3.next());
```

## 전개 연산자

```tsx
const a = [1,2];
console.log([...a, ...arr, ...set, ...map.keys()]);
```