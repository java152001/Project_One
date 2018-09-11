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

var mashapeHeaders = {
      'X-Mashape-Key': 'dsGw9nFi65mshhHVvLGFzWY0BbPNp1byJ6njsnmw61a6HHSCw3'
};

function getRecipe(id) {
  return $.ajax({
    url: 'https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/' + id + '/information/',
    headers: mashapeHeaders
  });
}


function recSearch(queries, limit) {
  var url = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?number=" + limit + "&query=" + queries.join(' ');
  
  console.log(url);
  
  return $.ajax({
    url: url,
    headers: mashapeHeaders
  }).then(function(response) {
     var getCalls = response.results.map(function(rec) {
       return getRecipe(rec.id);
     });
    
    return $.when.apply($, getCalls);
    //$.when(getCalls[0], getCalls[1], etc.)
    
    // just to show the apply in action 
    // getRecipe.apply(getRecipe, [234523, 223402830]);
    // getRecipe(234523, 223402830);
    
  });
}
// do not "uncomment" below this for the recSearch function unless you want to run the ajax call
// we ARE LIMITED TO 50 CALLS PER DAY


// recSearch(['noodles', 'tomato[NEED HELP]'], 3).done(function() {
//   for(var r = 0; r < arguments.length; r++) {
//     if(arguments[r].hasOwnProperty('id')) {
//       console.log(arguments[r].readyInMinutes);
//       console.log(arguments[r].title);
//       console.log(arguments[r].imageURLs)
//        above this is where we would want to print to the page or change dom hmtl with the output from the ajax calls
//        example >>>>>>> $('body').html(arguments[r].readyInMinutes) or wtvr element # you want filled in to print to page
//     }
//   }
// })



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
