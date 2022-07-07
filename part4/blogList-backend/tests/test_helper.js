const Blog = require('../models/blogs')

const initialBlogs = [
    {
      title: 'HTML is easy',
      author: "ben",
      url: "htttps/www.asd/com",
      likes:3,
    },
    {
        title: 'Java',
        author: "na",
        url: "htttps/www.ben/com",
        likes:35,
    },
]
  
const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}
  
module.exports = {
    initialBlogs,blogsInDb
  }