import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'

const App = () => {
  const [notes, setNotes] = useState([])
  const [persons, setPersons] = useState() 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('');
  const [search, setSearch] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then(response => { setPersons(response.data) })
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
    const isUserExist = persons.some((person) => person.name === newName);
    if (isUserExist) return alert(newName + " has already existed in phonebook");
    else {
      const personObject = [...persons, { name: newName,number: newNumber }]
      setPersons(personObject); 
      setNewName(""); 
      setNewNumber("");
    }
  }

  const handleFilter = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
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
        person.name.toLowerCase().includes(search.toString().toLowerCase()) ?
        (
              <Persons name={person.name} number={person.number} key={ person.id} />
        ) : ("")
        )
      }  
    </div>
  )
}

export default App