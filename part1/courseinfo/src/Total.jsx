import React from 'react'

const Total = ({content}) => {
  return (
    <div>Total : {content[0].excercise +content[1].excercise + content[2].excercise }</div>
  )
}

export default Total