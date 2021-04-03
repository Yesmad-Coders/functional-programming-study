function find(list, predicate) {
    for (var i=0, len=list.length; i<len; i++) {
        if(predicate(list[i])) return list[i];
    }
}

module.exports = find;