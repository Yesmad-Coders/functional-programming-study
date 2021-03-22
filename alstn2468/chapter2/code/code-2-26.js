var pj = new function () {
  this.name = 'PJ';
  this.age = 28;
  this.constructor.prototype.hi = function () {
    console.log('hi');
  };
};
console.log(pj); // { name: 'PJ', age: 28 }
pj.hi(); // hi