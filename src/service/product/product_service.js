const rename = (themaList) => {
    let thema = []
    let i = 0
    themaList.forEach(t => {
        thema[i] = t.split(".")[0]
        i++
    });
    return thema
}

const listSetting = (path, name) => {
    let list = []
    for(let i = 0; i < path.length; i++){
        list[i] = {"path" : path[i], "name" : name[i]}
    }
    console.log(list)
    return list
}

module.exports = {rename, listSetting}

