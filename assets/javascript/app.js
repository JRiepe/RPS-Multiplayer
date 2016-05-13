  // Link to Firebase (YOUR OWN APP)
var clickData = new Firebase("https://this-old-app.firebaseio.com/");

// Use the below Initial Value 
var initialValue = 100;

// Use the below variable clickCounter to keep track of the clicks.
var clickCounter = initialValue;  

// --------------------------------------------------------------

// At the initial load, get a snapshot of the current data. (I.E FIREBASE HERE)
// HINT: Use 

firebaseLink.on("value", function(snapshot)) {
    console.log(snapshot.val());
    initialValue = snapshot.val();

    clickCounter = snapshot.val().clickCount;
    $("#clickValue").html(snapshot.val().clickCount);
} function (errorObject) {
    console.log("The read failed: " + errorObject.code);

// Inside your .on function...
  
  //  ok-Console.log the initial "snapshot" value (the object itself)


  // ok-Change the initial value to reflect the initial value in Firebase
  // HINT: snapshot.val().__________


  // ok-Change the value of your clickCounter to match the value in the database
  // ___________ = snapshot.val().______________________


  // ok-Change the HTML using jquery to reflect the updated clickCounter value
  

// Then include Firebase error logging
// HINT: }, function(errorObject) 

// --------------------------------------------------------------

// Whenever a user clicks the click button
$("#clickButton").on("click", function() {

  // Reduce the clickCounter by 1
  clickCounter--;

  // Alert User and reset the counter
  if (clickCounter == 0 ) {
    alert("Phew! You made it! That sure was a lot of clicking.");
    clickCounter = initialValue;
  }

  // Save new value to Firebase
    clickData.set({
        clickCount: clickCounter
      });


  // Log the value of clickCounter
  console.log(clickCounter);

});

// Whenever a user clicks the restart button
$("#restartButton").on("click", function() {

  // Set the clickCounter back to initialValue
  clickCounter = initialValue;
  
  // Save new value to Firebase
  clickData.set({
      clickCount: clickCounter
    });



  // Log the value of clickCounter
  console.log(clickCounter);

  // Change the HTML Values
  $('#clickValue').html(clickCounter);


});

// End logic with Firebase

//-----------------------------------------------------------------------------------------------
//      Javascript AnimalTastic Game
//------------------------------------------------------------------------------------------------


    function startProgram(){
        $('#buttonCol').empty();
        var animals = ["dog", "cat", "horse", "whale", "dolphin", "fox", "wolf", "tiger", "elephant"];
        buttonGenerator();

//-----------------------------------------------------------------------------------------------
//         Functions buttonGenerator() adds animal buttons to page
//-----------------------------------------------------------------------------------------------
     

        function buttonGenerator() {
              $('#buttonCol').empty();
              console.log(animals);
              var i=0;
              for (i=0;i<animals.length;i++)  {
                  var a = $('<button>'); // This code $('<button>') is all jQuery needs to create the beginning and end tag. (<button></button>)
                  a.addClass('aniButton'); // Added a class 
                  a.attr('data-name', animals[i]); // Added a data-attribute
                  a.text(animals[i]); // Provided the initial button text
                  $('#buttonCol').append(a); // Added the button to the HTML
                  
              } // end for loop

        }
        
        
                

//-----------------------------------------------------------------------------------------------
//         On click Functions:
//-----------------------------------------------------------------------------------------------

//-----------------------------------------------------------------------------------------------               
// click submit to add animal to array and regenerate buttons
//-----------------------------------------------------------------------------------------------

              

                $('#addAnimal').on('click', function(){
                        
                        var newAnimal=$('#animal-input').val().trim();
                        animals.push(newAnimal);
                        buttonGenerator();
                        return false;
                        

                }); // end $('#addAnimal').on('click', function()





//-----------------------------------------------------------------------------------------------               
// click animal button to show images of chosen animal
//-----------------------------------------------------------------------------------------------

                $(document).on('click', '.aniButton', function(){
                
                          var animal = $(this).attr('data-name');
                          var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10";
                          $('#animalRow').empty();
                              // Creates AJAX call for the specific movie being 
                              $.ajax({url: queryURL, method: 'GET'}).done(function(response) {
                                      var results = response.data;
                                      for (var i = 0; i < results.length; i++) {

                                          var p = $('<p>').text('Rating: ' + results[i].rating);

                                          var animalImg = $('<img>').attr('src',results[i].images.fixed_height_still.url);
                                          
                                          animalImg.addClass('animalImage');
                                          animalImg.attr('data-still', results[i].images.fixed_height_still.url);
                                          animalImg.attr('data-animate', results[i].images.fixed_height.url);
                                          animalImg.attr('data-state','still');
                  
                                          $('#animalRow').append('<hr>').append(p).append(animalImg);
                                          
                                      }
                                 
                              }); 

                            

                }); // end $('.aniButton').on('click', function()




//-----------------------------------------------------------------------------------------------               
// click on image to animate or de-animate
//-----------------------------------------------------------------------------------------------

                  $(document).on('click', '.animalImage', function(){
                 
                    
                        var state = $(this).attr("data-state");
                        
                        if (state == 'still') {
                            $(this).attr('src',$(this).attr('data-animate'));
                            $(this).attr('data-state','animate');
                            
                        }

                        else  {
                            $(this).attr('src',$(this).attr('data-still'));
                            $(this).attr('data-state','still');
                            
                        }
                        
                        
                });    // end $('.animalImage').on('click', function() 
    
                                      

}  //end function startProgram()

