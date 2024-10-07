const Total = (props) => {

  const { parts } = props;
  const totalExercises = parts.reduce((sum, part) => sum + part.exercises, 0);
  return (
    <>
      <p><b>total of {totalExercises} excercises</b></p>
    </>
  )
}
export default Total
