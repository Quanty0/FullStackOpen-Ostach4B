import Header from "./Header"
import Content from "./Content"
import Total from "./Total"

const Course = ({ courses }) => {
  return (
    <>
      <Header course={courses} />
      <Content course={courses} />
      <Total parts={courses.parts} />
    </>
  )
}

export default Course