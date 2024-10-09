/* eslint-disable react/prop-types */
import './index.css'

import { useState, useEffect } from 'react';

import personService from './services/personsService';

import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [filter, setFilter] = useState('');
	const [notiMessage, setNotiMessage] = useState(null)

	useEffect(() => {
		personService
			.getAll()
			.then(initialPersons => {
				setPersons(initialPersons);
			});
	}, []);

	const addPerson = e => {
		e.preventDefault();
		if (persons.some(person => person.name === newName)) {
			alert(`${newName} is already added to phonebook`);
		} else {
			const personObject = {
				name: newName,
				number: newNumber,
				id: persons.length > 0 ? parseInt(persons[persons.length - 1].id) + 1 : 1,
			};

			personService
				.create(personObject)
				.then(response => {
					setPersons(persons.concat(response));
					setNotiMessage(
						`Added ${newName}`
					)
					setTimeout(() => {
						setNotiMessage(null)
					}, 5000)
					setNewName('');
					setNewNumber('');
				})
		}
	};

	const handleDeletePerson = (id) => {
		console.log('Deleting person with id:', id); // Debugging log
		const person = persons.find(p => p.id === id);

		if (!person) {
			console.log('Person not found with id:', id); // Log if person not found
			alert('Person not found');
			return;
		}

		if (window.confirm(`Delete ${person.name}?`)) {
			personService
				.delete(id)
				.then(() => {
					setPersons(persons.filter(p => p.id !== id));
					console.log(`Deleted person with id: ${id}`); // Log success
				})
				.catch(error => {
					console.error(`Failed to delete person with id: ${id}`, error); // Error log
					alert(`The person '${person.name}' was already removed from server`);
					setPersons(persons.filter(p => p.id !== id)); // Remove from UI
				});
		}
	};


	const handleNameChange = e => {
		setNewName(e.target.value);
	};

	const handleNumberChange = e => {
		setNewNumber(e.target.value);
	};

	const Notification = ({ message }) => {
		if (message === null) {
			return null
		}

		setTimeout(() => {
			setNotiMessage(null)
		}, 2500)

		return (
			<div className='notification'>
				{message}
			</div>
		)
	}

	return (
		<>
			<h2>Phonebook</h2>
			<Notification message={notiMessage} />
			<Filter filter={filter} setFilter={setFilter} />
			<PersonForm
				newName={newName}
				newNumber={newNumber}
				handleNameChange={handleNameChange}
				handleNumberChange={handleNumberChange}
				addPerson={addPerson}
			/>
			<Persons
				persons={persons}
				filter={filter}
				handleDeletePerson={handleDeletePerson}
			/>
		</>
	);
};

export default App;