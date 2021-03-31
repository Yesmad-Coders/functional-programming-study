// 3. 함수의 해결

$(".user-list").append(
  _.map(users, function (user) {
    return $("<button>")
      .text(user.name)
      .click(function () {
        console.log(user.name);
      });
  })
);
