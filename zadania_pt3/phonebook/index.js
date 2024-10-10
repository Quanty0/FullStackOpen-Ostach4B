const express = require('express')
// const Person = require('./models/person')
const app = express()

app.use(express.json())

let persons = [
	{
		"id": "1",
		"name": "Arto Hellas",
		"number": "040-123456"
	},
	{
		"id": "2",
		"name": "Ada Lovelace",
		"number": "39-44-5323523"
	},
	{
		"id": "3",
		"name": "Dan Abramov",
		"number": "12-43-234345"
	},
	{
		"id": "4",
		"name": "Mary Poppendieck",
		"number": "39-23-6423122"
	}
]

app.get('/info', (request, response) => {
	const currentDate = new Date().toLocaleString();
	const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
	response.send(
		`
				<div>
					<p>Phonebook has info for ${persons.length} people</p>
				</div>
				<div>
					<p>${currentDate} (${timeZone})</p>
				</div>`
	)
})

app.get('/', (request, response) => {
	response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
	response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
	const id = request.params.id
	const person = persons.find(person => person.id === id)
	response.json(person)
})

app.get('/api/persons/:id', (request, response) => {
	const id = request.params.id
	const person = persons.find(person => person.id === id)

	if (person) {
		response.json(person)
	} else {
		response.status(404).end()
	}
})

app.delete('/api/persons/:id', (request, response) => {
	const id = request.params.id
	persons = persons.filter(person => person.id !== id)

	response.status(204).end()
})


const generateId = () => {
	const maxId = persons.length > 0
		? Math.max(...persons.map(n => Number(n.id)))
		: 0
	return String(maxId + 1)
}

app.post('/api/persons', (request, response) => {
	const body = request.body

	if (!body.content) {
		return response.status(400).json({
			error: 'content missing'
		})
	}

	const person = {
		content: body.content,
		id: generateId(),
	}

	persons = persons.concat(person)

	response.json(person)
})

const errorHandler = (error, request, response, next) => {
	console.error(error.message)

	if (error.name === 'CastError') {
		return response.status(400).send({ error: 'malformatted id' })
	} else if (error.name === 'ValidationError') {
		return response.status(400).json({ error: error.message })
	}
	next(error)
}

app.use(errorHandler)

const PORT = 3001
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})