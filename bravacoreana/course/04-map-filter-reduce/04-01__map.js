log("🔸 << 1. map >> 🔸");

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

log(map((p) => p.name, products));
