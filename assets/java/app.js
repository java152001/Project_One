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