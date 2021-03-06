const FUNCTIONAL = require("./functional.v2.module.js");

FUNCTIONAL.callWith(30)(20, FUNCTIONAL.add); // 50
FUNCTIONAL.callWith(20)(20, FUNCTIONAL.sub); // 0
