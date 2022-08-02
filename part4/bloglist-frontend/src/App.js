
import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Login from './components/Login'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  
  const [newBlog, setNewBlog] = useState({
    title:'',
    author: '',
    url: '',
    likes:''
  })
  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  console.log(blogs)
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)  
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = (e) => {
    window.localStorage.removeItem('loggedBlogappUser')
    window.location.reload(false);
  }


  const addBlog = (blog) => {
  
    const blogObject = {
      title:blog.title,
      author: blog.author,
      url: blog.url,
      likes:blog.likes
    }
    try {
      blogService
      .create(blogObject)
      .then(returnedBlog => {
      setBlogs(blogs.concat(returnedBlog))
      setNewBlog({
          title:'',
          author: '',
          url: '',
          likes:''
      })
      })
      setErrorMessage(`a new Blog '${blog.title}' added`)
    }catch (exception) {
      setErrorMessage('Missing url or title')
      setTimeout(() => {
      setErrorMessage(null)
      }, 5000)
    }
    setTimeout(() => {
      setErrorMessage(null)
    },5000)
  }


  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
      </div>
      <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
      </div>
      <button type="submit">login</button>
    </form>      
  )

  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={errorMessage}/>
      
      {user === null ?
        loginForm() :
        <div>
          <p>{user.name} logged in <button onClick={(e)=>handleLogout(e)}>Logout</button></p>
          
          <BlogForm
            addBlog={addBlog}
            successMessage={successMessage}
            setSuccessMessage={setSuccessMessage}
          />
          <div>
            {blogs.map(blog =>
              <Blog
                key={blog.id}
                blog={blog} />
            )}
            </div>
        </div>
      }
        
    </div>
  )
}

export default App
