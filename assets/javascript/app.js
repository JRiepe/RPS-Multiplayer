//-----------------------------------------------------------------------------------------------
//      Javascript / Firebase RPS Game
//------------------------------------------------------------------------------------------------

// Link to Firebase (YOUR OWN APP)
$(document).ready(function(){
            

            var url = "https://jriepeweek07.firebaseio.com/";
            var gameData = new Firebase(url);

            // Initial Values

            var snapshot;
            var comment;
            var yourName;
            var yourPlayer;
            var opponentName;
            var p1Name;
            var p2Name;

            var p1Wins = 0;
            var p2Wins = 0;
            var p1Losses = 0;
            var p2Losses = 0;

            var p1Comment;
            var p2Comment;
            var localData;

            

            gameData.orderByChild("player").equalTo(1).on("child_added", function(snapshot) {
            
                p1Name = snapshot.val().name;
                p1Wins = snapshot.val().wins;
                p1Losses = snapshot.val().losses;
                $('#p1Info').html('<br>' + p1Name + '<br>Wins: ' + p1Wins + '<br>Losses: ' + p1Losses);
            });
            gameData.orderByChild("player").equalTo(2).on("child_added", function(snapshot) {
                $("#nameBox").html("");
                p2Name = snapshot.val().name;
                p2Wins = snapshot.val().wins;
                p2Losses = snapshot.val().losses;
                $('#p2Info').html('<br>' + p2Name + '<br>Wins: ' + p2Wins + '<br>Losses: ' + p2Losses);
            });
                
                
             gameData.on("value", function(snapshot) {   
                console.log(snapshot.val());
                localData = snapshot.val();

            }, function (errorObject) {
                //console.log("The read failed: " + errorObject.code);
            });


            $("#addPlayer").on("click", function() {
                yourName = $('#nameInput').val().trim();
                
                //var a = localData;
                //var b = localData.numChildren();
                //var c = 
                //console.log('a: ' + a);
                //console.log('b: ' + b);
                //console.log('c: ' + c)
               
                if (localData === null) {
                    yourPlayer = 1;
                    p1Name = yourName;
                    //console.log('p1Name: ' + p1Name);
                    gameData.push({
                        player: yourPlayer,
                        name: p1Name,
                        wins: p1Wins,
                        losses: p1Losses
                         
                    });
                    //console.log(ref.key());
                    //$('#p1Info').html('<br>' + p1Name + '<br>Wins: ' + p1Wins + '<br>Losses: ' + p1Losses);
                    return false;
                }
                else if (localData !== null && localData.player !== 2) {
                    yourPlayer = 2;
                    p2Name = yourName;
                    //console.log('p2Name: ' + p2Name);
                    gameData.push({
                        player: yourPlayer, 
                        name: p2Name,
                        wins: p2Wins,
                        losses: p2Losses
                          
                    });
                    //$('#p2Info').html('<br>' + p2Name + '<br>' + 'Wins: ' + p2Wins + 'Losses: ' + p2Losses);
                }
                
                else {
                    alert("I'm sorry, the game is full. Please try again later!");
                } 



              // Alert User and reset the counter
              


                return false;

              
            });

            // Whenever a user clicks the restart button
            $("#resetButton").on("click", function() {

              // clear out saved data
                    gameData.set(null);
                    $('#p1Info').html('');
                    $('#p2Info').html('');
                    $("#nameBox").html('<form id="nameForm">');
                    $("#nameBox").append('<label for="nameInput">Enter your Name: </label>');
                    $("#nameBox").append('<input type="text" id="nameInput"><br><br>');
                    $("#nameBox").append('<input id="addPlayer" type="submit" value="Enter">');
                    $("#nameBox").append('</form>');
             }) 
            // End logic with Firebase

 


}); // end $(document).ready(function() { 


