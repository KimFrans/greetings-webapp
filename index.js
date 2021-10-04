const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');
const greetingsWeb = require('./greetings-fac');
const pg = require('pg')
const Pool = pg.Pool;
const greetRoute = require('./routes/greeting-routes')

// should we use a SSL connection
let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local){
    useSSL = true;
}

// // db connection
const connectionString = process.env.DATABASE_URL || 'postgresql://codex:pg123@localhost:5432/greetings_db';

const pool = new Pool({
    connectionString,
    // ssl : useSSL
    ssl: { rejectUnauthorized: false }
});


const app = express();
const greetingName = greetingsWeb(pool)
const greetingRoute = greetRoute(greetingName)

// const Pool = pg.Pool;

app.engine('handlebars', exphbs({ defaultLayout: 'main', layoutsDir: __dirname + '/views/layouts' }));
app.set('view engine', 'handlebars');


app.use(express.static('public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.get('/', greetingRoute.home);
app.post('/greetings', greetingRoute.greetUser);
app.get('/backtogreetings', greetingRoute.backToHome)
app.get('/greetedList', greetingRoute.backToGreetingList)
app.get('/greetingsBack', greetingRoute.backToHomeFrom)
app.post('/clearCount', greetingRoute.clearNames)
app.post('/greeted', greetingRoute.showGreetedNames)
app.get('/counter/:userName', greetingRoute.numberOfUserGreets)
app.get('/greetedList', greetingRoute.greetedListOfNames)


const PORT = process.env.PORT || 3011

app.listen(PORT, function () {
    console.log("App started at port:", PORT)
});