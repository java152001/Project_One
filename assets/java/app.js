var ingredients = ["Beef", "Chicken", "Fish", "Carrots", "Mushroom", "Onion", "Milk", "Broth"];
var quantity = ["cups", "pounds", "grams"];
var ingredientNumber = 0;

var completedList = [];


// addNew();

completedList = JSON.parse(localStorage.getItem("todolist"));

$("#try").on("click", function() {
    addNew();


});

function addNew() {

    var newDiv = $("<div>");

    var newLine = $("<select>");
    // newLine.attr("data-ingredient-number", ingredientNumber);
    var newOption;
    var deleteButton = $("<button class='delete'>");
    // var quantity = $("<input>");

    for (var i = 0; i < ingredients.length; i++) {

        newOption = $("<option>");
        newOption.attr("value", ingredients[i]);
        newOption.html(ingredients[i]);
        newLine.append(newOption);
        newDiv.append(newLine);
        newDiv.attr("data-ingredient-number", ingredientNumber)
        deleteButton.attr("data-number", ingredientNumber);
        deleteButton.text("X");
        // quantity.attr("value", "qty");
        // newDiv.append(quantity);
        newDiv.append(deleteButton);

    }

    $("#pantry").append(newDiv);

    ingredientNumber++;
}

// removes the select option when the X button is clicked
$(document).on("click", "button.delete", function() {
    var currentItem = $(this).attr('data-number');

    $("#pantry").find("[data-ingredient-number='" + currentItem + "']").remove();
    
});

// tabulates all the current selections into an array and stores that array in local storage
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