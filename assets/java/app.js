var ingredients = ["Beef", "Chicken", "Fish", "Carrots", "Mushroom", "Onion", "Milk", "Broth"];
var quantity = ["cups", "pounds", "grams"];
var ingredientNumber = 0;

var completedList = [];


// addNew();

completedList = JSON.parse(localStorage.getItem("todolist"));

$("#try").on("click", addNew);

function addNew() {

    var newDiv = $("<div>");

    var newLine = $("<select>");
    newLine.attr("data-ingredient-number", ingredientNumber);
    var newOption;
    var deleteButton = $("<button>");
    var quantity = $("<input>");

    for (var i = 0; i < ingredients.length; i++) {

        newOption = $("<option>");
        newOption.attr("value", ingredients[i]);
        newOption.html(ingredients[i]);
        newLine.append(newOption);
        newDiv.append(newLine);
        deleteButton.attr("data-number", i);
        deleteButton.text("X");
        quantity.attr("value", "qty");
        newDiv.append(quantity);
        newDiv.append(deleteButton);

    }
}




// recipe stuff below this line

var urlKey = 'keygoeshere'
var spoonURL1 = 'urlgoeshere' + urlKey // search recipes https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search
var spoonURL2 = 'url2goeshere' + urlKey // search site content https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/food/site/search


$.ajax({
    url: spoonURL,
    method: 'GET'
}) .then(function(response1)) {
    console.log(response1.results[0].image)
    $.ajax({
        url: spoonURL2, //(but make sure it has the correct endpoint)
        method: 'GET'
    }) .then(function(response2)) {
        console.log(response2.Recipes[0].link)
    }
}

// stuff from anthony below

    $("#pantry").append(newDiv);

    ingredientNumber++;
}

$("#submit").on("click", tabulate);

function tabulate() {
    completedList = [];

    $("#pantry").find("select").each(function(index, select){
        completedList.push($(select).find(":selected").text())
    });

    localStorage.clear();

    localStorage.setItem("completedList", JSON.stringify(completedList));

    console.log(completedList);
}
