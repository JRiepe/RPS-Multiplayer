//-----------------------------------------------------------------------------------------------
//      Javascript / Firebase RPS Game
//------------------------------------------------------------------------------------------------

// Link to Firebase (YOUR OWN APP)
$(document).ready(function(){
            

            var url1 = "https://jriepe-rps-players.firebaseio.com/";
            var url2 = "https://jriepe-rps-turns.firebaseio.com/";
            var url3 = "https://jriepe-rps-comments.firebaseio.com/";

            var gameData = new Firebase(url1);
            var gameTurns = new Firebase(url2);
            var gameComments = new Firebase(url3);
            
            var pSnapshot;
            var tSnapshot;
            var cSnapshot;

            
            var yourName;
            var yourPlayer;
            var opponentName;
            var p1Num;
            var p2Num;
            var p1Name;
            var p2Name;
            var p1Wins = 0;
            var p2Wins = 0;
            var p1Losses = 0;
            var p2Losses = 0;
            var p1Choice = "";
            var p2Choice = "";
            var playerTurn = 1;
            var userComments = "";
            
            var localData = "";

            
            

            gameData.orderByChild("pnumber").equalTo(1).on("child_added", function(pSnapshot) {
                
                p1Num = pSnapshot.val().pnumber;
                console.log('p1Num: '+p1Num);
                p1Name = pSnapshot.val().name;

                p1Wins = pSnapshot.val().wins;
                
                p1Losses = pSnapshot.val().losses;
                
                p1Choice = pSnapshot.val().choice;
                
                $('#p1Name').html('<br>' + p1Name);
                $('#p1Buttons').html('');
                $('#p1Score').html('<br>Wins: ' + p1Wins + '  Losses: ' + p1Losses);



            });
            gameData.orderByChild("pnumber").equalTo(2).on("child_added", function(pSnapshot) {
                $("#nameBox").html("");
                console.log('Snap: '+pSnapshot.val())
                p2Num = pSnapshot.val().pnumber;
              
                p2Name = pSnapshot.val().name;

                p2Wins = pSnapshot.val().wins;
                
                p2Losses = pSnapshot.val().losses;

                p2Choice = pSnapshot.val().choice;

                $('#p2Name').html('<br>' + p2Name);
                $('#p2Buttons').html('');
                $('#p2Score').html('<br>Wins: ' + p2Wins + '  Losses: ' + p2Losses);

            });
                
                
            gameData.on("value", function(pSnapshot) {   
                console.log(pSnapshot.val());
                localData = pSnapshot.val();

            }, function (errorObject) {
                //console.log("The read failed: " + errorObject.code);
            });


            $(document).on("click", "#addPlayer", function() {
                yourName = $('#nameInput').val().trim();
                
               
                if (localData === null) {
                    yourPlayer = 1;
                    p1Name = yourName;
                    //console.log('p1Name: ' + p1Name);
                    
                    gameTurns.set({
                        turn: playerTurn
                        
                    });

                    gameComments.push({
                        comments: userComments
                    });
                    
                    gameData.push({
                            pnumber: yourPlayer,
                            name: p1Name,
                            wins: p1Wins,
                            losses: p1Losses,
                            choice: p1Choice
                        
                     });    
                    
                    $("#nameBox").html("");
                    //console.log(ref.key());
                    //$('#p1Info').html('<br>' + p1Name + '<br>Wins: ' + p1Wins + '<br>Losses: ' + p1Losses);
                    return false;
                }
                else if (localData !== null && localData.pnumber != 2) {
                    yourPlayer = 2;
                    p2Name = yourName;
                    //console.log('p2Name: ' + p2Name);
                    gameTurns.set({
                        turn: playerTurn
                        
                    });

                    gameComments.push({
                        comments: userComments
                    });
                    
                    gameData.push({
                            pnumber: yourPlayer,
                            name: p2Name,
                            wins: p2Wins,
                            losses: p2Losses,
                            choice: p2Choice
                        
                     });    
                    //$('#p2Info').html('<br>' + p2Name + '<br>' + 'Wins: ' + p2Wins + 'Losses: ' + p2Losses);
                }
                else    {
                    alert('Sorry, already two players. Please try again later!')
                }

                return false;

              
            });

            // on click press rock button
            $(document).on("click", "#rockButton", function() {
                if (playerTurn === 1 && yourPlayer === 1) {

                }
            }); // end $("#rockButton").on("click"
            
            // on click press paper button
            $(document).on("click", "#paperButton", function() {

            }); // end $("#paperButton").on("click"

            // on click press scissors button
            $(document).on("click", "#scissorsButton", function() {

            }); // end $("#scissorsButton").on("click"


            // Whenever a user clicks the restart-reset button
            $(document).on("click", "#resetButton", function() {
                    
                    //gameData.orderByChild("name").equalTo(yourName).set(null);
                        

            
                    //}
                    // clears firebase data
                    gameData.set(null); 
                    location.reload();
                    // below redraws name input form to play again!
                   /* $('#p1Info').html('');
                    $('#p2Info').html('');
                    $("#nameBox").html('<form id="nameForm">');
                    $("#nameBox").append('<label for="nameInput">Enter your Name: </label>');
                    $("#nameBox").append('<input type="text" id="nameInput"><br><br>');
                    $("#nameBox").append('<input id="addPlayer" type="submit" value="Enter">');
                    $("#nameBox").append('</form>'); */
             
             }) // end $("#resetButton").on("click"...
            
 


}); // end $(document).ready(function() { 


