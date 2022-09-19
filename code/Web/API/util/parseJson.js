module.exports = parseJson
//prefered because it handles errors
function parseJson(data){
    try{
        return JSON.parse(data)
    }catch(error){
        return false
    }
}