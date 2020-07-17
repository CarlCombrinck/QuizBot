const BonusEmbed = require("../embeds/bonus.js");

function allocateBonusPoints(message, scoreArray, quizGuild){
    let pointStart = message.content.indexOf("["), pointEnd = message.content.indexOf("]");
    let teamStart = message.content.indexOf("~"), teamEnd = message.content.indexOf("~", teamStart+1);
    let score = 1, team;
    if(pointStart !== -1 && pointEnd !== -1 && pointStart+1 < pointEnd){
        try {
            score = parseInt(message.content.slice(pointStart+1,pointEnd));
            if(isNaN(score)){
                return Promise.reject("Invalid score given!");
            }
        } catch (error) {
            return Promise.reject(error);
        }
    }
    if(teamStart !== -1 && teamEnd !== -1 && teamStart+1 < teamEnd){
        try {
            team = parseInt(message.content.slice(teamStart+1, teamEnd));
            if(isNaN(team) || team > scoreArray.length){
                return Promise.reject("Invalid team given!");
            }
            return Promise.all([addBonusPoints(team, score, scoreArray), quizGuild.textChannels[team-1].send(new BonusEmbed(score))]);
        } catch (error) {
            return Promise.reject(error);
        }
    }
    else{
        return Promise.reject("Invalid formatting for bonus points!");
    }
}

function addBonusPoints(team, score, scoreArray){
    try {
        scoreArray[team-1] += score;
        return Promise.resolve(`Team ${team} score updated by ${score} point(s)!`);
    } catch (error) {
        return Promise.reject(error);
    }
}

module.exports = allocateBonusPoints;