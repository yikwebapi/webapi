
'use strict'

const restify = require('restify')
const server = restify.createServer()

server.use(restify.fullResponse())
server.use(restify.bodyParser())
server.use(restify.queryParser())
server.use(restify.authorizationParser())
server.use(restify.CORS());

server.opts(/.*/, function (req,res,next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", req.header("Access-Control-Request-Method"));
    res.header("Access-Control-Allow-Headers", req.header("Access-Control-Request-Headers"));
    res.send(200);
    return next();
});

const gameshop = require('./gameshop.js')
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
	gameshop.search(req, (err, data) => {
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
	gameshop.addgame(req, (err, data) => {
		res.setHeader('content-type', 'application/json')
		res.setHeader('accepts', 'GET,POST')
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
	gameshop.addcart(req, (err, data) => {
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
	gameshop.searchcart(req, (err, data) => {
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
	gameshop.deletecart(req, (err, data) => {
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
	gameshop.getDetail(gameID,req, (err, data) => {
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
	gameshop.changecomment(gameID,req, (err, data) => {
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
	gameshop.addcomment(gameID,req, (err, data) => {
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


server.get('/comment/:gameID', (req, res) => {
	const gameID = req.params.gameID
	gameshop.getcomment(gameID,req, (err, data) => {
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
	gameshop.deletecomment(gameID,req, (err, data) => {
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
	gameshop.addaccount(req, (err, data) => {
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
	gameshop.loginaccount(req, (err, data) => {
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
server.get('/profile', (req, res) => {
	gameshop.getprofile(req, (err, data) => {
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
	gameshop.updateprofile(req, (err, data) => {
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
