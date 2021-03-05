Function.prototype.partial = function () {
  var fn = this,
    args = Array.prototype.slice.call(arguments); // 1
  return function () {
    // 2
    var arg = 0;
    for (
      var i = 0;
      i < args.length && arg < arguments.length;
      i++ // 5
    )
      if (args[i] === undefined) args[i] = arguments[arg++]; // 6
    return fn.apply(this, args);
  };
};

function abc(a, b, c) {
  console.log(a, b, c);
}

var ac2 = abc.partial(undefined, "b");
ac2("a", "c"); // a c undefiend
