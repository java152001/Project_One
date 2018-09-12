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


function recSearch(options) {
  var url = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/recipes/search?number=" + options.limit + "&query=" + options.query.join('+') + "&diet=" + options.diet + "&intolerances=" + options.allergy;
  
  console.log(url);
  
  return $.ajax({
    url: url,
    headers: mashapeHeaders
  }).then(function(res) {
    // var getCalls = [];
    // for(var r = 0; r < res.results.length; r++) {
    //   getCalls.push(getRecipe(res.results[i].id));
    // }
    
     var getCalls = res.results.map(function(rec) {
       return getRecipe(rec.id);
     });
    //getCalls = [ajaxPromise, ajaxPromise, ajaxPromise]
    
    return $.when.apply($, getCalls);
    //$.when(getCalls[0], getCalls[1], etc.)
    
  });
}
var isVege = "vegetarian"; //this should come from input from checkbox $('#checkbox').val()
var isAllergic = "dairy";
var localStorageData = ['noodles', 'tomato'];

recSearch({
  query: localStorageData,
  limit: 1,
  diet: isVege,
  allergy: isAllergic,
  
}).done(function() {
  
  for(var r = 0; r < arguments.length; r++) {
    if(arguments[r].hasOwnProperty('id')) {
      console.log(arguments[r]);
    }
  }
})

// function test() {
//   for(var n = 0; n < arguments.length; n++) {
//     console.log(arguments[n]);
//   }
// }

// test(3, 5, 2, 'blah');



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
