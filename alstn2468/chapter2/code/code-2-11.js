var obj13 = [1, 2];
obj13[5] = 5;
console.log(obj13); // [1, 2, <3 empty items>, 5]
console.log(obj13.length); // 6

obj13.push(6);
console.log(obj13); // [1, 2, <3 empty items>, 5, 6]
console.log(obj13.length); // 7

console.log(obj13['len' + 'gth']); // 7
obj13['len' + 'gth'] = 10;
console.log(obj13.length); // 10

obj13.push(11);
console.log(obj13); // [1, 2, <3 empty items>, 5, 6, <3 empty items>, 11]
