import React from 'react'
import { addVote } from '../reducers/anecdoteReducer'
import { useSelector, useDispatch } from 'react-redux'
import {setting,removing} from '../reducers/notificationReducer'
const AnecdoteList = () => {

  const anecdotes = useSelector(({ anecdotes, filter }) => {
    if (filter === '') {
      return [...anecdotes].sort((a,b)=>b.votes-a.votes)
    }
    const filteredAnecdotes = [...anecdotes].filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
    const sortedAnecdotes = filteredAnecdotes.sort((a, b) => b.votes - a.votes)
      return sortedAnecdotes
  })
const dispatch = useDispatch()

const vote = (id,content) => {

  dispatch(addVote(id))
  dispatch(setting(content))
  setTimeout(() => {
    dispatch(removing())
  },5000)
}
//creating a new array by spreading state(anecdotes), avoid attempting to manipulate 'state'
//when directly using sort method into 'state'


  return (
      <div>
          {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id,anecdote.content)}>vote</button>
          </div>
        </div>
      )}

    </div>
  )
}

export default AnecdoteList