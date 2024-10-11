const mongoose = require('mongoose') //itiAVhW7_JDn8T5

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = 'itiAVhW7_JDn8T5'

const url =
  `mongodb+srv://Quanty0:${password}@cluster0.bpsw1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
  content: 'HTML is easy',
  important: true,
})

note.save().then(result => {
  console.log('note saved!')
  mongoose.connection.close()
})