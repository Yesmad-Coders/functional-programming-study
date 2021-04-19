go(range(10), log); //[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

go(
  range(10),
  map((n) => n + 10),
  log
); // [10, 11, 12, 13, 14, 15, 16, 17, 18, 19]

go(
  range(10),
  map((n) => n + 10),
  filter((n) => n % 2),
  log
); // [11, 13, 15, 17, 19]

console.time("");
go(
  range(100000),
  map((n) => n + 10),
  filter((n) => n % 2),
  take(2),
  log
); // [11, 13]
console.timeEnd("");
