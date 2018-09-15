var ingredients = ["--Meats--", "Beef", "Chicken", "Fish", "Turkey", "Pork", "--Vegetables--", "Carrots", "Mushroom", "Onion", "Potato", "Spinach", "--Liquids--", "Milk", "Chicken Stock", "--Spices--", "Salt", "Pepper", "Garlic Powder", "Onion Powder", "Cumin"];
var ingredientNumber = 0;

// var completedList = [];

var uniqueList = [];

// Hamburger button(pulls recipe cards)
$(document).ready(function () {
    $("#btn").click(function () {
    $(".card-deck").toggle();
});
});


// brings in list from local storage
completedList = JSON.parse(localStorage.getItem("completedList"));

// checks to see if there is anything in local storage and if so creates ingredient list.
if (!Array.isArray(completedList)) {
    completedList = [];
  }
else {
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

    $(".pantry").find("[data-ingredient-number='" + currentItem + "']").remove();

});

// removes from the current list and local storage
$("#ingList").on("click", "button.listDelete", function() {
    var currentDelete = $(this).attr('data-ingredient');

    console.log(currentDelete);

    completedList = completedList.filter(a => a !== currentDelete);

    for(var i = uniqueList.length - 1; i >= 0; i--) {
        if(uniqueList[i] === currentDelete) {
           uniqueList.splice(i, 1);
        }
    }

    $("#ingList").empty();
    $("#ingList").html("<h4>Your current list:</h4>");

    createList();
})

// tabulates all the current selections into an array and stores that array in local storage
$("#submit").on("click", tabulate);

function addNew() {

    var newDiv = $("<div>");

    var newLine = $("<select>");
    var newOption;
    var newButton = $("<button class='delete'> ");

    for (var i = 0; i < ingredients.length; i++) {

        newOption = $("<option>");

        // checks to see if the option should be a grouping or actual option
        if (ingredients[i] !== "--Meats--" && ingredients[i] !== "--Vegetables--" && ingredients[i] !== "--Liquids--" && ingredients[i] !== "--Spices--") {
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
        newDiv.append(newButton);

    }

    $(".pantry").append(newDiv);

    ingredientNumber++;
}

// AJAX call function for us to search ingredient API
var mashapeHeaders = {
      'X-Mashape-Key': 'dsGw9nFi65mshhHVvLGFzWY0BbPNp1byJ6njsnmw61a6HHSCw3'
};

function getRecipe(id) {
  return $.ajax({
    url: 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/' + id + '/information/',
    headers: mashapeHeaders
  });
}


function recSearch(options) {
  var url = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?number=" + 
  options.limit + "&query=" + options.query.join('+') + options.diet + options.allergy;
  
  console.log(url);
  
  return $.ajax({
    url: url,
    headers: mashapeHeaders
  }).then(function(res) {
     var getCalls = res.results.map(function(rec) {
       return getRecipe(rec.id);
     });
    
    return $.when.apply($, getCalls);
    
  });
}

// takes all of our existing select tags and combines them into an array of all selected options.
// also checks to make sure that there aren't any duplicate selections.
function tabulate() {

    $("#ingList").empty();
    $("#ingList").html("<h4>Your current list:</h4>");

    $(".pantry").find("select").each(function(index, select){
        completedList.push($(select).find(":selected").text())
    });

    createList();

}

// takes our working list of items and creates a current ingredient list for the user to see.
function createList() { 

    $.each(completedList, function(i, el){
        if($.inArray(el, uniqueList) === -1) {
            uniqueList.push(el);
        }
    });

    for (var i = 0; i < uniqueList.length; i++) {
        var ingDiv = $("<div style='float: left; width: 65%'>");
        var buttonDiv = $("<div style='float: left; width: 10%'>");
        var listDel = $("<button class='listDelete'>");

        ingDiv.html(uniqueList[i]);
        listDel.attr("data-ingredient", uniqueList[i]);
        listDel.text("X");
        buttonDiv.html(listDel);
        // ingDiv.append(buttonDiv);
        $("#ingList").append(ingDiv);
        $("#ingList").append(buttonDiv);
    }

    console.log(uniqueList);

    localStorage.clear();

    localStorage.setItem("completedList", JSON.stringify(uniqueList));
}

// Builds the final search query string and pushes response data to function to generate recipe cards
$("#getCard").on("click", function() {

    var isVege = "";

if ($("#dietInput").val() === "vegTrue") {
    isVege = '&diet=vegetarian';
}
else {
    isVege = "";
}

var isAllergic = $("#allergyInput").val(); //fill in from drop down from all the allergies

if (isAllergic === "none") {
    isAllergic = "";
}
else {
    isAllergic = "&intolerances=" + isAllergic;
}

$('.recipe').find('.card').remove();

recSearch({
  query: uniqueList,
  limit: 3,
  diet: isVege,
  allergy: isAllergic,
  
}).done(function(response) {
  
  for(var r = 0; r < arguments.length; r++) {
    if(arguments[r][0].hasOwnProperty('id')) {
      console.log(response);
      cardGenerate(arguments[r][0].image, arguments[r][0].title, arguments[r][0].spoonacularSourceUrl);
    }
    }

})

});

// function to generate the cards for the recipes
function cardGenerate(image, title, link) {

    var cardDiv = $("<div class='card box'>");
    var cardBody = $("<div class='card-body'>");
    var cardImage = $("<img class='card-img-top'>");
    var recipeButton = $("<button class='recipeButton'>")
    cardImage.attr("src", image);

    var cardTitle = "<h5 class='card-title'>" + title + "</h5>";
    recipeButton.attr('data-value-link', link);
    recipeButton.text("Go to Recipe!");

    cardDiv.html(cardTitle);
    cardDiv.append(cardImage);
    cardBody.html(recipeButton);
    cardDiv.append(cardBody);

    $(".recipe").append(cardDiv);
}

// on click event to determine which recipe button was clicked and open a new window accordingly
$(document).on("click", "button.recipeButton", function() {
    var recipeLink = $(this).attr('data-value-link');
    window.open(recipeLink);
})

// displays the Map after calculating location and nearest supermarkets
$(document).on("click", "button#getDirections", function() {
    $(".maps").css("visibility", "visible");

});
