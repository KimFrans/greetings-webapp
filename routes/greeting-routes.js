module.exports = function greetingRoutes(greetingName) {

    async function home(req, res) {
        try {
            res.render('index', {
                counterValue: await greetingName.countDB()
            })
        }
        catch (err) {
            console.log(err)

        }
    }

    async function greetUser(req, res) {
        const  databaseName = req.body.names;
        
        try {
            await greetingName.getUserName(req.body.names)

            if (req.body.names != "") {
                await greetingName.greet(req.body.language)
                await greetingName.values().messageGreet
                await greetingName.poolNameIn(databaseName);

                res.render('index', {
                    greetingName1: await greetingName.greet(),
                    counterValue: await greetingName.countDB()

                });
            }
            else {
                res.render('index', {

                    counterValue: await greetingName.countDB(),
                    errorMess: await greetingName.errorMessName(),
                })

            }
        }
        catch (err) {
            console.log(err)
        }
    }

    async function backToHome(req, res) {
        try {
            res.render('index', {
                counterValue: await greetingName.countDB()
            });
        }
        catch (err) {
            console.log(err)
        }
    }

    async function backToGreetingList(req, res) {
        try {
            res.render('list', {
                userNames: await greetingName.getDBinfo()
            });
        }
        catch (err) {
            console.log(err)
        }
    }

    async function backToHomeFrom(req, res) {
        try {
            res.render('index', {
                counterValue: await greetingName.countDB()
            });
        }
        catch (err) {
            console.log(err)
        }
    }

    async function clearNames(req, res) {
        try {
            var clearRows = await greetingName.deleteRecords();
            res.render('index', {
                clearRows
            })
        }
        catch (err) {
            console.log(err)
        }

    }

    async function showGreetedNames(req, res) {
        try {
            var namesGreeted = await greetingName.getDBinfo()

            res.render('list', {
                userNames: namesGreeted,
            })
        }
        catch (err) {
            console.log(err)
        }
    }

    async function numberOfUserGreets(req, res) {
        
        try {
            const userName = req.params.userName
            console.log(userName)

            const yeah = await greetingName.findKeyAndValue(userName)

            res.render('actions', {
                username: yeah.rows[0].username,
                count: yeah.rows[0].count
            });
        }
        catch (err) {
            console.log(err)
        }
    }

    async function greetedListOfNames(req, res) {
        try {
            var namesGreeted = await greetingName.getDBinfo()
            res.render('../namesDisplay/list', {
                userNames: namesGreeted,
            })
        }
        catch (err){
            console.log(err)
        }
    }

    return {
        home,
        greetUser,
        backToHome,
        backToGreetingList,
        backToHomeFrom,
        clearNames,
        showGreetedNames,
        numberOfUserGreets,
        greetedListOfNames,
    }
}


