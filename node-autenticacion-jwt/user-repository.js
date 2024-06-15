import DBLocal from 'db-local'
import crypto from 'node:crypto'
import bcrypt from 'bcrypt'
import { SALT_ROUNDS } from './config.js'

const { Schema } = new DBLocal({ path: './db' })

const Session = Schema('Session', {
  _id: { type: String, required: true },
  user: { type: String, required: true },
  expires: { type: Date, required: true }
})

const User = Schema('User', {
  _id: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true }
})

export class UserRepository {
  static async create ({ username, password, firstname, lastname }) {
    // Validaciones van aquí. Las que sean necesarias.
    // Puede utilizarse alguna biblioteca de validaciones, como zood u otra.
    Validation.username(username)
    Validation.password(password)
    Validation.password(firstname)
    Validation.password(lastname)

    // Asegurarse que user name no existe.
    const user = User.findOne({ username })
    if (user) throw new Error('User already exists!!')

    // Generar id
    const id = crypto.randomUUID()
    // hash al password
    // const hashedPassword = bcrypt.hashSync(password, SALT_ROUNDS)
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)

    User.create({
      _id: id,
      username,
      password: hashedPassword,
      firstname,
      lastname
    }).save()

    return id
  }

  static async login({ username, password }) {
    Validation.username(username)
    Validation.password(password)

    const user = User.findOne({ username })
    if (!user) throw new Error('User does not exist!')

    // const isValidPassword = bcrypt.compareSync(password, user.password)
    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) throw new Error('Password is invalid!')

    // Forma de quitarle propiedades a un objeto
    const { password: _, ...publicUser } = user

    return publicUser
  }
}

// Clase para validar. NO recomendado hacerlo. Mejor usar una bibliotca.
class Validation {
  static username (username) {
    if (typeof username !== 'string') throw new Error('Username must be a string')
    if (username.length < 3) throw new Error('Username must be at least 3 characters')
  }

  static password (password) {
    if (typeof password !== 'string') throw new Error('Password must be a string')
    if (password.length < 6) throw new Error('Password must be at least 6 characters')
  }

  static firstname (value) {
    if (typeof value !== 'string') throw new Error('First Name must be a string')
    if (value.length < 10) throw new Error('First Name  must be at least 10  characters')
    if (value.trim() === '') throw new Error('The first name must not be empty')
  }

  static lastname (value) {
    if (typeof value !== 'string') throw new Error('Last Name must be a string')
    if (value.length < 10) throw new Error('Last Name  must be at least 10  characters')
    if (value.trim() === '') throw new Error('The last  name must not be empty')
  }
}
