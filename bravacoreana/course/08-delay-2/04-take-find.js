log("🔸 << 04.take-find >> 🔸");

// queryStr 함수는 결국에는 reduce로 결론을 만드는 함수였다면,
// find 함수는 take 함수를 통해 결론지어 만들 수 있다.

const users = [
  { age: 32 },
  { age: 31 },
  { age: 27 },
  { age: 33 },
  { age: 57 },
  { age: 24 },
  { age: 21 },
  { age: 45 },
];

const find_0 = (func, iterable) =>
  go(iterable, filter(func), take(1), ([a]) => a); // {age: 27}
// 필터를 하고, 그 중 만족하는 가장 첫번째 값을 꺼내온 후, 배열을 깬다.
// log(find((u) => u.age < 30, users));

const find_0_detail = (func, iterable) =>
  go(
    iterable,
    filter((a) => (console.log(a), func(a))),
    // {age: 27}
    // {age: 32}
    // {age: 31}
    // {age: 27}
    // {age: 33}
    // {age: 57}
    // {age: 24}
    // {age: 21}
    // {age: 45}
    // {age: 27}
    (a) => (console.log(a), a), // (3) [{…}, {…}, {…}]
    take(1), // [{age: 27}]
    ([a]) => a // {age: 27}
  );

// log(find_detail((u) => u.age < 30, users));
// 위의 find 함수의 아쉬운 점 : take는 하나만 꺼내지만 결국 filter 에서 모두 돈다. => 비효율적

// - find 함수 개선 -

const find2 = (f, iter) => go(iter, L.filter(f), take(1), ([a]) => a);
log(
  "find2: ",
  find2((u) => u.age < 30, users)
);

const find2_detail = (func, iterable) =>
  go(
    iterable,
    L.filter((a) => (console.log("filter a: ", a), func(a))),
    // {age: 32}
    // {age: 31}
    // {age: 27}
    (a) => (console.log("a: ", a), a), // a: Generator {<suspended>}
    take(1), // [{age: 27}]
    ([a]) => a // {age: 27}
  );

// take에게 연산을 미뤄서 하나의 값이 꺼내지면 더이상 필터가 되지 않도록 함.

log(
  "find2: ",
  find2_detail((u) => u.age < 30, users)
);

// - 결과값 -
// a: Generator {<suspended>}
// filter a: {age: 32}
// filter a: {age: 31}
// filter a: {age: 27}
// find2:  {age: 27}
// - 결과값 끝 -

// > find + curry

const find = curry((f, iter) => go(iter, L.filter(f), take(1), ([a]) => a));
log(
  "find: ",
  find((u) => u.age < 30, users)
);
log("find: ", find((u) => u.age < 30)(users));

// find는 take를 통해 iterable 값을 받는 함수이기 때문에
// 다음과 같이 사용하는 것도 가능하다

go(
  users,
  L.map((u) => u.age),
  find((n) => n < 30),
  log
); // 27
