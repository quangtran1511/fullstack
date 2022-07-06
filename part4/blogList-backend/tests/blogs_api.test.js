const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blogs')
const api = supertest(app)

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
  
  beforeEach(async () => {
    await Blog.deleteMany({})
    let blogObject = new Blog(initialBlogs[0])
    await blogObject.save()
    blogObject = new Blog(initialBlogs[1])
    await blogObject.save()
  })


test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
},100000)

test("the amount of blog posts", async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(initialBlogs.length)
})

test('the unique identifer property of the blogs', async () => {
    const response = await api.get('/api/blogs')
    const firstBlog = response.body[0]
    expect(firstBlog.id).toBeDefined()
})

test('successfully creating a new blog post', async () => {
    const newBlog = {
        title: 'Bootstrap',
        author: 'Lucy',
        url: 'www.bootstrap.com',
        likes: 5,
    }
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/) 
    
    const response = await api.get('/api/blogs')
    
    const contents = response.body.map(r => r.title)
    
    expect(response.body).toHaveLength(initialBlogs.length + 1)
    expect(contents).toContain("Bootstrap")
})

test("missing likes property", async() => {
    
    const zeroLikeBlog = {
        title: "test0",
        author: "test0",
        url: "test0",
    };
    
    await api
        .post("/api/blogs")
        .send(zeroLikeBlog)
        .expect(201);
    
    const newBlogs = await api.get(`/api/blogs`)

    expect(newBlogs.body[newBlogs.body.length-1].likes).toEqual(0);
})
    
test("missing title and url", async () => {
    const missingBLog = {
        author: "daniel",
        likes: 4
    }
    await api
        .post("/api/blogs")
        .send(missingBLog)
        .expect(400);
})

afterAll(() => {
  mongoose.connection.close()
})