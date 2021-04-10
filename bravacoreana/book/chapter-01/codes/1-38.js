const _ = require("./data/underscore");
const { not, beq } = require("./data/not-beq");
const { positive, negativeIndex } = require("./data/positive-negative");
// const compose = require("./data/compose");

/* 원래 코드 
_.some = function(list) {
    return not(not(positive(list)));
};
_.every = function(list) {
    return beq(-1)(negativeIndex(list));
}

*/
_.some = _.compose(not, not, positive);
_.every = _.compose(beq(-1), negativeIndex);
