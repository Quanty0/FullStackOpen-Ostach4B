const Persons = ({ filterStr, allPersons, handleRemove }) => {
  const filteredPersons = allPersons.filter((person) =>
    person.name.toLowerCase().includes(filterStr.toLowerCase())
  );

  return (
<<<<<<< HEAD
    <div>
      {persons.map(person => (
        <p key={person.id}>
          {person.name} {person.number}
          <button onClick={() => handleDeletePerson(person.id, person.name)}>
            delete
          </button>
        </p>
=======
    <ul>
      {filteredPersons.map((person) => (
        <li key={person.id}>
          {person.name} {person.number}{" "}
          <button onClick={() => handleRemove(person.id, person.name)}>Delete</button>
        </li>
>>>>>>> 1e230855cac99f9436e80e32b3779c15b206cd72
      ))}
    </ul>
  );
};


export default Persons;