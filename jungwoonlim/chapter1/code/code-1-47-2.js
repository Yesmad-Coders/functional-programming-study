// 2. 절차지향적 해결 - 어차피 함수의 도움을 받아야 함, 각각 다른 이름이 잘 나옴

var buttons = [];
for (var i = 0, len = users.length; i < len; i++) {
  (function (user) {
    buttons.push(
      $("<button>")
        .text(user.name)
        .click(function () {
          console.log(user.name);
        })
    );
  })(users[i]);
}
$(".user-list").append(buttons);
