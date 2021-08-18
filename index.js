const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const greetingsWeb = require('./greetings-fac');

const app = express();

app.engine('handlebars', exphbs({ defaultLayout: 'main', layoutsDir: __dirname + '/views/layouts' }));
app.set('view engine', 'handlebars');


app.use(express.static('public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.get('/', function (req, res) {

    res.render('index');
});

app.post('/greetings', function (req, res) {
    // console.log(req.body);

    grettingsWeb.getUserName(req.body.names)

    greetingsWeb.greet()
    // console.log(settingsBill.getSettings())

    res.redirect('/')
});




const PORT = process.env.PORT || 3011

app.listen(PORT, function () {
    console.log("App started at port:", PORT)
});