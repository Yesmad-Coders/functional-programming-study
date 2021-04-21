go(L.range(10), log); // L.range {<suspended>}

go(
  L.range(10),
  L.map((n) => n + 10),
  log
); // Generator {<suspended>}

go(
  L.range(10),
  L.map((n) => n + 10),
  L.filter((n) => n % 2),
  log
); // Generator {<suspended>}

console.time("L");
go(
  L.range(10000),
  L.map((n) => n + 10),
  L.filter((n) => n % 2),
  take(2),
  log
); // [11, 13]
console.timeEnd("L");
