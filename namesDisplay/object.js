var listOfNames = document.querySelector(".names")
var factoryOb = greetName();

var emptyOb = {}
if(localStorage['namesGreetedObject']){
    emptyOb = JSON.parse(localStorage['namesGreetedObject'])
}
console.log(emptyOb)

listOfNames.innerHTML = JSON.stringify(emptyOb)
console.log(emptyOb)