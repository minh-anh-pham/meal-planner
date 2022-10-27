    const searchBtn = document.getElementById("searchBtn");
    let userInput = "";
    searchBtn.addEventListener("click", function() {
        userInput = document.getElementById("searchText").value;
    });
