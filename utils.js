function log(log){
    console.log(log);
}

function capitialize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1); 
}

module.exports = {
    log, capitialize
}