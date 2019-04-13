'use strict'
const auth = require('./modules/authorisation')
const persistence = require('./modules/persistence')


exports.addaccount = (request, callback) => {
	let data
	auth.getHeaderCredentials(request).then( credentials => {
		return auth.hashPassword(credentials)
	}).then( credentials => {
		data = credentials
		return persistence.accountExists(credentials)
	}).then( () => {
		return extractBodyKey(request, 'name')
	}).then( name => {
		data.name = name
    }).then( () => {
		return extractBodyKey(request, 'address')
	}).then( address => {
        data.address = address
    }).then( () => {
		return extractBodyKey(request, 'phone')
	}).then( phone => {
        data.phone = phone
    }).then(()=>{
		return persistence.addAccount(data)
	}).then( data => {
		callback(null, data)
	}).catch( err => {
		callback(err)
	})
}


exports.loginaccount = (request, callback) => {
	auth.getHeaderCredentials(request).then( credentials => {
		this.username = credentials.Account
		this.password = credentials.password
		return auth.hashPassword(credentials)
	}).then( credentials => {
		return persistence.getCredentials(credentials)
	}).then( account => {
		const hash = account[0].password
		return auth.checkPassword(this.password, hash)
	}).then( ()=> {
		callback(null)
	}).catch( err => {
		callback(err)
	})
}

exports.getprofile = (request, callback) => {
	auth.getHeaderCredentials(request).then( credentials => {
		this.username = credentials.Account
		this.password = credentials.password
		return auth.hashPassword(credentials)
	}).then( credentials => {
		return persistence.getCredentials(credentials)
	}).then( account => {
		const hash = account[0].password
		return auth.checkPassword(this.password, hash)
	}).then(()  => {
		return persistence.getProfileDetail(this.username);
	}).then( profiles => {
		return this.getProfileField(request, profiles)
	}).then(profiles => {
		callback(null,profiles)
	}).catch( err => {
		callback(err)
	})
}


exports.updateprofile = (request, callback) => {
	let data = {}
	auth.getHeaderCredentials(request).then( credentials => {
		this.username = credentials.Account
		this.password = credentials.password
		return auth.hashPassword(credentials)
	}).then( credentials => {
		return persistence.getCredentials(credentials)
	}).then( account => {
		const hash = account[0].password
		return auth.checkPassword(this.password, hash)
	}).then( () => {
		return extractBodyKey(request, 'name')
	}).then( name => {
		data.name = name
    }).then( () => {
		return extractBodyKey(request, 'address')
	}).then( address => {
        data.address = address
    }).then( () => {
		return extractBodyKey(request, 'phone')
	}).then( phone => {
        data.phone = phone
    }).then(()=>{
		return persistence.updateprofile(this.username,data)
	}).then(data => {
		callback(null,data)
	}).catch( err => {
		callback(err)
	})
}

// exports.updateprofile = (request, callback) => {
// 	let data = {}
// 	auth.getHeaderCredentials(request).then( credentials => {
// 		this.username = credentials.Account
// 		this.password = credentials.password
// 		return auth.hashPassword(credentials)
// 	}).then( credentials => {
// 		return persistence.getCredentials(credentials)
// 	}).then( account => {
// 		const hash = account[0].password
// 		return auth.checkPassword(this.password, hash)
// 	}).then( () => {
// 		return extractBodyKey(request, 'name')
// 	}).then( name => {
// 		data.name = name
//     }).then( () => {
// 		return extractBodyKey(request, 'price')
// 	}).then( address => {
//         data.address = address
//     }).then( () => {
// 		return extractBodyKey(request, 'phone')
// 	}).then( phone => {
//         data.phone = phone
//     }).then(()=>{
// 		return persistence.updateprofile(this.username,data)
// 	}).then(data => {
// 		callback(null,data)
// 	}).catch( err => {
// 		callback(err)
// 	})
// }


exports.addgame = (request, callback) => {
	let data = {}
	auth.getHeaderCredentials(request).then( credentials => {
		this.username = credentials.Account
		this.password = credentials.password
		return auth.hashPassword(credentials)
	}).then( credentials => {
		return persistence.getCredentials(credentials)
	}).then( account => {
		const hash = account[0].password
		return auth.checkPassword(this.password, hash)
	}).then( () => {
		return extractBodyKey(request, 'type')
	}).then( type => {
		data.type = type
    }).then( () => {
		return extractBodyKey(request, 'description')
	}).then( description => {
        data.description = description
    }).then( () => {
		return extractBodyKey(request, 'name')
	}).then( name => {
        data.name = name
    }).then( () => {
		return extractBodyKey(request, 'price')
	}).then( price => {
		data.price = price
    }).then(()=>{
		data.GameId = getgameID()
		data.image = getimage()
		data.fav = 0
		return persistence.addGames(data)
	}).then(data => {
		callback(null,data)
	}).catch( err => {
		callback(err)
	})
}

exports.search = (request, callback) => {
	extractParam(request, 'type')
		.then( type => persistence.searchgamebytype(type))
		.then( (games) => this.displaydata(request, games))
		.then( (games) => callback(null,games))
		.catch( err => callback(err))
}


//lab
const extractParam = (request, param) => new Promise( (resolve, reject) => {
	if (request.params === undefined || request.params[param] === undefined) reject(new Error(`${param} parameter missing`))
	resolve(request.params[param])
})

exports.displaydata = (request, data) => new Promise((resolve,reject) => {
	const clean = data.map(element => {
		return {
			name: element.name,
			type: element.type,
			GameId: element.GameId,
			image: element.image
		}
	})

	resolve(clean)
})

//







//get game detail
exports.getDetail = (gid,request, callback) => {
	auth.getHeaderCredentials(request).then( credentials => {
		this.username = credentials.Account
		this.password = credentials.password
		return auth.hashPassword(credentials)
	}).then( credentials => {
		return persistence.getCredentials(credentials)
	}).then( account => {
		const hash = account[0].password
		return auth.checkPassword(this.password, hash)
	}).then(()  => {
		return persistence.getGameDetail(gid);
	}).then( datagf => {
		return this.getGameField(request, datagf)
	}).then(datagf => {
		callback(null,datagf)
	}).catch( err => {
		callback(err)
	})
}


exports.getGameField = (request, datagf) => new Promise( (resolve, reject) => {
	const clean = datagf.map(element => {
		return {
			type: element.type,
			description:element.description,
			name:element.name,
			price:element.price,
			fav:element.fav,
			image:element.image
		}
	})
	resolve({datagf: clean})
})

//

//add comment
exports.addcomment = (gid,request, callback) => {
	let data = {}
	auth.getHeaderCredentials(request).then( credentials => {
		this.username = credentials.Account
		this.password = credentials.password
		return auth.hashPassword(credentials)
	}).then( credentials => {
		return persistence.getCredentials(credentials)
	}).then( account => {
		const hash = account[0].password
		return auth.checkPassword(this.password, hash)
	}).then( () => {
		return extractBodyKey(request, 'comment')
	}).then( comment => {
		data.gameId = gid
		data.uAccount = this.username
		data.comment = comment
		return persistence.addComments(data);
    }).then(data => {
		callback(null,data)
	}).catch( err => {
		callback(err)
	})
}

exports.changecomment = (gid,request, callback) => {
	let data = {}
	auth.getHeaderCredentials(request).then( credentials => {
		this.username = credentials.Account
		this.password = credentials.password
		return auth.hashPassword(credentials)
	}).then( credentials => {
		return persistence.getCredentials(credentials)
	}).then( account => {
		const hash = account[0].password
		return auth.checkPassword(this.password, hash)
	}).then( () => {
		return extractBodyKey(request, 'comment')
	}).then( comment => {
		data.gameId = gid
		data.comment = comment
		return persistence.updatecomment(this.username,data);
    }).then(data => {
		callback(null,data)
	}).catch( err => {
		callback(err)
	})
}

exports.deletecomment = (gid,request, callback) => {
	auth.getHeaderCredentials(request).then( credentials => {
		this.username = credentials.Account
		this.password = credentials.password
		return auth.hashPassword(credentials)
	}).then( credentials => {
		return persistence.getCredentials(credentials)
	}).then( account => {
		const hash = account[0].password
		return auth.checkPassword(this.password, hash)
	}).then( () => {
		return persistence.dcomment(this.username,gid)
	}).then(() =>{
		callback(null)
	}).catch( err => {
		callback(err)
	})
}
//end of add comment


//cart

exports.addcart = (request, callback) => {
	let data={}
	auth.getHeaderCredentials(request).then( credentials => {
		this.username = credentials.Account
		this.password = credentials.password
		return auth.hashPassword(credentials)
	}).then( credentials => {
		return persistence.getCredentials(credentials)
	}).then( account => {
		const hash = account[0].password
		return auth.checkPassword(this.password, hash)
	}).then( () => {
		return extractBodyKey(request, 'gid')
	}).then( gid => {
		data.gId = gid
	}).then( () => {
		return extractBodyKey(request, 'type')
	}).then( type => {
		data.type = type
	}).then( () => {
		return extractBodyKey(request, 'image')
	}).then( image => {
		data.image = image
	}).then( () => {
		return extractBodyKey(request, 'name')
	}).then( name => {
		data.name = name
	}).then( () => {
		return extractBodyKey(request, 'price')
	}).then( price => {
		data.price = price
		data.uAccount = this.username
		return persistence.insertcart(data);
	}).then(data => {
		callback(null,data)
	}).catch( err => {
		callback(err)
	})
}

exports.searchcart = (request, callback) => {
	let data = {}
	auth.getHeaderCredentials(request).then( credentials => {
		this.username = credentials.Account
		this.password = credentials.password
		return auth.hashPassword(credentials)
	}).then( credentials => {
		return persistence.getCredentials(credentials)
	}).then( account => {
		const hash = account[0].password
		return auth.checkPassword(this.password, hash)
	}).then( () => {
		return persistence.searchC(this.username);
	}).then(GameId => {
		return this.getCartField(request,GameId)
}).then(GameId=> {
		callback(null,GameId)
	}).catch( err => {
		callback(err)
	})
}


exports.deletecart = (request, callback) => {
	auth.getHeaderCredentials(request).then( credentials => {
		this.username = credentials.Account
		this.password = credentials.password
		return auth.hashPassword(credentials)
	}).then( credentials => {
		return persistence.getCredentials(credentials)
	}).then( account => {
		const hash = account[0].password
		return auth.checkPassword(this.password, hash)
	}).then( () => {
		return persistence.deleteC(this.username)
	}).then(() =>{
		callback(null)
	}).catch( err => {
		callback(err)
	})
}


//end of cart






function getgameID() {
	var indexarray =["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","0","1","2","3","4","5","6","7","8","9"]
	var counter = 0
	var idstring = ""
	while (counter <= 10) {
		var rmb = Math.floor(Math.random() *36);
		idstring = idstring + indexarray[rmb]
		counter = counter + 1;
		}
	return idstring
}

function getimage() {
	var rm = Math.floor(Math.random() *4);
		var imagearray = ["A","B","C","D"]


		return "images/" + imagearray[rm]
}



const extractBodyKey = (request, key) => new Promise( (resolve, reject) => {
	if (request.body === undefined || request.body[key] === undefined) reject(new Error(`missing key ${key} in request body`))
	resolve(request.body[key])
})

exports.getProfileField = (request, data) => new Promise( (resolve, reject) => {
	const clean = data.map(element => {
		return {
			Account: element.Account,
			name: element.name,
			address: element.address,
			phone: element.phone
		}
	})

	resolve({profiles: clean})
})

exports.getCartField = (request, GameId) => new Promise( (resolve, reject) => {
	const clean = GameId.map(element => {
		return {
			type:element.type,
			image:element.image,
			name:element.name,
			price:element.price
		}
	})

	resolve({GameId:clean})
})

exports.getCartGame = (request, gamedata) => new Promise( (resolve, reject) => {
	const clean = gamedata.map(element => {
		return {
			type:element.type,
			image:element.image,
			name:element.name,
			price:element.price
		}
	})

	resolve({gamedata: clean})
})