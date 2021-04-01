const FUNCTIONAL = require("./functional.v2.module.js");

var callWith10 = FUNCTIONAL.callWith(10);
callWith10(20, FUNCTIONAL.add); // 30

var callWith5 = FUNCTIONAL.callWith(5);
callWith5(5, FUNCTIONAL.sub); // 0
