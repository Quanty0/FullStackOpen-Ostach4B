/* eslint-disable react/prop-types */
import { useState } from 'react'

const Button = ({ handleClick, text }) => (
	<button onClick={handleClick}>
		{text}
	</button>
)

const Statistics = ({ good, neutral, bad, all, average, positive }) => {
	if (all === 0) {
		return 'No feedback given';
	} else {
		return (
			<>
				<table>
					<tbody>
						<StatisticLine text="good" value={good} />
						<StatisticLine text="neutral" value={neutral} />
						<StatisticLine text="bad" value={bad} />
						<StatisticLine text="all" value={all} />
						<StatisticLine text="average" value={average} />
						<StatisticLine text="positive" value={positive} />
					</tbody>
				</table>
			</>
		)
	}
}

const StatisticLine = ({ text, value }) => {
	return (
		<>
			<tr>
				<td>{text}</td> <td>{value} {text === 'positive' ? '%' : ''}</td>
			</tr>
		</>
	)
}

const App = () => {
	const [good, setGood] = useState(0)
	const [neutral, setNeutral] = useState(0)
	const [bad, setBad] = useState(0)
	const all = good + neutral + bad
	const average = ((good + neutral + bad) / 3).toFixed(2)
	const positive = ((good / all) * 100).toFixed(2)

	const handleClickGood = () => setGood(good + 1);
	const handleClickNeutral = () => setNeutral(neutral + 1);
	const handleClickBad = () => setBad(bad + 1);

	return (
		<>
			<h1>give feedback</h1>
			<Button handleClick={handleClickGood} text='good' />
			<Button handleClick={handleClickNeutral} text='neutral' />
			<Button handleClick={handleClickBad} text='bad' />
			<h1>statistics</h1>
			<Statistics
				good={good}
				neutral={neutral}
				bad={bad}
				all={all}
				average={average}
				positive={positive}
			/>
		</>
	)
}

export default App