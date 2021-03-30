Function.prototype.partial = function () {
  var fn = this,
    _args = arguments;
  return function () {
    var args = Array.prototype.slice.call(_args);
    var arg = 0;
    for (let i = 0; i < args.length && arg < arguments.length; i++) {
      if (args[i] === undefined) args[i] = arguments[arg++];
    }
    return fn.apply(this, args);
  };
};

function add() {
  var result = 0;
  for (var i = 0; i < arguments.length; i++) {
    result += arguments[i];
  }
  return result;
}

var add3 = add.partial(undefined, undefined, 3, undefined, undefined);
console.log(add3(1, 2, 4, 5)); // 15
console.log(add3(50, 50, 50, 50)); // 203
console.log(add3(10, 20, 30, 40)); // 103
