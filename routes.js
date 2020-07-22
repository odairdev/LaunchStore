const express = require('express')
const routes = express.Router()
const ProductController = require('./src/App/controllers/ProductController')

routes.get('/', (req, res) => {res.render('home')})
routes.get('/products/create', ProductController.create)
routes.get('/products/:id/edit', ProductController.edit)
routes.post('/products', ProductController.post)
routes.put('/products', ProductController.put)
routes.delete('/products', ProductController.delete)

//Alias
routes.get('/ads/create', (req, res) => {res.redirect('/products/create')})

module.exports = routes