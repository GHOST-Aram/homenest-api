import  * as crypto from 'crypto'

const hex = crypto.randomBytes(12).toString('hex')
console.log(hex)