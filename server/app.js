// import { Schema } from 'mongoose';
// import {TableList} from './TableList.js'
var express = require('express')
var bodyParser = require('body-parser')
var app = express()
const mongoose = require('mongoose')
const Schema = mongoose.Schema,
    ObjectID = Schema.ObjectID
mongoose.connect('mongodb://localhost:27017/demo')

const datatSchema = new Schema({
    user_id: { type: String },
    text: { type: String },
    created_at: { type: String },
    retweet_count: { type: Number },
    fav_count: { type: Number },
    sentiment: { type: String }
})
const TwtData = mongoose.model('tweet_data', datatSchema)

app.get('/fetch', function (req, res, next) {

    const List = TwtData.find({}, function (err, dat) {

        dat.forEach(function (kuy) {
            console.log(kuy.user_id)      
        })
        res.json(dat)
        if (err) console.log("error", error)
        else console.log('no err')
    })
    // res.send
    res.header("Access-Control-Allow-Origin", "*");
})

// app.use(bodyParser.json())
app.get('/', function (req, res) {
    res.send('sdaQdas')
})

app.listen(4000, function () {
    console.log('Example app listening on port 4000!')
})
