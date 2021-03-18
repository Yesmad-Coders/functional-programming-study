const curry = (f) => (a, ...rest) =>
  rest.length > 0 ? f(a, ...rest) : (...rest) => f(a, ...rest);

const map = curry((f, iter) => {
  let result = [];
  for (let value of iter) {
    result.push(f(value));
  }
  return result;
});

const filter = curry((f, iter) => {
  let result = [];
  for (let value of iter) {
    if (f(value)) {
      result.push(value);
    }
  }
  return result;
});

const reduce = curry((f, acc, iter) => {
  if (!iter) {
    iter = acc[Symbol.iterator]();
    acc = iter.next().value;
  }
  for (let value of iter) {
    acc = f(acc, value);
  }
  return acc;
});

const go = (...args) => args.reduce((acc, f) => f(acc));
const pipe = (f, ...fs) => (...as) => go(f(...as), ...fs);

// console.log(map(el => el.nodeName)(document.querySelectorAll('*')));

// const products = [
//   { name: "반팔티", price: 15000 },
//   { name: "긴팔티", price: 20000 },
//   { name: "핸드폰케이스", price: 15000 },
//   { name: "후드티", price: 30000 },
//   { name: "바지", price: 25000 },
// ];

// const total_price = pipe(
//   map((item) => item.price),
//   reduce((acc, price) => acc + price)
// );
// console.log(total_price(products));

// const total_price2 = (items) =>
//   items.map((item) => item.price).reduce((acc, price) => acc + price);

// console.log(total_price2(products));

// const base_total_price = (f) =>
//   pipe((products) => products.filter(f), total_price2);

// go(
//   products,
//   base_total_price((p) => p.price < 20000),
//   console.log
// );

// go(
//   products,
//   base_total_price((p) => p.price >= 20000),
//   console.log
// );
