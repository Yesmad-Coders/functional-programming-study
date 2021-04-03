var obj = { a: 1, b: 2 };
obj.c = 3;
console.log(obj); //{ a: 1, b: 2, c: 3 }
obj["d"] = 4;
console.log(obj); //{ a: 1, b: 2, c: 3, d: 4 }
var e = "e";
obj[e] = 5;
console.log(obj); //{ a: 1, b: 2, c: 3, d: 4, e: 5 }

function f() {
  return "f";
}

obj[f()] = 6;

console.log(obj); // { a: 1, b: 2, c: 3, d: 4, e: 5, f: 6 }
