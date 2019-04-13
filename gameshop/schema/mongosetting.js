
'use strict'

// import the mongoose package
const mongoose = require('mongoose')
const db = {
	user: 'yikyik',
	pass: 'Aa123456'
}


mongoose.connect("mongodb://yikyikyik:Aa123456@cluster0-shard-00-00-x7eeg.mongodb.net:27017,cluster0-shard-00-01-x7eeg.mongodb.net:27017,cluster0-shard-00-02-x7eeg.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true/gameshop")
mongoose.Promise = global.Promise
const Schema = mongoose.Schema

// create a User schema
const userSchema = new Schema({
	Account: String,
    password: String,
    name: String,
    address: String,
    phone: Number
})

// create a model using the schema
exports.User = mongoose.model('User', userSchema)

// create a Game schema
const gameschema = new Schema({
    GameId:String,
    type:String,
    name:String,
    price:Number,
    description:String,
    fav:Number,
    image:String
})

// create a model using the schema
exports.Game = mongoose.model('Game', gameschema)


// create a Game schema
const cartschema = new Schema({
    gId:String,
    type:String,
    image:String,
    name:String,
    price:Number,
    uAccount:String,

})

// create a model using the schema
exports.Cart = mongoose.model('Cart', cartschema)

const commentschema = new Schema({
    gameId:String,
    uAccount:String,
    comment:String
})

exports.Comment = mongoose.model('Comment',commentschema)