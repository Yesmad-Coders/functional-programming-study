function parent() {
  var a = 5;
  function myfn() {
    console.log(a);
  }
}
function parent2() {
  var a = 5;
  function parent1() {
    function myfn() {
      console.log(a);
    }
  }
}
