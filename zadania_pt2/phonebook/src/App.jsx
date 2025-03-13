import { useState, useEffect } from "react";

import Filter from "./components/Filter";
import Persons from "./components/Persons";
import PersonForm from "./components/PersonForm";
import Notification from "./components/Notification";
import personService from "./services/persons";

import './index.css';

const App = () => {
  const [allPersons, setAllPersons] = useState([]);
  const [filterStr, setFilterStr] = useState('');
  const [newPerson, setNewPerson] = useState({ name: "", number: "" });
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    personService.getAll()
<<<<<<< HEAD
      .then((allPersons) => {
      setAllPersons(allPersons);
    });
=======
      .then(persons => {
        setAllPersons(persons);
      })
      .catch(error => {
        setNotification({
          type: "error",
          text: `Failed to load data: ${error.message}`,
        });
      });
>>>>>>> 1e230855cac99f9436e80e32b3779c15b206cd72
  }, []);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 4000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [notification]);

  const handleSubmit = (event) => {
    event.preventDefault();
  
    const existingPerson = allPersons.find(
      (person) => person.name.trim().toLowerCase() === newPerson.name.trim().toLowerCase()
    );
  
    if (!existingPerson) {
      // Create a new person
      personService
        .create(newPerson)
        .then((person) => {
          setAllPersons((prevPersons) => prevPersons.concat(person));
          setNewPerson({ name: "", number: "" }); // Reset form fields
          setNotification({
            type: "success",
            text: `${person.name} was successfully added.`,
          });
        })
        .catch((error) => {
          setNotification({
            type: "error",
            text: error.response?.data?.error || "An unknown error occurred.",
          });
        });
    } else {
      // Update an existing person
      if (
        window.confirm(
          `${newPerson.name} is already added to the phonebook. Replace the old number with a new one?`
        )
      ) {
        const updatedPerson = { ...existingPerson, number: newPerson.number };
        personService
          .update(existingPerson.id, updatedPerson)
          .then((returnedPerson) => {
            setAllPersons((prevPersons) =>
              prevPersons.map((person) =>
                person.id !== returnedPerson.id ? person : returnedPerson
              )
            );
            setNewPerson({ name: "", number: "" }); // Reset form fields
            setNotification({
              type: "success",
              text: `${returnedPerson.name}'s number was successfully updated.`,
            });
          })
          .catch((error) => {
            if (error.response?.status === 404) {
              // Handle deleted resource
              setAllPersons((prevPersons) =>
                prevPersons.filter((person) => person.id !== existingPerson.id)
              );
              setNotification({
                type: "error",
                text: `Information for ${newPerson.name} has already been removed from the server.`,
              });
            } else {
              setNotification({
                type: "error",
                text: error.response?.data?.error || "An unknown error occurred.",
              });
            }
          });
      }
    }
  };
  
  const handleFormChange = ({ target: { name, value } }) => {
    setNewPerson((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleRemove = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .remove(id)
        .then(() => {
          setAllPersons((prevPersons) =>
            prevPersons.filter((person) => person.id !== id)
          );
          setNotification({
            type: "success",
            text: `${name} was successfully deleted.`,
          });
        })
        .catch((error) => {
          // Handle cases where the person might already be deleted
          if (error.response?.status === 404) {
            setAllPersons((prevPersons) =>
              prevPersons.filter((person) => person.id !== id)
            );
            setNotification({
              type: "error",
              text: `The information for ${name} has already been removed from the server.`,
            });
          } else {
            setNotification({
              type: "error",
              text: `Failed to delete ${name}: ${error.message}`,
            });
          }
        });
    }
  };
  

  return (
    <>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <Filter filterStr={filterStr} setFilterStr={setFilterStr} />
      <PersonForm
        newPerson={newPerson}
        handleSubmit={handleSubmit}
        handleFormChange={handleFormChange}
      />
      <h3>Numbers</h3>
      <Persons
        filterStr={filterStr}
        allPersons={allPersons}
        handleRemove={handleRemove}
      />
    </>
  );  
};

export default App;