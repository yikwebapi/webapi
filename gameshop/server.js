
'use strict'

const restify = require('restify')
const server = restify.createServer()

server.use(restify.fullResponse())
server.use(restify.bodyParser())
server.use(restify.queryParser())
server.use(restify.authorizationParser())
server.use(function(req, res, next) {
	 res.header("Access-Control-Allow-Origin", "*") 
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept") 
	next() 
})

const bookshop = require('./gameshop.js')
const status = {
	ok: 200,
	added: 201,
	badRequest: 400
}
const defaultPort = 8000

server.get('/', (req, res, next) => {
	res.redirect('/games', next)
})
//done
server.get('/games', (req, res) => {
	bookshop.search(req, (err, data) => {
		res.setHeader('content-type', 'application/json')
		res.setHeader('accepts', 'GET')
		if (err) {
			res.send(status.badRequest, {error: err.message})
		} else {
			res.send(status.ok, data)
		}
		res.end()
	})
})
//done


// insert games
server.post('/games', (req, res) => {
	bookshop.addgame(req, (err, data) => {
		res.setHeader('content-type', 'application/json')
		res.setHeader('accepts', 'GET')
		if (err) {
			res.send(status.badRequest, {error: err.message})
		} else {
			res.send(status.ok, data)
		}
		res.end()
	})
})
// end of insert





server.post('/cart', (req, res) => {
	bookshop.addcart(req, (err, data) => {
		res.setHeader('content-type', 'application/json')
		res.setHeader('accepts', 'GET, POST, DELETE')
		if (err) {
			res.send(status.badRequest, {error: err.message})
		} else {
			
			res.send(status.added, {book: data})
		}
		res.end()
	})
})
//done
server.get('/cart', (req, res) => {
	bookshop.searchcart(req, (err, data) => {
		res.setHeader('content-type', 'application/json')
		res.setHeader('accepts', 'GET, POST,DELETE')
		if (err) {
			res.send(status.badRequest, {error: err.message})
		} else {
			res.send(status.ok, data)
		}
		res.end()
	})
})

server.del('/cart', (req, res) => {
	bookshop.deletecart(req, (err, data) => {
		res.setHeader('content-type', 'application/json')
		res.setHeader('accepts', 'GET, POST,DELETE')
		if (err) {
			res.send(status.badRequest, {error: err.message})
		} else {
			res.send(status.ok, data)
		}
		res.end()
	})
})
//done






server.get('/game/:gameID', (req, res) => {
	const gameID = req.params.gameID
	bookshop.getDetail(gameID,req, (err, data) => {
		res.setHeader('content-type', 'application/json')
		res.setHeader('accepts', 'GET, POST, DELETE, PUT')
		if (err) {
			res.send(status.badRequest, {error: err.message})
		} else {
			res.send(status.added, {user: data})
		}
		res.end()
	})
})
//done

server.put('/comment/:gameID', (req, res) => {
	const gameID = req.params.gameID
	bookshop.changecomment(gameID,req, (err, data) => {
		res.setHeader('content-type', 'application/json')
		res.setHeader('accepts', 'GET, POST, DELETE, PUT')
		if (err) {
			res.send(status.badRequest, {error: err.message})
		} else {
			res.send(status.added, {user: data})
		}
		res.end()
	})
})

server.post('/comment/:gameID', (req, res) => {
	const gameID = req.params.gameID
	bookshop.addcomment(gameID,req, (err, data) => {
		res.setHeader('content-type', 'application/json')
		res.setHeader('accepts', 'GET, POST, DELETE, PUT')
		if (err) {
			res.send(status.badRequest, {error: err.message})
		} else {
			res.send(status.added, {user: data})
		}
		res.end()
	})
})

server.del('/comment/:gameID', (req, res) => {
	const gameID = req.params.gameID
	bookshop.deletecomment(gameID,req, (err, data) => {
		res.setHeader('content-type', 'application/json')
		res.setHeader('accepts', 'GET, POST, DELETE, PUT')
		if (err) {
			res.send(status.badRequest, {error: err.message})
		} else {
			res.send(status.added, {user: data})
		}
		res.end()
	})
})
//done

//register
server.post('/accounts', (req, res) => {
	bookshop.addaccount(req, (err, data) => {
		res.setHeader('content-type', 'application/json')
		res.setHeader('accepts', 'GET, POST')
		if (err) {
			res.send(status.badRequest, {error: err.message})
		} else {
			res.send(status.added, {user: data})
		}
		res.end()
	})
})
//end of register

//login
server.get('/logins', (req, res) => {
	bookshop.loginaccount(req, (err, data) => {
		res.setHeader('content-type', 'application/json')
		res.setHeader('accepts', 'GET')
		if (err) {
			res.send(status.badRequest, {error: err.message})
		} else {
			res.send(status.added, {user: data})
		}
		res.end()
	})
})
//end of login




//show user detail
server.post('/profile', (req, res) => {
	bookshop.getprofile(req, (err, data) => {
		res.setHeader('content-type', 'application/json')
		res.setHeader('accepts', 'GET, POST, PUT')
		if (err) {
			res.send(status.badRequest, {error: err.message})
		} else {
			res.send(status.added, {user: data})
		}
		res.end()
	})
})
//end of show user detail

// update profile
server.put('/profile', (req, res) => {
	bookshop.updateprofile(req, (err, data) => {
		res.setHeader('content-type', 'application/json')
		res.setHeader('accepts', 'GET, POST, PUT')
		if (err) {
			res.send(status.badRequest, {error: err.message})
		} else {
			res.send(status.added, {user: data})
		}
		res.end()
	})
})
//end of update

const port = process.env.PORT || defaultPort

server.listen(port, err => {
	if (err) {
		console.error(err)
	} else {
		console.log('App is ready at : ' + port)
	}
})
