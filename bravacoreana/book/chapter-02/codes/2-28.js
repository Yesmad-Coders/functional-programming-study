var a = eval("10 + 5");
console.log(a);

var add = new Function("a,b", "return a+b;");
add(10, 5); // 15
