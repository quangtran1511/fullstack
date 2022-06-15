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
  const [newNumber, setNewNumber] = useState('');
  const [search, setSearch] = useState([]);

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
          <Persons name={person.name} number={person.number } />
        ) : ("")
        )
      }  
    </div>
  )
}

export default App