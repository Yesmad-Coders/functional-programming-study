Function.prototype.partial = function () {
  var fn = this,
    args = Array.prototype.slice.call(arguments);
  return function () {
    var arg = 0;
    for (let i = 0; i < args.length && arg < arguments.length; i++) {
      if (args[i] === undefined) args[i] = arguments[arg++];
    }
    return fn.apply(this, args);
  };
};

function abc(a, b, c) {
  console.log(a, b, c);
}

var ac2 = abc.partial(undefined, 'b');
ac2('a', 'c'); // a c undefined
