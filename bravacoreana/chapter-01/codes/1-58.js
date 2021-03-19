// const _ = require("./data/underscore");

Function.prototype.partial = function () {
  var fn = this,
    _args = arguments; // 1) 클로저가 기억할 변수에는 원본을 남기기
  return function () {
    var args = Array.prototype.slice.call(_args); // 2) 리턴된 함수가 실행될 때마다 복사하여 원본 지키기
    var arg = 0;
    for (var i = 0; i < args.length && arg < arguments.length; i++)
      if (args[i] === undefined) args[i] = arguments[arg++];
    // 실행 때마다 새로 들어온 인자 채우기
    return fn.apply(this, args);
  };
};

function abc(a, b, c) {
  console.log(a, b, c);
}

var ac = _.partial(abc, _, "b");
ac("a", "c");

var b = _.partial(abc, "a", _, "c");
b("b");

var ab = _.partial(abc, _, _, "c");
ab("a", "b");

var add2 = _.partial(add, _, 2);
add2(1, 3, 4, 5);
add2(3, 5);

function equal(a, b) {
  return a === b;
}

var isUndefined = _.partial(equal, undefined);
isUndefined(undefined);

var bj = {
  name: "BJ",
  greet: _.partial(
    function (a, b) {
      return a + this.name + b;
    },
    "저는 ",
    "입니다."
  ),
};
bj.greet();

bj.greet.call({ name: "HA" });

var greetPj = bj.greet.bind({ name: "PJ" });
greetPj();

bj.greet();
