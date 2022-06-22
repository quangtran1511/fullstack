import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './service'
const App = () => {
 
  const [persons, setPersons] = useState()
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('');
  const [search, setSearch] = useState([]);
  
  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const handleInputName = (e) => {
    e.preventDefault();
    setNewName(e.target.value)
  }
  const handleInputNumber = (e) => {
    e.preventDefault();
    setNewNumber(e.target.value)
  }

  const AddPerson = (event) => {
    event.preventDefault();
    const isUserExist = persons?.find((person) => person.name === newName);
    const changedNumber = {...isUserExist, number:newNumber}
    if (isUserExist) {
      if (window.confirm(`${isUserExist.name} is already added to phonebook,replace the old number with the new one?`)) {
        personService
          .update(isUserExist.id, changedNumber)
          .then(returnedUser => {
            setPersons(persons.map(person => person.id !== isUserExist ? person : returnedUser))
            setNewName("");
            setNewNumber("");
            window.location.reload(true);
          })
      }
    }
    else {
      const personObject = {
        name: newName,
        number: newNumber,
      }
      personService
        .create(personObject)
        .then(returnPerson => {
          setPersons(persons.concat(returnPerson))
          setNewName("");
          setNewNumber("");
        })
    }
  }

  const handleFilter = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  }
  const handleDelete = (id,name) => {
    if (window.confirm(`Delete ${name}`)) {
      window.open("exit.html", "Thanks for Visiting!");
      personService
      .deletePerson(id)
      .then(respone => console.log(respone.data));
    }
    
  }
  return (
    <div>
      <h2>Phonebook</h2>
      
      <Filter handleFilter={handleFilter} search={search} />
      
      <h3>Add a new</h3>

      <PersonForm
        AddPerson={AddPerson}
        newName={newName}
        newNumber={newNumber}
        handleInputName={handleInputName}
        handleInputNumber={handleInputNumber}
      />

      <h3>Numbers</h3>

      {
        persons?.map((person) =>
        person?.name?.toLowerCase().includes(search.toString().toLowerCase()) ?
        (
              <Persons
                name={person.name}
                handleDelete={handleDelete}
                number={person.number}
                id={person.id}
                key={person.id}
              />
        ) : ("")
        )
      }  
    </div>
  )
}

export default App