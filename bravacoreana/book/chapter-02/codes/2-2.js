var obj2 = { " a a a": 1 };
obj2[" b b   b"] = 2;
console.log(obj2); // { ' a a a': 1, ' b b   b': 2 }

var obj3 = { "margin-top": 5 };
obj3["padding-bottom"] = 20;
console.log(obj3); // { 'margin-top': 5, 'padding-bottom': 20 }

var obj4 = { 1: 10 };
obj4[2] = 20;
console.log(obj4); // { '1': 10, '2': 20 }

var obj5 = { "🙊 🙊 ABC 🙊-🙊": 3 };
obj5["b"] = 100;
obj5[199] = 200;
console.log(obj5); // { '199': 200, '🙊 🙊 ABC 🙊-🙊': 3, b: 100 }

var obj6 = { "1a": 1 };
obj6[2] = 2;
console.log(obj6); // { '2': 2, '1a': 1 }

var obj7 = { 3: 3 };
obj7[2] = 2;
obj7[1] = 11;
console.log(obj7); // { '1': 11, '2': 2, '3': 3 }
