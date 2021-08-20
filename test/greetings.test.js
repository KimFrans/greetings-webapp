let assert = require("assert");
let greetings = require("../greetings-fac");
let greetingTest = greetings()

describe('Greetings Function', function () {

    // let userName = "Kim"

    // greetingTest.getUserName(userName)
    it('Should be able to get the user name and greet', function () {
        greetingTest.getUserName("kim")
        greetingTest.greet("latin")

        assert.equal("Salve, Kim", greetingTest.values().messageGreet)
        // assert.equal("Kim", greetingTest.getUserName(userName));
    });

    it('Should not greet the same name twice', function(){
        greetingTest.getUserName("kim")
        greetingTest.greet("latin")
        greetingTest.getUserName("Kim")
        greetingTest.greet("latin")

        assert.equal("You have already entered this name", greetingTest.values().sameName)
    });

    it('Should display all the names greeted' , function(){

        greetingTest.getUserName("kim")
        greetingTest.greet("latin")
        greetingTest.getUserName("Kelly")
        greetingTest.greet("italian")
        greetingTest.getUserName("qwerty")
        greetingTest.greet("turkish")

        assert.deepEqual({ Kim: 3, Kelly: 0, Qwerty: 0 }, greetingTest.values().nameObject)

    });

    it('Should increase the counter' , function(){

        greetingTest.getUserName("kim")
        greetingTest.greet("latin")
        greetingTest.getUserName("Kelly")
        greetingTest.greet("italian")
        greetingTest.getUserName("qwerty")
        greetingTest.greet("turkish")

        assert.deepEqual(3, greetingTest.values().greets)

    });

    it('Should display error messsage when the same name has been entered' , function(){

        greetingTest.getUserName("kim")
        greetingTest.greet("latin")
        greetingTest.getUserName("Kim")
        greetingTest.greet("turkish")

        assert.equal("You have already entered this name", greetingTest.values().sameName)

    });

});