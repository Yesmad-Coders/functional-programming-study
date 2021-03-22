var obj12 = [];
obj12.length = 5;
console.log(obj12); // [ <5 empty items> ]

var obj13 = [1, 2];
obj13[5] = 5;
console.log(obj13); // [ 1, 2, <3 empty items>, 5 ]
console.log(obj13.length); // 6

obj13.push(6);
console.log(obj13); // [ 1, 2, <3 empty items>, 5, 6 ]
console.log(obj13.length); // 7
