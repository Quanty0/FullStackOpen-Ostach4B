/* eslint-disable react/prop-types */

const Persons = ({ persons, filter }) => {
  const personsToShow = filter
    ? persons.filter(person => person.name.toLowerCase().includes(filter))
    : persons;

  return (
    <div>
      <h3>Numbers</h3>
      {personsToShow.map((person, index) => (
        <div key={index}>{person.name} {person.number}</div>
      ))}
    </div>
  );
};

export default Persons;
