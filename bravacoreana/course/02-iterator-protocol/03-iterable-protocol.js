log("🔸 << 03. iterable-protocol >> 🔸");

log("👉🏼 Arr");
const arr = [1, 2, 3];
for (const a of arr) log(a);

log("👉🏼 Set");
const set = new Set([1, 2, 3]);
for (const a of set) log(a);

log("👉🏼 Map");
const map = new Map([
  ["a", 1],
  ["b", 2],
  ["c", 3],
]);
for (const a of map) log(a);

// > list 조회
log("👉🏼 list 조회");
log(arr[0]); // 1
log(set[0]); // undefined
log(map[0]); // undefined

// > symbol iterator
log("👉🏼 symbol iterator");
log(arr[Symbol.iterator]); //values() { [native code] }
log(set[Symbol.iterator]); //values() { [native code] }
log(map[Symbol.iterator]); //entries() { [native code] }
