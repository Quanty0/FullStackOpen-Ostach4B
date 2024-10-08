import { useState } from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
	const [persons, setPersons] = useState([
		{ name: 'Arto Hellas', number: '040-123456', id: 1 },
		{ name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
		{ name: 'Dan Abramov', number: '12-43-234345', id: 3 },
		{ name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
	])
	const [newName, setNewName] = useState('')
	const [newNumber, setNewNumber] = useState('')
	const [filter, setFilter] = useState('')

	const addPerson = (e) => {
		e.preventDefault()
		// alert(newName)
		if (persons.some(person => person.name === newName)) {
			alert(`${newName} is already added to phonebook`)
		}
		else {
			setPersons((prevPersons => [
				...prevPersons,
				{
					name: newName,
					number: newNumber
				}
			]))
			setNewName('')
			setNewNumber('')
		}
	}

	const handleNameChange = (e) => {
		setNewName(e.target.value)
	}

	const handleNumberChange = (e) => {
		setNewNumber(e.target.value)
	}

	return (
		<>
			<h2>Phonebook</h2>
			<Filter filter={filter} setFilter={setFilter} />
			<PersonForm
				newName={newName}
				newNumber={newNumber}
				handleNameChange={handleNameChange}
				handleNumberChange={handleNumberChange}
				addPerson={addPerson}
			/>
			<Persons persons={persons} filter={filter} />
		</>
	)
}

export default App