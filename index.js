const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const greetingsWeb = require('./greetings-fac');

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
    console.log(greetingName.values().messageGreet)
    res.render('index')
});

app.post('/greetings', function (req, res) {
    // console.log(req.body);

    greetingName.getUserName(req.body.names)

    var greetingName1 = greetingName.greet(req.body.language)
    // console.log(greetingName1)

    res.render('index',{
        greetingName1
    })
});




const PORT = process.env.PORT || 3011

app.listen(PORT, function () {
    console.log("App started at port:", PORT)
});