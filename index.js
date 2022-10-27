const fetch = require("isomorphic-fetch")

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '5b2a865dc3mshadd072595e65b0ap112820jsn00b11a781589',
		'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
	}
};

const recipes = []

function findRecipe(id) {
    fetch(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?ingredients=${id}`, options)
	    .then(response => response.json())
	    .then(response => {
            for(const x of response) {
                recipes.push(x.title)
                console.log(recipes)
            }
        })
	    .catch(err => console.log(err));

}

findRecipe("avocado")
