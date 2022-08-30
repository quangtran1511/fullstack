import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotifications } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch=useDispatch()

  const addAD =async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(content))
    dispatch(setNotifications(`new anecdote was created '${content}'`,5))
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAD}>
        <div><input name="anecdote"/></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm