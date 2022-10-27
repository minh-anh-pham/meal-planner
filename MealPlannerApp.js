fetch("https://api.spoonacular.com/recipes/complexSearch")
    .then(res => {
        if (res.ok) {



        }
    })

const body = document.querySelector("body");

async function fetchRecipe() {
    const userInput = document.getElementById("searchInput").value;
    const response = await fetch(`https://api.spoonacular.com/recipes/findByIngredients?ingredients=${userInput}`);
    const data = await response.json();
    console.log(data.title);
    const p = document.createElement("p");
    p.innerHTML = data.title;
    body.appendChild(p);
}
