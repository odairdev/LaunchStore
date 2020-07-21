const { hasBlankFields } = require('../../lib/utils')
const Category = require('../models/Category')
const Product = require('../models/Product')

module.exports = {
    create(req, res) {
        Category.all()
            .then((results) => {
                const categories = results.rows

                return res.render('products/create', {categories})
            }).catch((err) => {
                throw new Error(err)
            })
    },

    async post(req, res) {

        if (hasBlankFields(req.body)) return res.send('Please fill out all fields.')

        let results = await Product.create(req.body)
        const productId = results.rows[0].id

        results = await Category.all()
        const categories = results.rows

        return res.render('products/create', {productId, categories})
    }
}