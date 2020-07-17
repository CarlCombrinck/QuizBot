const ScoreChangeEmbed = require("../embeds/score-update.js");

function modifyScore(message, quizGuild){
    let startIndexTeams = message.content.indexOf("~"), endIndexTeams = message.content.indexOf("~", startIndexTeams+1);
    let startIndexPoints = message.content.indexOf("["), endIndexPoints = message.content.indexOf("]");
    let team = -1, score = 1;
    if(startIndexTeams !== -1 && endIndexTeams !== -1 && startIndexTeams < endIndexTeams){
        team = parseInt(message.content.slice(startIndexTeams+1, endIndexTeams));
        if(isNaN(team) || team > quizGuild.teamNumber){
            return Promise.reject("Invalid team supplied!");
        }
    }
    else{
        return Promise.reject("Invalid format for score command!");
    }
    if(startIndexPoints !== -1 && endIndexPoints !== -1 && startIndexPoints < endIndexPoints){
        score = parseInt(message.content.slice(startIndexPoints+1, endIndexPoints));
        if(isNaN(score)){
            return Promise.reject("Invalid score supplied!");
        }
    }
    try {
        quizGuild.scores[team-1] += score;
        return quizGuild.textChannels[team-1].send(new ScoreChangeEmbed(score));
    } catch (error) {
        Promise.reject(error);
    }       
}

module.exports = modifyScore;