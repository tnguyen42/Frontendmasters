import express from 'express'
import { json, urlencoded } from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'

export const app = express()
const router = express.Router()

app.disable('x-powered-by')

app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan('dev'))

// Middleware example
// const log = (req, res, next) => {
//   console.log('logging')
//   next()
// }

// app.use(log)

// Middlewares could also be added individually in an array after the route
// app.get('/data', [log, log, log], (req, res) => { ... };

// This is how a router is mounted to the main router (app)
// This is like a "sub-route"
app.use('/api', router)

router.get('/me', (req, res) => {
  res.send({ me: 'hello' })
})

app.get('/data', (req, res) => {
  res.send({ message: 'hello' })
})

// parameters can be set in routes as well: '/user/:id'
app.get('/user/:id', (req, res) => {
  res.send(req.params.id)
})

app.post('/data', (req, res) => {
  res.send(req.body)
})

export const start = () => {
  app.listen(3000)
  console.log('server is being run on port 3000')
}
