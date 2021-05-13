log("🔸 << . For of, 전개연산자, 구조분해, 나머지 연산자 >> 🔸");

log("...odds(10): ", ...odds(10));
log("[...odds(10), ...odds(10)]: ", [...odds(10), ...odds(10)]);

log("🔽 const [head, ...tail] = odds(10);");
const [head, ...tail] = odds(10);
log("head", head);
log("tail", tail);

const [a, b, ...rest] = odds(10);
log("a", a);
log("b", b);
log("rest", rest);
