const express = require('express')

const app = express()

const cors = require('cors')

const logger = require('./loggerMiddleware')

app.use(cors())

app.use(express.json()) // Middleware :0

app.use(logger)

let notes = [
  {
    id: 1,
    content: 'Me tengo que suscribir a midu en twitch ',
    date: '2022-05-30T17:30:31.098Z',
    important: true,
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol',
    date: '2022-05-30T19:20:14.298Z',
    important: true,
  },
  {
    id: 2,
    content: 'Browser can execute  Javascript',
    date: '2022-05-30T18:39:34.091Z',
    important: false,
  },
]

/*
  const app = express.createServer((request, response) => {
    response.writeHead(200, { 'Content-Type': 'application/json' })
    response.end(JSON.stringify(notes))
  })

  */

app.get('/', (request, response) => {
  response.send('<h1> DataBase Sebastian </h1>')
})

app.get('/api/notes', (request, response) => {
  response.json(notes)
})

app.get('/api/notes/:id', (request, response, next) => {
  const id = Number(request.params.id)

  const note = notes.find((note) => note.id === id)
  if (note) response.json(note)
  else next()
  // response.status(404).end()
})

app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter((note) => note.id !== id)
  response.status(204).end()
})

app.post('/api/notes', (request, response) => {
  const note = request.body

  if (!note || !note.content) {
    return response.status(400).json({
      error: ' note content is missing ',
    })
  }

  const ids = notes.map((note) => note.id)

  const maxId = Math.max(...ids)

  const newNote = {
    id: maxId + 1,

    content: note.content,
    important: typeof note.important !== 'undefined' ? note.important : false,
    date: new Date().toISOString(),
  }

  notes = notes.concat(newNote)

  response.json(note)
  response.status(201).end()
})

/* Mine  */

app.get('/api/notes/importance/true', (request, response) => {
  const note = notes.filter((note) => note.important === true)
  response.json(note)
})

app.get('/api/notes/importance/false', (request, response) => {
  const note = notes.filter((note) => note.important === false)
  response.json(note)
})

app.use((request, response) => {
  response.status(404).json({
    error: 'not found',
  })
})

const PORT = process.env.PORT || 3005

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
