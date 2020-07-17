const FeedbackEmbed = require("../embeds/feedback.js");

function gradeTeam(message, scoreArray, channelArray, teamNumber, responseArray){
    let startIndexTeams = message.content.indexOf("["), endIndexTeams = message.content.indexOf("]");
    let startIndexPoints = message.content.indexOf("<"), endIndexPoints = message.content.indexOf(">");
    if(startIndexTeams !== -1 && endIndexTeams !== -1 && startIndexTeams < endIndexTeams){
        let points = 1;
        if(startIndexPoints !== -1 && endIndexPoints !== -1 && startIndexPoints < endIndexPoints){
            points = parseInt(message.content.slice(startIndexPoints+1, endIndexPoints).trim());
            if(isNaN(points)){
                return Promise.reject("Invalid point allocation for grade command!");
            }
        }
        let allocationArray = message.content.slice(startIndexTeams+1, endIndexTeams).split(",");
        let updateArray = [];
        for(let i = 0; i < teamNumber; i++){
            updateArray.push(0);
        }
        for(let element of allocationArray){
            if(element.indexOf(":") != -1){
                let team = parseInt(element.slice(0,element.indexOf(":")).trim());
                let teamPoints = parseInt(element.slice(element.indexOf(":")+1).trim());
                if(isNaN(team) || isNaN(teamPoints) || team > teamNumber){
                    return Promise.reject("Incorrect arguments for point allocation in grade command!");
                }
                updateArray[team-1] = teamPoints;
            }
            else{
                let team = parseInt(element.trim());
                if(isNaN(team) || team > teamNumber){
                    return Promise.reject("Incorrect arguments for point allocation in grade command!");
                }
                updateArray[team-1] = points;
            }
        }
        let sending = [];
        for(let index = 0; index < teamNumber; index++){
            scoreArray[index] += updateArray[index];
            const feedback = new FeedbackEmbed(responseArray[index] === null ? "*No Response*" : responseArray[index], updateArray[index] > 0 ? `Well done! You earned ${updateArray[index]} point(s)!` : `Sorry, that's incorrect!`, updateArray[index] > 0);
            sending.push(channelArray[index].send(feedback));
        }
        return Promise.all(sending);
    }
    else{
        return Promise.reject("Incorrect format for teams in grade command!");
    }

}

module.exports = gradeTeam;