const Persons = ({ filterStr, allPersons, handleRemove }) => {
  const filteredPersons = allPersons.filter((person) =>
    person.name.toLowerCase().includes(filterStr.toLowerCase())
  );

  return (
    <ul>
      {filteredPersons.map((person) => (
        <li key={person.id}>
          {person.name} {person.number}{" "}
          <button onClick={() => handleRemove(person.id, person.name)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};


export default Persons;