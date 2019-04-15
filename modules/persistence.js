
'use strict'

const schema = require('../schema/mongosetting')

exports.addAccount = details => new Promise( (resolve, reject) => {
	if (!'username' in details && !'password' in details && !'name' in details&& !'address' in details && !'phone' in details) {
		reject(new Error('invalid user object'))
	}
	const user = new schema.User(details)

	user.save( (err, user) => {
		if (err) {
			reject(new Error('error creating account'))
		}
		delete details.password
		resolve(details)
	})
})

//accounts part check exist
exports.accountExists = account => new Promise( (resolve, reject) => {
	schema.User.find({Account: account.Account}, (err, docs) => {
		if (docs.length) reject(new Error(`username already exists`))
		resolve()
	})
})
//end of check

exports.getCredentials = credentials => new Promise( (resolve, reject) => {
	schema.User.find({Account: credentials.Account}, (err, docs) => {
		if (err) reject(new Error('database error'))
		if (docs.length) resolve(docs)
		reject(new Error(`invalid username`))
	})
})

exports.getProfileDetail = username => new Promise( (resolve, reject) => {
	schema.User.find({Account: username}, (err, docs) => {
		if (err) reject(new Error('database error'))
		if (!docs.length) reject(new Error("Error"))
		resolve(docs)
	})
})

exports.updateprofile = (username,details) => new Promise( (resolve, reject) => {
	if (!'name' in details&& !'address' in details && !'phone' in details) {
		reject(new Error('invalid object'))
	}
	schema.User.update({Account: username}, details,(err, docs) => {
		if (err) reject(new Error('database error'))
		resolve(docs)
	})
})

exports.addGames = details => new Promise( (resolve, reject) => {
	if (!'GameId' in details && !'type' in details && !'description' in details&& !'name' in details && !'price' in details && !'fav' in details && !'image' in details) {
		reject(new Error('invalid game object'))
	}
	const game = new schema.Game(details)

	game.save( (err, game) => {
		if (err) {
			reject(new Error('ERROR'))
		}
		resolve(details)
	})
})


exports.searchgamebytype = type => new Promise( (resolve, reject) => {
	schema.Game.find({type: type}, (err, docs) => {
		if (err) reject(new Error('database error'))
		resolve(docs)
	})
})



exports.getGameDetail = gid => new Promise( (resolve, reject) => {
	schema.Game.find({GameId: gid}, (err, docs) => {
		if (err) reject(new Error('database error'))
		if (!docs.length) reject(new Error("Error"))
		resolve(docs)
	})
})

exports.getcomment = gid => new Promise( (resolve, reject) => {
	schema.Comment.find({gameId: gid}, (err, docs) => {
		if (err) reject(new Error('database error'))
		resolve(docs)
	})
})


exports.addComments = details => new Promise( (resolve, reject) => {
	if (!'gameId' in details && !'uAccount' in details && !'comment' in details) {
		reject(new Error('invalid comment object'))
	}
	
	schema.Comment.find({uAccount: details.uAccount}, (err, docs) => {
		if (err) reject(new Error('database error'))
		if (docs.length >= 1) { reject(new Error("commented")) 
		} else {
			const cmt = new schema.Comment(details)
			cmt.save( (err, cmt) => {
				if (err) {
					reject(new Error('ERROR'))
				}
				resolve(details)
			})
		}
	
	})
	
})


exports.updatecomment = (username,details) => new Promise( (resolve, reject) => {
	if (!'gameId' in details && !'comment' in details) {
		reject(new Error('invalid comment object'))
	}
	schema.Comment.update({uAccount: username}, details,(err, docs) => {
		if (err) reject(new Error('database error'))
		resolve(docs)
	})
})

exports.dcomment = (username,gid) => new Promise( (resolve, reject) => {
	if (username == '' || gid == '') {
		reject(new Error('invalid comment object'))
	}
	schema.Comment.deleteOne({uAccount: username,gameId: gid},(err, docs) => {
		if (err) reject(new Error('database error'))
		resolve(docs)
	})
})


exports.insertcart = details => new Promise( (resolve, reject) => {
	if (!'gId' in details && !'uAccount' in details && !'type' in details && !'image' in details &&!'name' in details &&!'price' in details ) {
		reject(new Error('invalid object'))
	}

	schema.Game.find({GameId: details.gId}, (err, docs) => {
		if (err) reject(new Error('database error'))
		if (docs.length < 1) { reject(new Error("No Product")) 
		} else {
	const Cart = new schema.Cart(details)

	Cart.save( (err, Cart) => {
		if (err) {
			reject(new Error('error creating account'))
		}
		resolve(details)
	})
}
})
})


exports.searchC = username => new Promise( (resolve, reject) => {
	schema.Cart.find({uAccount: username}, (err, docs) => {
		if (err) reject(new Error('database error'))
		resolve(docs)
	})
})


exports.searchbyId = data => new Promise( (resolve, reject) => {
	schema.Game.find(data, (err, docs) => {
		if (err) reject(new Error('database error'))
		if (docs.length == 0) reject(new Error("null"))
		resolve(docs)
	})
})



exports.deleteC = (username) => new Promise( (resolve, reject) => {
	if (username == '' ) {
		reject(new Error('invalid comment object'))
	}
	schema.Cart.deleteMany({uAccount: username},(err, docs) => {
		if (err) reject(new Error('database error'))
		resolve(docs)
	})
})


exports.searchcommentbytype = (gameid) => new Promise( (resolve, reject) => {
	schema.Comment.find({gameId: gameid}, (err, docs) => {
		if (err) reject(new Error('database error'))
		resolve(docs)
	})
})