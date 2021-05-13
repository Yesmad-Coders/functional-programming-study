log("🔸 << 3. filter >> 🔸");

// const products = [
//   { name: "반팔티", price: 15000 },
//   { name: "긴팔티", price: 2000 },
//   { name: "휴대폰케이스", price: 15000 },
//   { name: "후드티", price: 30000 },
//   { name: "바지", price: 25000 },
// ];

// < 명령형 코드 >
let under20000 = [];
for (const p of products) {
  if (p.price < 20000) under20000.push(p);
}
log("명령형", ...under20000);

// - 다른 조건을 걸어줄 때는 코드를 복사해서 써야 한다.

// < filter >
const filter = (f, iter) => {
  let res = [];
  for (const a of iter) {
    if (f(a)) res.push(a);
  }
  return res;
};

log(...filter((p) => p.price < 20000, products));
log(filter((n) => n % 2, [1, 2, 3, 4])); // [1,3]
log(
  filter(
    (n) => n % 2,
    (function* () {
      yield 1;
      yield 2;
      yield 3;
      yield 4;
      yield 5;
    })(),
  ),
); // [1,3,5]
