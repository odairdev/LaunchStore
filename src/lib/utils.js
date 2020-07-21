module.exports = {
    hasBlankFields(data) {
        const keys = Object.keys(data)

        for(key of keys) {
            if(data[key] == "") {
                return true
            }
        }

        return false
    }
}