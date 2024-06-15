import express from 'express'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser'
import { PORT, SECRET_KEY } from './config.js'
import { UserRepository } from './user-repository.js'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
app.set('view engine', 'ejs')
// app.use(express.static('public'))
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json()) //* middleware
app.use(cookieParser())

// middleware para todos los endpoints
app.use((req, res, next) => {
  const token = req.cookies.access_token
  req.session = { user: null }
  // req.session = { user2: 'Javo' }
  try {
    const data = jwt.verify(token, SECRET_KEY)
    req.session.user = data
  } catch (error) { }
  next() // seguir a la siguiente ruta o middleware
}, (req, res, next) => {
  req.session.user1 = 'Usuario 1 creado en otro midd' 
  next()
}, (req, res, next) => {
  req.session.user2 = 'Usuario 2 creado en otro midd' 
  next()
})

app.get('/', (req, res) => {
  res.send('Hola Xavier')
  // res.render('index')
})

app.post('/login', async (req, res) => {
  const { username, password } = req.body
  try {
    const user = await UserRepository.login({ username, password })
    const token = jwt.sign({ id: user._id, username: user.username, firstname: user.firstname, lastname: user.lastname },
      SECRET_KEY,
      {
        expiresIn: '1h'
      }
    )
    // El token debe almacenarse en una cookie en el fontend. Es un poco más seguro.
    res
      .cookie('access_token', token, {
        httpOnly: true, // accesible solo en servidor
        secure: process.env.NODE_ENV, // se apuede acceder solo en https
        sameSite: 'strict', // solo en el mismo dominio
        maxAge: 1000 * 60 * 60 // vive una hora.
      })
      .send({ user, token })
  } catch (error) {
    res.status(401).send(error.message)
  }
})

app.post('/register', async (req, res) => {
  const { username, password, firstname, lastname } = req.body
  try {
    const id = await UserRepository.create({ username, password, firstname, lastname })
    res.send({
      message: 'Usuario registrado',
      id,
      username,
      password,
      firstname,
      lastname
    })
  } catch (error) {
    res.status(400).send(error.message)
  }
})

app.post('/logout', (req, res) => {
  res
    .clearCookie('access_token')
    .sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.get('/protected', (req, res) => {
  const { user } = req.session
  if (!user) {
    return res
      .status(403)
      .sendFile(path.join(__dirname, 'public', 'index.html'))
  }
  res.render('protected', { username: user })
})

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`)
})
