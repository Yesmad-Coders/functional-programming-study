function bmatch1(key, val) {
    return function(obj) {
        return obj[key] === val;
    }
}

module.exports = bmatch1;