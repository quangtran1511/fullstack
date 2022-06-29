const { response } = require("express");
const express = require("express");
const morgan = require("morgan") 
const Person =require('./models/person')
const app = express();
let cors = require("cors");


morgan.token('body', (req, ) => JSON.stringify(req.body))
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :body"))
app.use(cors());
app.use(express.json());
app.use(express.static('build'))

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }
  next(error)
}

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
    response.json(persons)
  })

})

app.get("/info", (request, response) => {
  Person.find({}).then((persons) => {
    response.send(`<div>Phonebook contains ${persons.length} people</div>
    <div>${new Date()}</div>`)
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch((error) => next(error))
})

app.delete("/api/persons/:id", (request, respone,next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      respone.status(204).end()
    }).catch(error=>next(error))
})

//previous excercise

// const generateId = () => {
//   const maxId = Math.floor(Math.random() * 10000);
//   return maxId

// app.post("/api/persons", (request, response) => {
//   const body = request.body
//   const isExist = data.find(person=>person.name===body.name)
//   if (!body.name && !body.number) {
//     return response.status(400).json({
//       error:"missing name or number"
//     })
//   }
//   if (isExist) {
//     return response.status(400).json({
//       error:"name must be unique.Please change another name"
//     })
//   }
//   const person = {
//     name: body.name,
//     number: body.number,
//     id: generateId()
//   }
//   data = data.concat(person)
//   response.json(person)
// })

  //ex 3.14
  app.post("/api/persons", (request, response,next) => {
    const body = request.body
    const number = Number(body.number)
    if (body === undefined) {
      return response.status(400).json({error:'name or number missing'})
    }
    const newPerson = new Person({
      name: body.name,
      number:number
    })
    newPerson
      .save()
      .then(savedPer => savedPer.toJSON())
      .then(savedAndFormattedPer => {response.json(savedAndFormattedPer)
      })
      .catch(error => next(error))
  })

app.put("/api/persons/:id", (request, response,next) => {
  const id = request.params.id
  const body = request.body
  const person = {
    name: body.name,  
    number:body.number
  }
  Person.findByIdAndUpdate(id, person, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(error => next(error))
  })

  const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
app.use(unknownEndpoint)

// this has to be the last loaded middleware.
app.use(errorHandler)

const PORT =process.env.PORT
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})