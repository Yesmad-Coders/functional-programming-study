// 코드 1-8 map
/*
var ages = [];
for(var i = 0, len = usersUnder30.length; i < len; i++){
	ages.push(usersUnder30[i].age);
}
console.log(ages);

var names = [];
for(var i = 0, len = usersOver30.length; i < len; i++){
	names.push(usersOver30[i].name);
}
console.log(names);
*/

function map(list, iteratee) {
  var newList = [];
  for (var i = 0, len = list.length; i < len; i++) {
    newList.push(iteratee(list[i]));
  }
  return newList;
}
