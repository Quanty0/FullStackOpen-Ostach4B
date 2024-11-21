const PersonForm = ({ newPerson, handleSubmit, handleFormChange }) => (
  <form onSubmit={handleSubmit}>
    <div>
      Name: <input name="name" value={newPerson.name} onChange={handleFormChange} />
    </div>
    <div>
      Number: <input name="number" value={newPerson.number} onChange={handleFormChange} />
    </div>
    <button type="submit">Add</button>
  </form>
);


export default PersonForm;
