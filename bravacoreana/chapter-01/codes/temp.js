var users = [
  { id: 1, name: "ID", age: 32 },
  { id: 2, name: "HA", age: 25 },
  { id: 3, name: "BJ", age: 32 },
  { id: 4, name: "PJ", age: 28 },
  { id: 5, name: "JE", age: 27 },
  { id: 6, name: "JM", age: 32 },
  { id: 7, name: "HI", age: 24 },
];

function object(key, val) {
  var obj = {};
  obj[key] = val;
  return obj;
}

function bmatch(obj2, val) {
  if (arguments.length == 2) obj2 = object(obj2, val);
  return function (obj) {
    // console.log("B_MATCH ▶ ", "obj: ", obj, " / ", "obj2: ", obj2);
    return match(obj, obj2);
  };
}

function match(obj, obj2) {
  for (var key in obj2) {
    console.log("MATCH   ▶ ", "obj: ", obj, " / ", "obj2: ", obj2);

    if (obj[key] !== obj2[key]) {
      console.log("NOPE!");
      return false;
    }
  }
  return true;
}

function find(list, predicate) {
  for (var i = 0, len = list.length; i < len; i++) {
    // console.log(
    //   "RESULT  : ",
    //   predicate(list[i]),
    //   "-----------------------------------------------------"
    // );

    if (predicate(list[i])) {
      console.log("▼▼▼▼▼ I FOUND YOU! ▼▼▼▼▼ ");
      return list[i];
    }
  }
}

console.log(find(users, bmatch("id", 3)));
// console.log(
//   match(find(users, bmatch("id", 3)), find(users, bmatch("name", "BJ")))
// );
