var obj = { a: 1, b: 2, c: 3 };
delete obj.a;
delete obj["b"];
delete obj["C".toLowerCase()];
console.log(obj);

delete Array.prototype.push;
var arr1 = [1, 2, 3];
// error
arr1.push(4);
