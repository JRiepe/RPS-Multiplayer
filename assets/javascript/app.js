//-----------------------------------------------------------------------------------------------
//      Javascript / Firebase RPS Game
//------------------------------------------------------------------------------------------------


$(document).ready(function(){
            
        // Link to Firebase (YOUR OWN APP)

            var url1 = "https://jriepe-rps-players.firebaseio.com/";
            var url2 = "https://jriepe-rps-turns.firebaseio.com/";
            var url3 = "https://jriepe-rps-comments.firebaseio.com/";

        // Initialize variables

            var gameData = new Firebase(url1);
            var gameTurns = new Firebase(url2);
            var gameComments = new Firebase(url3);
           
            var pSnapshot;
            var tSnapshot;
            var cSnapshot;

            
            var yourName = "";
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
            var localComments = "";
            var localTurns = "";
            
        // changes data in boxes for player = 1

            gameData.orderByChild("pnumber").equalTo(1).on("child_added", function(pSnapshot) {
                
                p1Num = pSnapshot.val().pnumber;
                
                p1Name = pSnapshot.val().name;

                p1Wins = pSnapshot.val().wins;
                
                p1Losses = pSnapshot.val().losses;
                
                p1Choice = pSnapshot.val().choice;
                
                $('#p1Name').html('<br>' + p1Name);
                $('#p1Buttons').html('');
                $('#p1Score').html('<br>Wins: ' + p1Wins + '  Losses: ' + p1Losses);

            });
            

        // changes data in boxes for player = 2

            gameData.orderByChild("pnumber").equalTo(2).on("child_added", function(pSnapshot) {
                $("#nameBox").html("");
                
                p2Num = pSnapshot.val().pnumber;
              
                p2Name = pSnapshot.val().name;

                p2Wins = pSnapshot.val().wins;
                
                p2Losses = pSnapshot.val().losses;

                p2Choice = pSnapshot.val().choice;

                $('#p2Name').html('<br>' + p2Name);
                $('#p2Buttons').html('');
                $('#p2Score').html('<br>Wins: ' + p2Wins + '  Losses: ' + p2Losses);

            });
                
        // updates comments/smack talk every time a comment is made

            gameComments.on("child_added", function(cSnapshot) {
                localComments = cSnapshot.val().comments;
                
                $("#commentBox").append(localComments + '<br>');
                //$('#commentBox').scrollTop($('#commentsBox')[0].scrollHeight);
                //$("#commentBox").animate({ scrollTop: $("#commentBox").attr("scrollHeight") - $('#commentBox').height() }, 3000);
 

            })

        // when a value changes in player game data, we change that data locally

            gameData.on("value", function(pSnapshot) {   
                console.log(pSnapshot.val());
                localData = pSnapshot.val();

            }, function (errorObject) {
                //console.log("The read failed: " + errorObject.code);
            });
            
            

            gameTurns.on("value", function(tSnapshot) {   
                
                if (tSnapshot.val() == null) {
                    localTurns.turns = 1;
                } // end if
                else {
                    localTurns = tSnapshot.val();
                  
                    console.log('localTurns.turn: '+localTurns.turn+', yourPlayer: '+yourPlayer+', yourName: '+yourName);
                    $("#infoBox2").html("Player "+localTurns.turn+"'s move!")
                    if (yourPlayer == 1 && localTurns.turn == 1 ) {
                            drawPlayer1();
                        } // end if (localTurns.turn == 1)
                    else if (yourPlayer == 2 && localTurns.turn == 2 ) {
                            drawPlayer2();
                        } // end else if
                } // end else
            });   

           

// ON CLICK FUNCTIONS

        // on click function for add comment

            $(document).on("click", "#addComment", function() {
                userComments = $("#commentInput").val().trim();
                userComments = yourName + ": " + userComments;
                if (yourName != "") {
                    console.log(yourName);
                    gameComments.push({
                           comments: userComments
                        });
                }
                else {
                    alert("Sorry, but only active participants can make comments!");
                }
                return false;
            })

        // on click function for adding player(s)

            $(document).on("click", "#addPlayer", function() {
                yourName = $('#nameInput').val().trim();
                
            // if empty then assign player 1

                if (localData === null) {
                    yourPlayer = 1;
                    p1Name = yourName;
                    $('#infoBox1').html("Welcome, "+yourName+". You are Player 1")
                    
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
                    
                    return false;
                }

            // if not empty and not greater than or equal to 2
                else if (localData !== null && localData.pnumber != 2) {
                    yourPlayer = 2;
                    p2Name = yourName;
                    $('#infoBox1').html("Welcome, "+yourName+". You are Player 2")
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
                    
                }
                else    {
                    alert('Sorry, already two players. Please try again later!')
                    
                }

                return false;

              
            }); // end $(document).on("click", "#addPlayer", function()

        // on click press rock button
            
            $(document).on("click", "#rockButton", function() {
                if (playerTurn == 1 && yourPlayer == 1) {

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
                    gameComments.set(null);
                    gameTurns.set(null); 
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
            
// FUNCTIONS


// Functions drawplayer1 and drawPlayer2

    function drawPlayer1() {
            $('#p2Buttons').html('Awaiting Player 1');
            $('#p1Buttons').html('<button id="rockButton">Rock</Button><br>');
            $('#p1Buttons').append('<button id="paperButton">Paper</Button><br>');
            $('#p1Buttons').append('<button id="paperButton">Scissors</Button><br>');

    } // end function drawPlayer1()

    function drawPlayer2() {
            $('#p1Buttons').html('Awaiting Player 2');
            $('#p2Buttons').html('<button id="rockButton">Rock</Button><br>');
            $('#p2Buttons').append('<button id="paperButton">Paper</Button><br>');
            $('#p2Buttons').append('<button id="paperButton">Scissors</Button><br>');

    } // end function drawPlayer2()


    function gameLogic() {

    } // end function gameLogic()




}); // end $(document).ready(function() 


