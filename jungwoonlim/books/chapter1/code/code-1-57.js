Function.prototype.partial = function () {
  var fn = this,
    _args = arguments; // one 클로저가 기억할 변수에는 원본을 남기기
  return function () {
    var args = Array.prototype.slice.call(_args); // two 리턴된 함수가 실행될 때마다
    // 복사하여 원본 지키기
    var arg = 0;
    for (var i = 0; i < args.length && arg < arguments.length; i++)
      if (args[i] === undefined) args[i] = arguments[arg++]; // 실행 때마다 새로
    // 들어온 인자 채우기
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
