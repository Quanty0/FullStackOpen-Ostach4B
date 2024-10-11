const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const url = process.env.MONGODB_URI

mongoose.set('strictQuery', false)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true,
    unique: true
  },
  number: {
    type: String,
    minlength: 8,
    required: true
  }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Person = mongoose.model('Person', personSchema)

const name = process.argv[3];
const number = process.argv[4];

const addPerson = async () => {
  if (name && number) {
    const person = new Person({
      name,
      number
    })
    try {
      const savedPerson = await person.save()
      console.log(`added ${savedPerson.name} number ${savedPerson.number} to phonebook!`)
    } catch (error) {
      console.error('Error adding person:', error.message)
    } finally {
      mongoose.connection.close()
    }
  } else {
    listPeople()
  }
}

const listPeople = async () => {
  try {
    const people = await Person.find({})
    people.forEach(person => {
      console.log(person)
    })
  } catch (error) {
    console.error('Error fetching people:', error.message)
  } finally {
    mongoose.connection.close()
  }
}

addPerson()