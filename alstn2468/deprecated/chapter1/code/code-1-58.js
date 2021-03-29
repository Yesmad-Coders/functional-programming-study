const _ = require('./lib/underscore');

function abc(a, b, c) {
  console.log(a, b, c);
}

function add() {
  var result = 0;
  for (var i = 0; i < arguments.length; i++) {
    result += arguments[i];
  }
  return result;
}

var ac = _.partial(abc, _, 'b');
ac('a', 'c'); // a b c
var b = _.partial(abc, 'a', _, 'c');
b('b'); // a b c
var ab = _.partial(abc, _, _, 'c');
ab('a', 'b'); // a b c
var add2 = _.partial(add, _, 2);
add2(1, 3, 4, 5); // 15
add2(3, 5); // 10

function equal(a, b) {
  return a === b;
}

var isUndefined = _.partial(equal, undefined);
isUndefined(undefined); // true

var bj = {
  name: 'BJ',
  greet: _.partial(
    function (a, b) {
      return a + this.name + b;
    },
    '저는 ',
    '입니다.'
  ),
};
console.log(bj.greet()); // 저는 BJ입니다.
console.log(bj.greet.call({ name: 'HA' })); // 저는 HA입니다.
var greetPj = bj.greet.bind({ name: 'PJ' });
console.log(greetPj()); // 저는 PJ입니다.
console.log(bj.greet()); // 저는 BJ입니다.
