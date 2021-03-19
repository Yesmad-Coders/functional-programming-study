Function.prototype.partial = function () {
  var fn = this,
    args = Array.prototype.slice.call(arguments);
  return function () {
    var arg = 0;
    for (var i = 0; i < args.length && arg < arguments.length; i++)
      if (args[i] === undefined) args[i] = arguments[arg++];
    return fn.apply(this, args);
  };
};

// function abc(a, b, c) {
//   console.log(a, b, c);
// }

function add() {
  var result = 0;
  for (var i = 0; i < arguments.length; i++) {
    result += arguments[i];
  }
  return result;
}
// console.log(add(1, 2, 3, 4, 5)); // 15

var add2 = add.partial(undefined, 2);
console.log(add2(1, 3, 4, 5)); // 3

var add3 = add.partial(undefined, undefined, 3, undefined, undefined);
console.log(add3(1, 2, 4, 5)); //15

console.log(add3(50, 50, 50, 50)); // 15 - 버그
console.log(add3(100, 100, 100, 100)); // 15 - 버그
