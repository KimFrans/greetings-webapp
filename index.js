const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const session = require('express-session');
const greetingsWeb = require('./greetings-fac');
const pg = require('pg')
const Pool = pg.Pool;

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
    ssl : useSSL
});


const app = express();
const greetingName = greetingsWeb(pool)

// const Pool = pg.Pool;

app.engine('handlebars', exphbs({ defaultLayout: 'main', layoutsDir: __dirname + '/views/layouts' }));
app.set('view engine', 'handlebars');


app.use(express.static('public'));

// app.use(session({
//     secret: "Error Message String",
//     resave: false,
//     saveUninitialized: true
// }));

// app.use(flash());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.get('/', async function (req, res) {
    // var check = await pool.query('SELECT count FROM namesGreetedDB')
    // console.log(check)
    res.render('index',{
        counterValue : await greetingName.countDB()
    })
});

app.post('/greetings', async function (req, res) {

    const  databaseName = req.body.names;

    try {
        greetingName.getUserName(req.body.names)
        console.log(req.body.names)

        if (req.body.names != "") {
            greetingName.greet(req.body.language)
            greetingName.values().messageGreet
            await greetingName.poolNameIn(databaseName);

            console.log(await greetingName.getDBinfo())
            console.log(await greetingName.countDB())

            res.render('index', {
                greetingName1: greetingName.greet(),
                // counterValue: greetingName.values().greets,
                counterValue: await greetingName.countDB()

            });
        }
        else {
            res.render('index', {
                // counterValue: greetingName.values().greets,
                counterValue: await greetingName.countDB(),
                errorMess: greetingName.errorMessName(),
            })

        }
    }
    catch(err){
        console.log(err)
    }
    // greetingName.getUserName(req.body.names)
    // console.log(req.body.names)

    // if (req.body.names != "") {
    //     greetingName.greet(req.body.language)
    //     greetingName.values().messageGreet

    //     res.render('index', {
    //         greetingName1: g13reetingName.greet(),
    //         counterValue: greetingName.values().greets,

    //     });
    // }
    // else {
    //     res.render('index', {
    //         counterValue: greetingName.values().greets,
    //         errorMess: greetingName.errorMessName(),
    //     })

    // }
    // res.render('index', {
    //     counterValue: greetingName.values().greets,

    // })


});

app.get('/backtogreetings', async function (req, res) {

    res.render('index', {
        // counterValue: greetingName.values().greets
        counterValue: await greetingName.countDB()

    });
});

app.get('/greetedList', async function (req, res) {
    // var namesGreeted = await greetingName.getDBinfo()
    res.render('../namesDisplay/list', {
        // userNames: greetingName.values().nameObject
        userNames : await greetingName.getDBinfo()

    });
});

app.get('/greetingsBack', async function (req, res) {

    res.render('index', {
        // counterValue: greetingName.values().greets
        counterValue: await greetingName.countDB()

    });
});


app.post('/clearCount', async function (req, res) {
    var clear = greetingName.clearTheCountButton();
    var clearRows = await greetingName.deleteRecords();

    res.render('index', {
        clear,
        clearRows
    })
});


app.post('/greeted', async function (req, res) {
    // var namesGreeted = greetingName.values().nameObject
    var namesGreeted = await greetingName.getDBinfo()
    // console.log(namesGreeted)

    res.render('../namesDisplay/list', {
        userNames: namesGreeted,
    })
});

app.get('/counter/:userName', async function (req, res) {
    const userName = req.params.userName
    console.log(userName)

    var see = await pool.query(`SELECT * FROM namesGreetedDB WHERE username = $1`, [userName])

    console.log(see.rows[0])
    const yeah = await greetingName.findKeyAndValue(userName)
    res.render('actions', {
        // counter: await greetingName.findKeyAndValue(userName),
        // userName: userName
        username : see.rows[0].username,
        count : see.rows[0].count
    });
});

// app.get('/backtogreetings', async function (req, res) {
   
//     res.render('index',{
//         counterValue: await greetingName.countDB()

//     })
// });

app.get('/greetedList', async function (req, res) {
    // var namesGreeted = greetingName.values().nameObject
    var namesGreeted = await greetingName.getDBinfo()
    res.render('../namesDisplay/list', {
        userNames: namesGreeted,
    })
});

// app.get('/greetingsBack', async function (req, res) {
//     res.render('index')
// });


const PORT = process.env.PORT || 3011

app.listen(PORT, function () {
    console.log("App started at port:", PORT)
});