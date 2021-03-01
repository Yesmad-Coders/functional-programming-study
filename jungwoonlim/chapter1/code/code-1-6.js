// 코드 1-6 filter

// var tempUsers = [];
// for(var i=0, len = users.length; i < len; i++) {
//   if(users[i].age < 30) tempUsers.push(users[i]);
// }
// console.log(tempUsers.length); // 4

// 바꾼 코드
function filter(list, predicate) {
  var newList = [];
  for (var i = 0, len = list.length; i < len; i++) {
    if (predicate(list[i])) newList.push(list[i]);
  }
  return newList;
}
