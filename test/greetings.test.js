const assert = require('assert');
const greeting = require('../greetings-fac');
const pg = require("pg");
// const greetingTest = greeting()
const Pool = pg.Pool;

const connectionString = process.env.DATABASE_URL || 'postgresql://codex:pg123@localhost:5432/greetings-test';

const pool = new Pool({
    connectionString
});

const greetingTest = greeting(pool)

describe('The greetings web app', function () {

    beforeEach(async function () {
        // clean the tables before each test run
        await pool.query("delete from namesGreetedDB;");
    });

    it('should get the name entered and greet in selected language to pass the test', async function () {

        greetingTest.getUserName("kim")
        greetingTest.greet("latin")

        assert.equal("Salve, Kim", greetingTest.values().messageGreet)


    });
    it('should greet Kim in turkish to pass the test', async function () {

        greetingTest.getUserName("kim")
        greetingTest.greet("turkish")

        assert.equal("Merhaba, Kim", greetingTest.values().messageGreet)


    });
    it('should greet Kim in latin to pass the test ', async function () {

        greetingTest.getUserName("kim")
        greetingTest.greet("italian")

        assert.equal("Ciao, Kim", greetingTest.values().messageGreet)


    });

    it('Should increase the counter when a new name is entered', async function () {

        greetingTest.getUserName("kim")
        greetingTest.greet("latin")
        greetingTest.getUserName("Kelly")
        greetingTest.greet("italian")
        greetingTest.getUserName("qwerty")
        greetingTest.greet("turkish")

        assert.deepEqual(3, greetingTest.values().greets)

    });

    it('should get the count from the database for a specific name', async function () {

        greetingTest.getUserName("Kelly")
        greetingTest.greet("latin")

        await greetingTest.poolNameIn("Kelly")
        await greetingTest.countDB()

        assert.equal(1, await greetingTest.countDB())


    });

    it('should get the username from the database', async function () {

        greetingTest.getUserName("Kelly")
        greetingTest.greet("latin")

        await greetingTest.poolNameIn("Kelly")
        await greetingTest.getDBinfo()

        var arrayValue = []
        var valueFromDB = await greetingTest.getDBinfo();
        valueFromDB.forEach(element => {
            arrayValue.push({ username: element.username })
        });

        assert.deepEqual([{ username: "Kelly" }], arrayValue)


    });

    it('Should display error messsage when no name has been entered', function () {

        greetingTest.getUserName("")
        greetingTest.greet("latin")

        assert.equal("Oops, you have not enetered a name", greetingTest.errorMessName())

    });


    after(function () {
        pool.end();
    })
});

// describe('Greetings Function', function () {


//     it('Should be able to get the user name and greet', function () {
//         greetingTest.getUserName("kim")
//         greetingTest.greet("latin")

//         assert.equal("Salve, Kim", greetingTest.values().messageGreet)

//     });


// });

// let assert = require("assert");
// let greetings = require("../greetings-fac");
// let greetingTest = greetings()

// describe('Greetings Function', function () {


//     it('Should be able to get the user name and greet', function () {
//         greetingTest.getUserName("kim")
//         greetingTest.greet("latin")

//         assert.equal("Salve, Kim", greetingTest.values().messageGreet)

//     });

//     it('Should not greet the same name twice', function(){
//         greetingTest.getUserName("kim")
//         greetingTest.greet("latin")
//         greetingTest.getUserName("Kim")
//         greetingTest.greet("latin")

//         assert.equal("You have already entered this name", greetingTest.values().sameName)
//     });

//     it('Should display all the names greeted' , function(){

//         greetingTest.getUserName("kim")
//         greetingTest.greet("latin")
//         greetingTest.getUserName("Kelly")
//         greetingTest.greet("italian")
//         greetingTest.getUserName("qwerty")
//         greetingTest.greet("turkish")

//         assert.deepEqual({ Kim: 3, Kelly: 0, Qwerty: 0 }, greetingTest.values().nameObject)

//     });

//     it('Should increase the counter' , function(){

//         greetingTest.getUserName("kim")
//         greetingTest.greet("latin")
//         greetingTest.getUserName("Kelly")
//         greetingTest.greet("italian")
//         greetingTest.getUserName("qwerty")
//         greetingTest.greet("turkish")

//         assert.deepEqual(3, greetingTest.values().greets)

//     });

//     it('Should display error messsage when the same name has been entered' , function(){

//         greetingTest.getUserName("kim")
//         greetingTest.greet("latin")
//         greetingTest.getUserName("Kim")
//         greetingTest.greet("turkish")

//         assert.equal("You have already entered this name", greetingTest.values().sameName)

//     });

// });

