var ingredients = ["Beef", "Chicken", "Fish", "Carrots", "Mushroom", "Onion", "Milk", "Broth"];

function addNew() {
    var select = $("<select>");
    var option = $("<option>");

    for (var i = 0; i < ingredients.length; i++) {
        
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

// function giphy() {
//     // Creating, Grabbing, and storing the data-topicName property value from the button
//     var topicName = JSON.stringify($(this).attr("data-name"));

//     // Constructing a queryURL using the topic name
//     var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
//       topicName + "&api_key=dc6zaTOxFJmzC&limit=10";

//     // Performing an AJAX request with the queryURL
//     $.ajax({
//       url: queryURL,
//       method: "GET"
//     })
//       // After data comes back from the request
//       .then(function(response) {
//         console.log(queryURL);

//         console.log(response);
//         // storing the data from the AJAX request in the results variable
//         var results = response.data;

//         console.log(results)
//         // Looping through each result item
//         for (var i = 0; i < results.length; i++) {

//           // Creating and storing a div tag
//           var gifsDiv = $("<div>");

//           // Creating a paragraph tag with the result item's rating
//           var p = $("<p>").text("Rating: " + results[i].rating);

//           // Creating and storing an image tag
//           var gifsImage = $("<img class='gif' data-state>");
//           // Setting the src attribute of the image to a property pulled off the result item
//           gifsImage.attr("src", results[i].images.fixed_height_still.url);
//           // setting the alt to the appropriate name in case image dont load
//           gifsImage.attr("alt", topicName);
//           // adding attr to gif img
//           gifsImage.attr("data-state", "still");
//           //creating data-still and data-animate attributes one the gifsimage image for later use   
//           gifsImage.attr("data-still", results[i].images.fixed_height_still.url)
//           gifsImage.attr("data-animate", results[i].images.fixed_height.url)
//           // Appending the paragraph and image tag to the gifsDiv
//           gifsDiv.append(gifsImage);
//           gifsDiv.append(p);

//           // Prependng the gifsDiv to the HTML page in the "#gifsDiv" div
//           $("#gifsDiv").prepend(gifsDiv);
//         }

//         $(".gif").on("click", function() {
//             // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
//             var state = $(this).attr("data-state");

//             if (state === "still") {
//               $(this).attr("src", $(this).attr("data-animate"));
//               $(this).attr("data-state", "animate");
//             } else {
//               $(this).attr("src", $(this).attr("data-still"));
//               $(this).attr("data-state", "still");
//             }
//           });
//       });
//   };

//   $(document).on("click", ".topicsClass", giphy);