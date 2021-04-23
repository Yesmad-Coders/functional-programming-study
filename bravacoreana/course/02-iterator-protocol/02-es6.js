log("🔸 << 02. es6 >> 🔸");

// > es5 style - 리스트 순회
const list = [1, 2, 3];
for (var i = 0; i < list.length; i++) {
  log(list[i]);
}
// 1
// 2
// 3

// > es5 style - 유사 배열 순회
const str = "abc";
for (var i = 0; i < str.length; i++) {
  log(str[i]);
}
// a
// b
// c

// > es6
for (const a of list) log(a);
// 1
// 2
// 3

for (const a of str) log(a);
// a
// b
// c
