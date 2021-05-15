log("🔸 << 5. map, filter, reduce >> 🔸");

const products = [
  { name: "반팔티", price: 15000 },
  { name: "긴팔티", price: 20000 },
  { name: "휴대폰케이스", price: 15000 },
  { name: "후드티", price: 30000 },
  { name: "바지", price: 25000 },
];

const map = (f, iter) => {
  let res = [];
  for (const p of iter) {
    res.push(f(p));
  }
  return res;
};

const filter = (f, iter) => {
  let res = [];
  for (const a of iter) {
    if (f(a)) res.push(a);
  }
  return res;
};

const reduce = (f, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  }
  for (const a of iter) {
    acc = f(acc, a);
  }
  return acc;
};

const add = (a, b) => a + b;

log(
  reduce(
    add,
    map(
      (p) => p.price,
      filter((p) => p.price < 20000, products),
    ),
  ),
);

log(
  reduce(
    add,
    filter(
      (p) => p >= 20000,
      map((p) => p.price, products),
    ),
  ),
);
