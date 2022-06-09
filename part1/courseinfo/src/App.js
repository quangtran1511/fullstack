import Header  from "./Header";
import Content from "./Content";
import Total from "./Total";

const App = () => {
  const course = 'Half Stack application development'
  const content = [
    {
      part: 'Fundamentals of React',
      excercise:10
    },
    {
      part: 'Using props to pass data',
      excercise:7
    },
    {
      part: 'State of a component',
      excercise:14
    }
  ]

  return (
    <div>
      <Header course={course} />
      <Content content={content} />
      <Total content={content}/>
    </div>
  )
}

export default App;
