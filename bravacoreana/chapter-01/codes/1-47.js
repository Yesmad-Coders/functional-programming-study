const users = require("./data/users");

// 1
var buttons = [];
for (var i = 0; i < users.length; i++) {
  var user = users[i];
  buttons.push(
    $("<button>")
      .text(user.name)
      .click(function () {
        console.log(user.name);
      })
  );
}
$(".user-list").append(buttons);

// 2
var buttons = [];
for (var i = 0; i < users.length; i++) {
  var user = users[i];
  buttons.push(
    $("<button>")
      .text(user.name)
      .click(function () {
        console.log(user.name);
      })
  )(users[i]);
}
$(".user-list").append(buttons);

// 3. 함수적 해결
$(".user-list").append(
  _.map(users, function (user) {
    return $("<button>")
      .text(user.name)
      .click(function () {
        console.log(user.name);
      });
  })
);
