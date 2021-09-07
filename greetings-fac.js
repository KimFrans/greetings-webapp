const { Pool } = require("pg");

module.exports = function greetName(pool) {

    var greetMessage = "";
    var errorMessageName = "Oops, you have not enetered a name"
    var errormessageLan = "Oops you have not selected a language"
    var errorMessageSameName = ""
    var errorNoValues = "Please enter name and select language"
    var la = "Salve, "
    var tur = "Merhaba, "
    var ital = "Ciao, "
    var greetCount = 0
    var namesGreeted = {}
    var userName = "";
    namesGreeted = pool;

    //async functions

    async function poolNameIn(nameEntered){

        const dbAccess = await pool.query('SELECT * FROM namesGreetedDB WHERE username = $1', [nameEntered]);

        if(dbAccess.rows.length === 0){
            await pool.query('insert into namesGreetedDB (username, count) values($1, $2)', [nameEntered, 1])
        }
        else{
            await pool.query('UPDATE namesGreetedDB SET count = count + 1 WHERE username = $1', [nameEntered])
        }

    }

    async function getDBinfo(){
        const gettingName = await pool.query('SELECT * FROM namesGreetedDB') 


        return gettingName.rows;
    }

    async function deleteRecords(){
        const deleteAll = await pool.query('DELETE FROM namesGreetedDB')
    }

    async function countDB(){
        const keepCount = await pool.query('SELECT count(*) FROM namesGreetedDB')

        return keepCount.rows[0].count;
    }


    function getUserName(names) {
        var newName = names.trim();
        userName = newName.charAt(0).toUpperCase() + newName.slice(1);
    }

    function greet(radioCheck) {


        if (namesGreeted.hasOwnProperty(userName)) {
            namesGreeted[userName]++;

            nameOb()

            if (radioCheck == "latin") {
                greetMessage = la + userName
            }
            if (radioCheck == "turkish") {
                greetMessage = tur + userName
            }
            if (radioCheck == "italian") {
                greetMessage = ital + userName
            }
        }
        if (namesGreeted[userName] === undefined) {
            errorMessageSameName = ''
            if (userName.match("^[a-zA-Z]*$")) {

                if (radioCheck == "latin") {
                    greetMessage = la + userName
                    namesGreeted[userName] = 0;
                    greetCount++;
                }
                if (radioCheck == "turkish") {
                    greetMessage = tur + userName
                    namesGreeted[userName] = 0;
                    greetCount++;
                }
                if (radioCheck == "italian") {
                    greetMessage = ital + userName
                    namesGreeted[userName] = 0;
                    greetCount++;
                }

            }
            else if (!userName.match("^[a-zA-Z]*$")) {
                greetMessage = ""
                errorMessageSameName = "Oh no, invalid name entered!"
            }


        }
        return greetMessage

    }

    function errorMessRadio() {
        return errormessageLan
    }

    function nameOb() {
        if (namesGreeted.hasOwnProperty(userName)) {
            return errorMessageSameName = "You have already entered this name"
        }
    }

    function errorMessName() {
        return errorMessageName
    }

    function greetedNames() {
        return namesGreeted
    }

    function nameObs(name) {
        namesGreeted = name
    }

    function greetLo(name) {
        greetCount = greetCount
    }

    function noValues() {
        return errorNoValues
    }

    function values() {
        return {
            nameObject: namesGreeted,
            theUser: userName,
            greets: greetCount,
            italian: ital,
            latin: la,
            turkish: tur,
            messageGreet: greetMessage,
            sameName: errorMessageSameName
        }
    }

    function clearTheCountButton() {
        greetCount = 0
        namesGreeted = {}
    }

    async function findKeyAndValue(userName){
        // const filteredActions = [];
        // for (var key in namesGreeted) {
            
        //     if(key === userName){
        //         filteredActions.push(namesGreeted[key]);
        //         console.log(namesGreeted[key] + ' this is key')
        //     }
        // }
        // return filteredActions

        const holderName = await pool.query(`SELECT * FROM namesGreetedDB WHERE username = $1`, [userName])

        return userName
    }

    

    return {
        greetLo,
        nameObs,
        greet,
        errorMessRadio,
        values,
        getUserName,
        errorMessName,
        clearTheCountButton,
        nameOb,
        greetedNames,
        noValues,
        findKeyAndValue,
        poolNameIn,
        getDBinfo,
        deleteRecords,
        countDB,
    }



}