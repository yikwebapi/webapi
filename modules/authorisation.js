
'use strict'

const bcrypt = require('bcrypt')

// check  username & password
exports.getHeaderCredentials = request => new Promise( (resolve, reject) => {
	if (request.authorization === undefined || request.authorization.basic === undefined) {
		reject(new Error('authorization header missing'))
	}
	const auth = request.authorization.basic

	if (auth.username === undefined || auth.password === undefined) {
		reject(new Error('missing username / password'))
	}
	resolve({Account: auth.username, password: auth.password})
})
//end of check


//encrpty password add salt
exports.hashPassword = credentials => new Promise( (resolve, reject) => {
  const salt = bcrypt.genSaltSync(10)
  credentials.password = bcrypt.hashSync(credentials.password, salt)
  resolve(credentials)
})
//end 

exports.checkPassword = (provided, stored) => new Promise( (resolve, reject) => {
  if (!bcrypt.compareSync(provided, stored)) {
	
		reject(new Error('invalid password'))
	}
  resolve()
})
