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

// app.get('/', async function (req, res) {
//     res.render('index',{
//         counterValue : await greetingName.countDB()
//     })
// });

// app.post('/greetings', async function (req, res) {

//     const  databaseName = req.body.names;

//     try {
//         await greetingName.getUserName(req.body.names)

//         if (req.body.names != "") {
//            await greetingName.greet(req.body.language)
//             await greetingName.values().messageGreet
//             await greetingName.poolNameIn(databaseName);            

//             res.render('index', {
//                 greetingName1: await greetingName.greet(),
//                 counterValue: await greetingName.countDB()

//             });
//         }
//         else {
//             res.render('index', {
                
//                 counterValue: await greetingName.countDB(),
//                 errorMess: await greetingName.errorMessName(),
//             })

//         }
//     }
//     catch(err){
//         console.log(err)
//     }

// });

// app.get('/backtogreetings', async function (req, res) {

//     res.render('index', {
        
//         counterValue: await greetingName.countDB()

//     });
// });

// app.get('/greetedList', async function (req, res) {
    
//     res.render('list', {
       
//         userNames : await greetingName.getDBinfo()

//     });
// });

// app.get('/greetingsBack', async function (req, res) {

//     res.render('index', {
        
//         counterValue: await greetingName.countDB()

//     });
// });


// app.post('/clearCount', async function (req, res) {
    
//     var clearRows = await greetingName.deleteRecords();

//     res.render('index', {
      
//         clearRows
//     })
// });


// app.post('/greeted', async function (req, res) {
    
//     var namesGreeted = await greetingName.getDBinfo()
    

//     res.render('list', {
//         userNames: namesGreeted,
//     })
// });

// app.get('/counter/:userName', async function (req, res) {
//     const userName = req.params.userName
//     console.log(userName)

//     var see = await pool.query(`SELECT * FROM namesGreetedDB WHERE username = $1`, [userName])

//     console.log(see.rows[0])
//     const yeah = await greetingName.findKeyAndValue(userName)
//     res.render('actions', {
        
//         username : see.rows[0].username,
//         count : see.rows[0].count
//     });
// });


// app.get('/greetedList', async function (req, res) {
    
//     var namesGreeted = await greetingName.getDBinfo()
//     res.render('../namesDisplay/list', {
//         userNames: namesGreeted,
//     })
// });


const PORT = process.env.PORT || 3011

app.listen(PORT, function () {
    console.log("App started at port:", PORT)
});