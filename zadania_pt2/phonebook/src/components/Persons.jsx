/* eslint-disable react/prop-types */

const Persons = ({ persons, filter, handleDeletePerson }) => {
  const personsToShow = filter
    ? persons.filter(person => person.name.toLowerCase().includes(filter))
    : persons;

  return (
    <div>
      <h3>Numbers</h3>
      {personsToShow.map(person => (
        <div key={person.id}>{person.name} {person.number} <button onClick={handleDeletePerson}>delete</button></div>
      ))}
    </div>
  );
};

export default Persons;
