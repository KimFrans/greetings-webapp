const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');
const greetingsWeb = require('./greetings-fac');
// const { json } = require('body-parser');


const app = express();
const greetingName = greetingsWeb()

app.engine('handlebars', exphbs({ defaultLayout: 'main', layoutsDir: __dirname + '/views/layouts' }));
app.set('view engine', 'handlebars');


app.use(express.static('public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.get('/', function (req, res) {

    res.render('index')
});

app.post('/greetings', function (req, res) {
    // console.log(req.body);
    
    greetingName.getUserName(req.body.names)

    var greetingName1 = greetingName.greet(req.body.language)
    var errorName = greetingName.values().sameName
    // console.log(greetingName1)

    // req.flash('info', errorMess);

    res.render('index',{
        greetingName1, 
        counterValue : greetingName.values().greets,
        errorMess : errorName,
        
    })
});

// app.get('/greetings', function (req, res) {
//     req.flash('info', {errorMess : greetingName.values().sameName});
//     res.redirect('/');
// });


app.post('/clearCount', function (req, res){ 
    var clear = greetingName.clearTheCountButton();

    res.render('index', {
        clear,
    })
});


app.post('/greeted', function (req, res){
    var namesGreeted = greetingName.values().nameObject
    console.log(namesGreeted)

    res.render('../namesDisplay/list', {
        userNames : namesGreeted,
    })
});

app.get('/counter/:userName', function(req, res){
    const userName = req.params.userName
    console.log(userName)
    // var user = greetingName.findKeyAndValue()
    console.log(greetingName.findKeyAndValue(userName))
    res.render('actions',{
        counter :greetingName.findKeyAndValue(userName),
        userName : userName
    });
});

app.get('/backtogreetings', function(req, res){
    res.render('index')
});

app.get('/greetedList', function(req, res){
    var namesGreeted = greetingName.values().nameObject
    res.render('../namesDisplay/list',{
        userNames : namesGreeted,
    })
});

app.get('/greetingsBack', function(req, res){
    res.render('index')
});


const PORT = process.env.PORT || 3011

app.listen(PORT, function () {
    console.log("App started at port:", PORT)
});