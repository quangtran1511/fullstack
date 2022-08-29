import { createSlice } from '@reduxjs/toolkit'


const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

// const anecdoteReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case 'VOTING':
//       const votingState = state.find(n => n.id === action.data.id)
//       const changedVotingState = { ...votingState, votes: votingState.votes + 1 }
//       const newState = state.map(anecdote => anecdote.id !== action.data.id ? anecdote : changedVotingState)
//       const sortNewState = newState.sort((a, b) => b.votes - a.votes)
//       return sortNewState
//     case 'NEW_AD':
//       const data = action.data.data
//       const newAD = asObject(data)
//       return [...state,newAD]
//     default : return state
//   }

// }

// export const addVote = (id) => {
//   return {
//     type: 'VOTING',
//     data: {id}
//   }
// }
// export const newAD = (data) => {
//   return {
//     type: 'NEW_AD',
//     data : {data}
//   }
// }

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    newAD(state, action) {
      const data = action.payload
      const newAD = asObject(data)
      return [...state, newAD]
    },
    addVote(state, action) {
      const votingState = state.find(n => n.id === action.payload)
      const changedVotingState = { ...votingState, votes: votingState.votes + 1 }
      const newState = state.map(anecdote => anecdote.id !== action.payload ? anecdote : changedVotingState)
      const sortNewState = newState.sort((a, b) => b.votes - a.votes)
      return sortNewState
    }
   }
})

export const {newAD,addVote}= anecdoteSlice.actions
export default anecdoteSlice.reducer