const filter = require('./common/filter');
const map = require('./common/map');
const log_length = require('./common/log_length');
const bvalue = require('./common/bvalue');
const users = require('./common/users');

console.log(
  log_length(
    map(
      filter(users, function (user) {
        return user.age < 30;
      }),
      bvalue('age')
    )
  )
);
// 4
// [25, 28, 27, 24]

console.log(
  log_length(
    map(
      filter(users, function (user) {
        return user.age >= 30;
      }),
      bvalue('name')
    )
  )
);
// 3
// ["ID", "BJ", "JM"]
