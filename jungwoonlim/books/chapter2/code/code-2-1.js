var obj = { a: 1, b: 2 };
obj.c = 3;
obj["d"] = 4;

var e = "e";
obj[e] = 5;

function f() {
  return "f";
}

obj[f()] = 6;
console.log(obj);
