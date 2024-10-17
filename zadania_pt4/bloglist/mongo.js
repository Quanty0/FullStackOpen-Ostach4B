const mongoose = require('mongoose')
require('dotenv').config()

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const url = process.env.MONGODB_URI

mongoose.set('strictQuery', false)
mongoose.connect(url).then(() => {
  const blogSchema = new mongoose.Schema({
    content: String,
    important: Boolean,
  })

  const Blog = mongoose.model('Blog', blogSchema)

  const blog = new Blog({
    content: 'HTML is x',
    important: true,
  })
  /*
  note.save().then(result => {
    console.log('note saved!')
    mongoose.connection.close()
  })
  */
  Blog.find({}).then(result => {
    result.forEach(blog => {
      console.log(blog)
    })
    mongoose.connection.close()
  })

  personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

  const addBlog = async () => {
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

  const listBlog = async () => {
    try {
      const blog = await Blog.find({})
      people.forEach(blog => {
        console.log(blog)
      })
    } catch (error) {
      console.error('Error fetching people:', error.message)
    } finally {
      mongoose.connection.close()
    }
  }

  blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  })

})