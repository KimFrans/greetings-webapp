const { Pool } = require("pg");

module.exports = function greetName(pool) {

    var greetMessage = "";
    var errorMessageName = "Oops, you have not enetered a name"
    
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

    async function getUserName(names) {
        var newName = names.trim();
        userName = newName.charAt(0).toUpperCase() + newName.slice(1);
    }

    async function greet(radioCheck){

        if(userName.match("^[a-zA-Z]*$")){
            if (radioCheck == "latin") {
                greetMessage = "Salve, " + userName
            }
            if (radioCheck == "turkish") {
                greetMessage = "Merhaba, " + userName
            }
            if (radioCheck == "italian") {
                greetMessage = "Ciao, " + userName
            }
        }
        else if (!userName.match("^[a-zA-Z]*$")) {
            console.log("not match")
                greetMessage = ""
                errorMessageSameName = "Oh no, invalid name entered!"
        }
        

        return greetMessage;
    }

    
    async function errorMessName() {
        return errorMessageName
    }

    async function values() {
        return {
            messageGreet: greetMessage,
        }
    }

    async function findKeyAndValue(userName){
        
        const holderName = await pool.query(`SELECT * FROM namesGreetedDB WHERE username = $1`, [userName])

        // return userName
        return holderName
    }

    

    return {
        greet,
        values,
        getUserName,
        errorMessName,
        findKeyAndValue,
        poolNameIn,
        getDBinfo,
        deleteRecords,
        countDB,
    }



}