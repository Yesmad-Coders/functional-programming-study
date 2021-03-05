const FUNCTIONAL = require("./functional.v2.module.js");

var always10 = FUNCTIONAL.constant(10);

always10(); // 10
always10(); // 10
always10(); // 10
