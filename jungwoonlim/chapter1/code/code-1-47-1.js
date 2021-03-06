// 1. 흔한 클로저 실수 - 어떤 버튼을 클릭해도 JE

var buttons = [];
for (var i = 0, len = users.length; i < len; i++) {
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
