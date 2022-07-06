const blogsRouter = require('express').Router()
const Blog = require('../models/blogs')

blogsRouter.get('/', async(request, response,next) => {
  try {
    const blogs = await Blog.find({})
    response.json(blogs)
  } catch (err) {
    next(err)
  }
  })
  
blogsRouter.post('/', async(request, response,next) => {
    const body = request.body

  const blog = new Blog({
    title: body.title,
    author: body.author ,
    url: body.url,
    likes: body.likes
  })
  if (blog.likes===undefined) {
      blog.likes = 0;
  }
  else if (blog.url === undefined && blog.title === undefined) {  
    response.status(400).send('Bad Request')
  } else {
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
  } 
   
})
  
module.exports = blogsRouter;