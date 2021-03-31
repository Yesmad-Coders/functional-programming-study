const FUNCTIONAL = require("./functional.module.js");

var users = FUNCTIONAL.users;

console.log(
  FUNCTIONAL.match(
    FUNCTIONAL.find(users, FUNCTIONAL.bmatch("id", 3)),
    FUNCTIONAL.find(users, FUNCTIONAL.bmatch("name", "BJ"))
  )
);
// true
console.log(
  FUNCTIONAL.find(users, function (u) {
    return u.age === 32 && u.name === "JM";
  })
);
// { id: 6, name: "JM", age: 32 }
console.log(FUNCTIONAL.find(users, FUNCTIONAL.bmatch({ name: "JM", age: 32 })));
// { id: 6, name: "JM", age: 32 }
