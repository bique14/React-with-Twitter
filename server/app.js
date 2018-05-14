var express = require('express')
var bodyParser = require('body-parser')
var app = express()
const mongoose = require('mongoose')
const Schema = mongoose.Schema,
    ObjectID = Schema.ObjectID
mongoose.connect('mongodb://localhost:27017/demo')

// var jsonParser = bodyParser.json()
// var urlencodedParser = bodyParser.urlencoded({ extended: true })

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const datatSchema = new Schema({
    user_id: { type: String },
    text: { type: String },
    created_at: { type: String },
    retweet_count: { type: Number },
    fav_count: { type: Number },
    sentiment: { type: String }
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
    // userData.collection.insert(req.body, (err, result) => {
    //     if (err) return console.log(err)

    //     console.log('saved to database')/
    //     res.redirect('/')
    // })
    var username = req.body.username;
    var password = req.body.password;
    // console.log(username, password)
    // console.log(req.body)
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

// app.use(bodyParser.json())
app.get('/', function (req, res) {
    res.send('this is a server')
})

app.listen(4000, function () {
    console.log('Example app listening on port 4000!')
})
