// const fetch = require("isomorphic-fetch")

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '5b2a865dc3mshadd072595e65b0ap112820jsn00b11a781589',
		'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
	}
};

//const recipes = []

const searchBtn = document.getElementById("searchBtn");

let userInput = "";

searchBtn.addEventListener("click", function() {
    userInput = document.getElementById("searchText").value;

    findRecipe(userInput).then(result => {
        //the result variable from above is an array with the recipes containg the ingredient specified in userInput
        //add here what you want to do with the result (print it/display it)
        for (const item of result) {
            console.log(item);
            // document.write(`${item.id}`);
            const resultsDiv = document.querySelector("#results");
            const newDiv = document.createElement("div");
            newDiv.classList.add("recipeDiv");
            resultsDiv.appendChild(newDiv);

            const addTitle = document.createElement("h3");
            const titleContent = document.createTextNode(`${item.title}`);
            addTitle.appendChild(titleContent);
            newDiv.appendChild(addTitle);

            const addImage = document.createElement("img");
            addImage.setAttribute("src", `${item.image}`);
            addImage.setAttribute("alt", `${item.title}`);
            addImage.setAttribute("width", "100%");
            newDiv.appendChild(addImage);

            const addCuisine = document.createElement("p");
            const cuisineContent = document.createTextNode(`${item.license}`);
            addCuisine.appendChild(cuisineContent);
            newDiv.appendChild(addCuisine);
        }
    })
});

function findRecipe(ingredient) {

    return new Promise((resolve, reject) => {
        fetch(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?ingredients=${ingredient}`, options)
        .then(response => response.json())
        .then(response => {
            resolve(findRecipeInfo(response));
        })
	    .catch(err => {reject(err)});
    })
}

function findRecipeInfo(array) {
    return new Promise((resolve, reject) => {
        const recipes = [];
        for (const item of array) {
            fetch(`https://api.spoonacular.com/recipes/${item.id}/information?includeNutrition=false`, options)
            .then(response => response.json())
            .then(response => {
                recipes.push(response);
            })
            .catch(err => {reject(err)});
        }
        console.log(recipes);
        })
}
