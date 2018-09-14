var ingredients = ["--Meats--", "Beef", "Chicken", "Fish", "--Vegetables--", "Carrots", "Mushroom", "Onion", "Milk", "Broth"];
var ingredientNumber = 0;

// var completedList = [];

var uniqueList = [];


// brings in list from local storage
completedList = JSON.parse(localStorage.getItem("completedList"));

// checks to see if there is anything in the array and if so generate our current list
// // if (completedList.length !== 0) {
//     $("#ingList").html("<h4>Your current list:</h4>");

//     createList();
// } 
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

    $(".pantry").append(newDiv);

    ingredientNumber++;
}



///////////////////////////////////////////////////////////////////////
// recipe stuff below this line

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

// end recipes from benjamin
////////////////////////////////////////////////////////////////



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
        var ingDiv = $("<div>");
        var listDel = $("<button class='listDelete'>");

        ingDiv.html(uniqueList[i]);
        listDel.attr("data-list-number", i);
        listDel.text("X");
        ingDiv.append(listDel);
        $("#ingList").append(ingDiv);
    }

    console.log(uniqueList);

    localStorage.clear();

    localStorage.setItem("completedList", JSON.stringify(uniqueList));
}

$("#getCard").on("click", function() {

    var isVege = "";

if ($("#dietInput").val() === "vegTrue") {
    isVege = '&diet=vegetarian';
}
else {
    isVege = "";
}

console.log(isVege);

var isAllergic = $("#allergyInput").val(); //fill in from drop down from all the allergies

if (isAllergic === "none") {
    isAllergic = "";
}
else {
    isAllergic = "&intolerances=" + isAllergic;
}

console.log(isAllergic);

$('.recipe').find('.card').remove();

recSearch({
  query: uniqueList,
  limit: 3,
  diet: isVege,
  allergy: isAllergic,
  
}).done(function(response) {
  
  for(var r = 0; r < arguments.length; r++) {
    if(arguments[r][0].hasOwnProperty('id')) {
    // for(var r = 0; r < 3; r++) {
      console.log(response);
      cardGenerate(arguments[r][0].image, arguments[r][0].title, arguments[r][0].spoonacularSourceUrl);
    }
    }
//   }
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
    console.log(cardTitle);
    console.log(cardBody);

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

// var map, infoWindow;

// function initMap() {
//   map = new google.maps.Map($('.map'), {
//     center: {lat: 37.697948, lng:  -110.95488979999999},
//     zoom: 3
//   });
//   infoWindow = new google.maps.InfoWindow;

//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(function(position) {
//       var pos = {
//         lat: position.coords.latitude,
//         lng: position.coords.longitude
//       };

//       infoWindow.setPosition(pos);
//       infoWindow.setContent('Location found.');
//       infoWindow.open(map);
//       map.setCenter(pos);
//       map.setZoom(15);
//     }, function() {
//       handleLocationError(true, infoWindow, map.getCenter());
//     });
//   } else {
//     // Browser doesn't support Geolocation
//     handleLocationError(false, infoWindow, map.getCenter());
//   }
// }

// function handleLocationError(browserHasGeolocation, infoWindow, pos) {
//   infoWindow.setPosition(pos);
//   infoWindow.setContent(browserHasGeolocation ?
//                         'Error: The Geolocation service failed.' :
//                         'Error: Your browser doesn\'t support geolocation.');
//   infoWindow.open(map);
// }