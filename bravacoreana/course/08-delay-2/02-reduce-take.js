// > 결과를 만드는 함수 reduce, take

// 객체로부터 url의 queryString을 얻어내는 코드

log("🔸 << 02.reduce-take >> 🔸");
const queryStr = (obj) =>
  go(
    obj,
    Object.entries,
    map(([k, v]) => `${k}=${v}`),
    reduce((a, b) => `${a}&${b}`)
  );

log(queryStr({ limit: 10, offset: 10, type: "notice" })); //limit=10&offset=10&type=notice

const queryStr2 = pipe(
  Object.entries,
  map(([k, v]) => `${k}=${v}`),
  reduce((a, b) => `${a}&${b}`)
);

log(queryStr2({ limit: 10, offset: 10, type: "notice" })); //limit=10&offset=10&type=notice
