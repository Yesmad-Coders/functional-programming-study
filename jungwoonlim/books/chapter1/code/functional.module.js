//////////////////////////////////////////////////////////
/////////////////////// Variables ////////////////////////
//////////////////////////////////////////////////////////

var users = [
  { id: 1, name: "ID", age: 32 },
  { id: 2, name: "HA", age: 25 },
  { id: 3, name: "BJ", age: 32 },
  { id: 4, name: "PJ", age: 28 },
  { id: 5, name: "JE", age: 27 },
  { id: 6, name: "JM", age: 32 },
  { id: 7, name: "HI", age: 24 },
];

var users2 = [
  new User(1, "ID", 32),
  new User(2, "HA", 25),
  new User(3, "BJ", 32),
  new User(4, "PJ", 28),
  new User(5, "JE", 27),
  new User(6, "JM", 32),
  new User(7, "HI", 24),
];

//////////////////////////////////////////////////////////
//////////////////////// Function ////////////////////////
//////////////////////////////////////////////////////////

function addMaker(a) {
  return function (b) {
    return a + b;
  };
}

function bmatch(obj2, val) {
  if (arguments.length === 2) obj2 = object(obj2, val);
  return function (obj) {
    return match(obj, obj2);
  };
}

function bmatch1(key, val) {
  return function (obj) {
    return obj[key] === val;
  };
}

function bvalue(key) {
  return function (obj) {
    return obj[key];
  };
}

function filter(list, predicate) {
  var newList = [];
  for (var i = 0, len = list.length; i < len; i++) {
    if (predicate(list[i])) newList.push(list[i]);
  }
  return newList;
}

function find(list, predicate) {
  for (var i = 0, len = list.length; i < len; i++) {
    if (predicate(list[i])) return list[i];
  }
}

function findBy(key, list, val) {
  for (var i = 0, len = list.length; i < len; i++) {
    if (list[i][key] === val) return list[i];
  }
}

function findByAge(list, age) {
  for (var i = 0, len = list.length; i < len; i++) {
    if (list[i].age === age) return list[i];
  }
}

function findByName(list, name) {
  for (var i = 0, len = list.length; i < len; i++) {
    if (list[i].name === name) return list[i];
  }
}

function findById(list, id) {
  for (var i = 0, len = list.length; i < len; i++) {
    if (list[i].id === id) return list[i];
  }
}

function findIndex(list, predicate) {
  for (var i = 0, len = list.length; i < len; i++) {
    if (predicate(list[i])) return i;
  }
  return -1;
}

function logLength(value) {
  console.log(value.length);
  return value;
}

function map(list, iteratee) {
  var newList = [];
  for (var i = 0, len = list.length; i < len; i++) {
    newList.push(iteratee(list[i]));
  }
  return newList;
}

function match(obj, obj2) {
  for (var key in obj2) {
    if (obj[key] !== obj2[key]) return false;
  }
  return true;
}

function object(key, val) {
  var obj = {};
  obj[key] = val;
  return obj;
}

function User(id, name, age) {
  this.getId = function () {
    return id;
  };
  this.getName = function () {
    return name;
  };
  this.getAge = function () {
    return age;
  };
}

module.exports = {
  addMaker,
  bmatch,
  bmatch1,
  bvalue,
  filter,
  find,
  findBy,
  findByAge,
  findByName,
  findById,
  findIndex,
  logLength,
  map,
  match,
  object,
  users,
  users2,
};
