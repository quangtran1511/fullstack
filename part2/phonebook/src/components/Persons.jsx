import React from 'react'

const Persons = ({ name, number, id,handleDelete }) => {
  
  return (
    <div>
      <p>{name} - {number}</p>
      <button onClick={()=>handleDelete(id,name)}>Delete</button>
    </div>
  )
}

export default Persons