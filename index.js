// const fetch = require("isomorphic-fetch")
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '5b2a865dc3mshadd072595e65b0ap112820jsn00b11a781589',
		'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
	}
};

//const recipes = []
let userInput = "";
const resultsDiv = document.querySelector("#results");
const form = document.querySelector("#searchbar");

form.addEventListener("submit", function(e) {
	e.preventDefault(); //e is the event,
	userInput = document.getElementById("searchText").value;
		resultsDiv.innerHTML = ""
    	findRecipe(userInput).then(result => {
        	for (const item of result) {
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

		    //called the newly created function(line 71) and added the summary to the page
		    getSummaryById(item.id).then( summary => {
			const addSummary = document.createElement("p");
			addSummary.innerHTML += summary;
			newDiv.appendChild(addSummary);
		    })

		    //called getInstructionsById and added instructions to the page
		    getInstructionsById(item.id).then( instructions => {
		    	const addInstructions = document.createElement("p");
			addInstructions.innerHTML += "<b> Instructions <b/> <br>";
		   	addInstructions.innerHTML += instructions;
		   	newDiv.appendChild(addInstructions);
		    })
		}
    })
})

// click on header to return to default & searchbar to clear
const header = document.querySelector("#header");
const searchContents = document.querySelector("#searchText")
header.addEventListener("click", function(e) {
	resultsDiv.innerHTML = null;
	searchContents.value = null;
})


function findRecipe(ingredient) {

    return new Promise((resolve, reject) => {
        fetch(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?ingredients=${ingredient}`, options)
	    .then(response => response.json())
	    .then(response => {
            resolve(response)
        })
	    .catch(err => {reject(err)});
    })
}


//created a function to get the summary of a recipe using its ID
function getSummaryById(id) {
	return new Promise((resolve, reject) => {
        fetch(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${id}/information`, options)
	    .then(response => response.json())
	    .then(response => {
            resolve(response.summary)
        })
	    .catch(err => {reject(err)});
    })
}


//created a function to get the instructions of a recipe using its ID
function getInstructionsById(id) {
	return new Promise((resolve, reject) => {
        fetch(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${id}/information`, options)
	    .then(response => response.json())
	    .then(response => {
            resolve(response.instructions)
        })
	    .catch(err => {reject(err)});
    })
}
