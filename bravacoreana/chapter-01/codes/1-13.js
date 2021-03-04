// 코드 1-1. addMaker

function addMaker(a) {
    return function (b) {
      return a + b;
    };
  }
  addMaker(10)(5); // 15
  
function bvalue(key) {
    return function(obj) {
        return obj[key];
    }
}

bvalue('a')({a:"hi", b:"hello"});


console.log(bvalue('a')({a:"hi", b:"hello"}));
