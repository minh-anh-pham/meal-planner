// const fetch = require("isomorphic-fetch")
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '5b2a865dc3mshadd072595e65b0ap112820jsn00b11a781589',
		'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
	}
};

const recipes = []
let userInput = "";

const form = document.querySelector("#searchbar")

form.addEventListener("submit", function(e) {
	e.preventDefault(); //e is the event,
	userInput = document.getElementById("searchText").value;
    findRecipe(userInput).then(result => {
        document.write(result)
    })
})

function findRecipe(ingredient) {

    return new Promise((resolve, reject) => {
        fetch(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?ingredients=${ingredient}`, options)
	    .then(response => response.json())
	    .then(response => {
            for(const x of response) {
                recipes.push(x.title)
            }
            resolve(recipes)
        })
	    .catch(err => {reject(err)});
    })
}
