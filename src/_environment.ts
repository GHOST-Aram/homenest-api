import 'dotenv/config'

const PORT = process.env.PORT
const USERSDB_URI = process.env.USERSDB_URI
const secretOrKey = process.env.TOKEN_SECRET

export  { PORT, USERSDB_URI, secretOrKey }