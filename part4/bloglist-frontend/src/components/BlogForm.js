import React,{useState} from 'react'

const BlogForm = ({addBlog}) => {
    const [newBlog, setNewBlog] = useState({
        title:'',
        author: '',
        url: '',
        likes:''
    })
    
    const handleBlogChange = (event) => {
        setNewBlog({...newBlog,[event.target.name]: event.target.value})
      }
    
    const handleAdd = (event) => {
        event.preventDefault()
        addBlog({
            title: newBlog.title,
            author: newBlog.author,
            url: newBlog.url,
            likes:newBlog.likes,
        })
    }
  return (
      <div>
          <h2>Create New Blog</h2>
          <form onSubmit={handleAdd}>
        <div>
          title:
          <input
            name="title"
            className="title"
            value={newBlog.title}
            onChange={(e) => handleBlogChange(e)}
          ></input>
        </div>
        <div>
          author:
          <input
            name="author"
            className="author"
            value={newBlog.author}
            onChange={(e) => handleBlogChange(e)}
          ></input>
        </div>
        <div>
          url:
          <input
            name="url"
            className="url"
            value={newBlog.url}
            onChange={(e) => handleBlogChange(e)}
          ></input>
        </div>
        <button type="submit" className="submit">
          Submit
        </button>
      </form>
    </div>
  )
}

export default BlogForm