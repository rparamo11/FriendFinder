//POST route/ Load Data
var friendsList = require('../data/friends.js');

module.exports = function(app){
  //GET route 
  app.get('/api/friends', function(req,res){
    res.json(friendsList);
  });

  app.post('/api/friends', function(req,res){

    var newFriendScores = req.body.scores;
    var scoresArray = [];
    var friendCount = 0;
    var bestMatch = 0;

    //A loop that runs through all friends list. 
    for(var i=0; i<friendsList.length; i++){
      var scoresDiff = 0;
      //Loop that rouns throug scores
      for(var j=0; j<newFriendScores.length; j++){
        scoresDiff += (Math.abs(parseInt(friendsList[i].scores[j]) - parseInt(newFriendScores[j])));
      }

      //Pushes scores into array. 
      scoresArray.push(scoresDiff);
    }

    for(var i=0; i<scoresArray.length; i++){
      if(scoresArray[i] <= scoresArray[bestMatch]){
        bestMatch = i;
      }
    }

    //return bestMatch data
    var match = friendsList[bestMatch];
    res.json(match);

    //pushes new submission into the friendsList array
    friendsList.push(req.body);
  });
};