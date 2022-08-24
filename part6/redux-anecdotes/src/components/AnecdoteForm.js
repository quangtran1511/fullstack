import React from 'react'
import { useDispatch } from 'react-redux'
import {newAD} from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
const dispatch=useDispatch()

    const addAD = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(newAD(content))
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