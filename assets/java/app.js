var ingredients = ["--Meats--", "Beef", "Chicken", "Fish", "--Vegetables--", "Carrots", "Mushroom", "Onion", "Milk", "Broth"];
var quantity = ["cups", "pounds", "grams"];
var ingredientNumber = 0;

var completedList = [];


// brings in list from local storage
completedList = JSON.parse(localStorage.getItem("completedList"));

// checks to see if there is anything in the array and if so generate our current list
if (completedList.length !== 0) {
    createList();
} 



// generates a new selection entry on the page
$("#add").on("click", function() {
    addNew();
});

// removes the select option when the X button is clicked
$(document).on("click", "button.delete", function() {
    var currentItem = $(this).attr('data-number');

    $("#pantry").find("[data-ingredient-number='" + currentItem + "']").remove();

});

// removes from the current list and local storage
$("#ingList").on("click", "button.listDelete", function() {
    var currentDelete = $(this).attr('data-list-number');

    completedList.splice(currentDelete, 1);

    $("#ingList").empty();
    $("#ingList").html("<h4>Your current list:</h4>");

    createList();

    localStorage.clear();

    localStorage.setItem("completedList", JSON.stringify(completedList));
})

// tabulates all the current selections into an array and stores that array in local storage
$("#submit").on("click", tabulate);

function addNew() {

    var newDiv = $("<div>");

    var newLine = $("<select>");
    // newLine.attr("data-ingredient-number", ingredientNumber);
    var newOption;
    var deleteButton = $("<button class='delete'>");
    // var quantity = $("<input>");

    for (var i = 0; i < ingredients.length; i++) {

        newOption = $("<option>");

        // checks to see if the option should be a grouping or actual option
        if (ingredients[i] !== "--Meats--" && ingredients[i] !== "--Vegetables--") {
            newOption.attr("value", ingredients[i]);
            newOption.html(ingredients[i]);
        } else {
            newOption = $("<optgroup>");
            newOption.attr("label", ingredients[i]);
        }
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


// takes all of our existing select tags and combines them into an array of all selected options.
// also checks to make sure that there aren't any duplicate selections.
function tabulate() {

    $("#ingList").empty();
    $("#ingList").html("<h4>Your current list:</h4>");

    completedList = [];

    $("#pantry").find("select").each(function(index, select){
        completedList.push($(select).find(":selected").text())
    });

    createList();

    localStorage.clear();

    localStorage.setItem("completedList", JSON.stringify(completedList));


}

// takes our working list of items and creates a current ingredient list for the user to see.
function createList() {

    for (var i = 0; i < completedList.length; i++) {
        var ingDiv = $("<div>");
        var listDel = $("<button class='listDelete'>");

        ingDiv.html(completedList[i]);
        listDel.attr("data-list-number", i);
        listDel.text("X");
        ingDiv.append(listDel);
        $("#ingList").append(ingDiv);
    }

    $("#ingList").css("visibility", "visible");
}