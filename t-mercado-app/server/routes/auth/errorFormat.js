const errorFormat = error => {
    const errorMap = new Map();
    const errorMsg = error.substring(error.indexOf(':') + 1).trim();
    const errorArr = errorMsg.split(',').map(err => err.trim());
    errorArr.forEach(err => {
        let colonSplit = err.indexOf(':');
        errorMap.set(err.substring(0, colonSplit), err.substring(colonSplit + 1).trim());
    });

    return errorMap;
}

module.exports = errorFormat;