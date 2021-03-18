var obj2 = { ' a a a ': 1 };
obj2[' b b b '] = 2;
console.log(obj2);
// { ' a a a ': 1, ' b b b ': 2 }

var obj3 = { 'margin-top': 5 };
obj3['padding-bottom'] = 20;
console.log(obj3);
// { 'margin-top': 5, 'padding-bottom': 20 }
var obj4 = { 1: 10 };
obj4[2] = 20;
console.log(obj4);
// { '1': 10, '2': 20 }
