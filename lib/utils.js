function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}

function* chunksArray(arr, n) {
    for (let i = 0; i < arr.length; i += n) {
        yield arr.slice(i, i + n);
    }
}

module.exports.replaceAll = replaceAll;
module.exports.chunksArray = chunksArray;