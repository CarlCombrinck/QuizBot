function setScores(message, quizGuild){
    let startIndex = message.content.indexOf("["), endIndex = message.content.indexOf("]");
    if(startIndex !== -1 && endIndex !== -1 && startIndex < endIndex){
        let pointsArray = message.content.slice(startIndex+1, endIndex).split(",");
        if(pointsArray.length !== quizGuild.teamNumber){
            return Promise.reject("Score update entry count doesn't match team count!");
        }
        for(let index = 0; index < quizGuild.teamNumber; index++){
            let points = parseInt(pointsArray[index].trim());
            if(isNaN(points)){
                return Promise.reject("Invalid points allocation!");
            }
            pointsArray[index] = points;
        }
        for(let index = 0; index < quizGuild.teamNumber; index++){
            quizGuild.scores[index] = pointsArray[index];
        }
        return Promise.resolve("Scores updated!");
    }
    else{
        return Promise.reject("Invalid format for set score command!");
    }
}

module.exports = setScores;