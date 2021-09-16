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


    it('should get the count from the database for a specific name', async function () {

        await greetingTest.getUserName("Kelly")
        await greetingTest.greet("latin")

        await greetingTest.poolNameIn("Kelly")
        await greetingTest.countDB()

        assert.equal(1, await greetingTest.countDB());


    });

    it('should get the username from the database', async function () {

        await greetingTest.getUserName("Kelly")
        await greetingTest.greet("latin")

        await greetingTest.poolNameIn("Kelly")
        await greetingTest.getDBinfo()

        var arrayValue = []
        var valueFromDB = await greetingTest.getDBinfo();
        valueFromDB.forEach(element => {
            arrayValue.push({ username: element.username })
        });

        assert.deepEqual([{ username: "Kelly" }], arrayValue)


    });

    it('Should display error messsage when no name has been entered', async function () {

        await greetingTest.getUserName(" ")
        await greetingTest.greet("latin")
        await greetingTest.poolNameIn("")

        assert.equal("Oops, you have not enetered a name", await greetingTest.errorMessName())

    });
    


    after(function () {
        pool.end();
    })
});
