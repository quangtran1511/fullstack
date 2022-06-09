import React from 'react'
import Part from './Part'
const Content = ({content}) => {
  return (
    <div>
      <Part name={content[0].part} ex={content[0].excercise }/>
      <Part name={content[1].part} ex={content[1].excercise }/>
      <Part name={content[2].part} ex={content[2].excercise }/>
    </div>
  )
}

export default Content