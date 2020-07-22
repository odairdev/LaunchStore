module.exports = {
    hasBlankFields(data) {
        const keys = Object.keys(data)

        for(key of keys) {
            if(data[key] == "") {
                return true
            }
        }

        return false
    },

    formatPrice(price) {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(price/100)
    }
}