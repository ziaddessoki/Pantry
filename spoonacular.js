// constructing a queryURL variable we will use instead of the literal string inside of the ajax method
        var queryURL = "https://api.spoonacular.com/recipes/findByIngredients?ingredients=" + "apples," + "+flour," + "+sugar," +  "+cinnamon," + "+oats" + "&number=2&" + apiKey;
    
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {
          console.log(response);
        //   console.log(response.Runtime);
        });