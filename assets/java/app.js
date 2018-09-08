var ingredients = ["--Meats--", "Beef", "Chicken", "Fish", "--Vegetables--", "Carrots", "Mushroom", "Onion", "Milk", "Broth"];
var ingredientNumber = 0;

var completedList = [];

var uniqueList = [];


// brings in list from local storage
completedList = JSON.parse(localStorage.getItem("completedList"));

// checks to see if there is anything in the array and if so generate our current list
if (completedList.length !== 0) {
    $("#ingList").html("<h4>Your current list:</h4>");

    createList();
} 



// generates a new selection entry on the page
$("#add").on("click", function() {
    addNew();
    console.log('clicked');
});

// removes the select option when the X button is clicked
$(document).on("click", "button.delete", function() {
    var currentItem = $(this).attr('data-number');

    $("#pantry").find("[data-ingredient-number='" + currentItem + "']").remove();

});

// removes from the current list and local storage
$("#ingList").on("click", "button.listDelete", function() {
    var currentDelete = $(this).attr('data-list-number');

    uniqueList.splice(currentDelete, 1);
    completedList.splice(currentDelete, 1);

    $("#ingList").empty();
    $("#ingList").html("<h4>Your current list:</h4>");

    createList();
})

// tabulates all the current selections into an array and stores that array in local storage
$("#submit").on("click", tabulate);

function addNew() {

    var newDiv = $("<div>");

    var newLine = $("<select>");
    // newLine.attr("data-ingredient-number", ingredientNumber);
    var newOption;
    var newButton = $("<button class='delete'>");
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
        newDiv.attr("data-ingredient-number", ingredientNumber);
        newButton.attr("data-number", ingredientNumber);
        newButton.text("X");
        // quantity.attr("value", "qty");
        // newDiv.append(quantity);
        newDiv.append(newButton);

    }

    $("#pantry").append(newDiv);

    ingredientNumber++;
}


// takes all of our existing select tags and combines them into an array of all selected options.
// also checks to make sure that there aren't any duplicate selections.
function tabulate() {

    $("#ingList").empty();
    $("#ingList").html("<h4>Your current list:</h4>");

    $("#pantry").find("select").each(function(index, select){
        completedList.push($(select).find(":selected").text())
    });

    createList();



}

// takes our working list of items and creates a current ingredient list for the user to see.
function createList() {

    // removeDups();

    $.each(completedList, function(i, el){
        if($.inArray(el, uniqueList) === -1) {
            uniqueList.push(el);
        }
    });

    for (var i = 0; i < uniqueList.length; i++) {
        var ingDiv = $("<div>");
        var listDel = $("<button class='listDelete'>");

        ingDiv.html(uniqueList[i]);
        listDel.attr("data-list-number", i);
        listDel.text("X");
        ingDiv.append(listDel);
        $("#ingList").append(ingDiv);
    }

    $("#ingList").css("visibility", "visible");

    localStorage.clear();

    localStorage.setItem("completedList", JSON.stringify(uniqueList));
}

// function removeDups() {
        
//         for (var i = 0; i < completedList.length; i++){
//             if (unique_array.indexOf(completedList) == -1) {
//                 unique_array.push(completedList[i]);
//             }
//         }
//     }
