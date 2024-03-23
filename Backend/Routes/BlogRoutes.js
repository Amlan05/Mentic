
const express = require('express')
const blogRouter = express.Router()
const blogController = require('../Controller/BlogController')

blogRouter
.get('/', blogController.getBlogs)
.get('/search', blogController.searchBlogs)
.post('/add', blogController.addBlogs)

exports.blogRouter = blogRouter