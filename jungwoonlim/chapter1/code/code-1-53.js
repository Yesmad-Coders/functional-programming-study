const FUNCTIONAL = require("./functional.v2.module.js");

var add10 = FUNCTIONAL.add.bind(null, 10);
add10(20); // 30
