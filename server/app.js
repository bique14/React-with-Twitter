var express = require('express')
var bodyParser = require('body-parser')
var app = express()
const mongoose = require('mongoose')
const Schema = mongoose.Schema,
    ObjectID = Schema.ObjectID
mongoose.connect('mongodb://localhost:27017/demo')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const datatSchema = new Schema({
    user_id: { type: String },
    text: { type: String },
    created_at: { type: String },
    retweet_count: { type: Number },
    fav_count: { type: Number },
    sentiment: { type: String },
    sum: { type: Number },
    pos: { type: Number },
    neg: { type: Number },
    nat: { type: Number }
})
const TwtData = mongoose.model('tweet_data', datatSchema)

const userSchema = new Schema({
    username: { type: String },
    password: { type: String }
})
const userData = mongoose.model('user', userSchema)

app.get('/fetch', function (req, res, next) {
    const List = TwtData.find({}, function (err, dat) {
        res.json(dat)
        if (err) console.log("error", error)
        else console.log('no err')
    })
    res.header("Access-Control-Allow-Origin", "*");
})

app.post('/signup', function (req, res, next) {
    var myData = new userData(req.body);
    myData.save()
        .then(item => {
            res.send("item saved to database");
            console.log('success')
        })
        .catch(err => {
            res.status(400).send("unable to save to database");
            console.log('failed')
        });
})

app.post('/checklogin', function (req, res, next) {
    var usr = req.body.username
    var pwd = req.body.password
    userData.find({}, function (err, data) {
        const chk = data.forEach(function (dat) {
            console.log(dat.username == usr && dat.password == pwd)
            return dat.username == usr && dat.password == pwd
            // if (dat.username == usr && dat.password == pwd) {
            //     console.log('match!', dat.password, pwd)
            //     return false
            // }else {
            //     console.log('invalid username or password')
            //     return false
            // }
        })
        res.json(data)
        // if (err) console.log('error', error)
        // else console.log('no err')
    })
})

// update sentiment in DB
app.post('/update', function (req, res, next) {
    // req.body : id(string), pos(nubmer), neg(number), nat(number), sum(number)
    var upsertData = {
        $inc: {
            sum: 1
        },
        $set: {
            pos: req.body.pos,
            neg: req.body.neg,
            nat: req.body.nat
        }
    };

    TwtData.update({ _id: req.body.id }, upsertData, { upsert: true }, function (err, data) {
        if (err) return console.log(err);
        res.send(data);
    });
    res.header("Access-Control-Allow-Origin", "*");
})

// get to calculate 
app.get('/getScore', function (req, res, next) {
    const List = TwtData.find({}, function (err, dat) {
        res.json(dat)
        if (err) console.log("error", error)
        else console.log('no err')
    })
    res.header("Access-Control-Allow-Origin", "*");
})

// app.use(bodyParser.json())
app.get('/', function (req, res) {
    res.send('this is a server')
})


app.listen(4000, function () {
    console.log('Example app listening on port 4000!')
})
