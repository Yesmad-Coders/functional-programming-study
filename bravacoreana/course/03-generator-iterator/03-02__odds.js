log("🔸 << . Odds >> 🔸");

log("🔽 odds: 제너레이터를 이용해 홀수만 뽑아내기");
function* odds(limit) {
  for (let i = 0; i < limit; i++) {
    if (i % 2) yield i;
  }
}

let iter_odds = odds(10);
log(iter_odds.next());
log(iter_odds.next());
log(iter_odds.next());
log(iter_odds.next());

/////
log("🔽 infinity: 무한대의 값을 생성할 수 있는 제너레이터");
// - 내가 이 이터레이터의 next를 평가 할 때까지만 동작함
function* infitiny(i = 0) {
  while (true) yield i++;
}

let iter_infinity = infitiny();
log(iter_infinity.next());
log(iter_infinity.next());
log(iter_infinity.next());
log(iter_infinity.next());
log(iter_infinity.next());
log(iter_infinity.next());

log("🔽 odds2: 무한대 제너레이터와 odds의 조합");
function* odds2(l) {
  for (const a of infitiny(1)) {
    if (a % 2) yield a;
    if (a == l) return;
  }
}

let iter_odds2 = odds2(10);
log(iter_odds2.next());
log(iter_odds2.next());
log(iter_odds2.next());
log(iter_odds2.next());
log(iter_odds2.next());
log(iter_odds2.next());

log("🔽 limit: limit 값을 받는 제너레이터");
function* limit(l, iter) {
  for (const a of iter) {
    yield a;
    if (a == l) return;
  }
}

let iter4 = limit(4, [1, 2, 3, 4, 5, 6]);
log(iter4.next());
log(iter4.next());
log(iter4.next());
log(iter4.next());
log(iter4.next());

log("🔽 odds3: Odds + Limit + Infinity");
function* odds3(l) {
  for (const a of limit(l, infitiny(1))) {
    if (a % 2) yield a;
  }
}
let iter5 = odds3(4);
log(iter5.next());
log(iter5.next());
log(iter5.next());

log("🔽 for문으로 뽑아보는 odds, odds2, odds3");
for (const a of odds(10)) log("odds", a);
for (const a of odds2(10)) log("odds2", a);
for (const a of odds3(10)) log("odds3", a);
