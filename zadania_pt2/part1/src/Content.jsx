import Part from './Part'

const Content = (props) => {
	const { parts } = props.course
	console.log(props)
	return (
		<>
			{parts.map(part => (
				<Part key={part.name} {...part} />
			))}
		</>
	)
}

export default Content