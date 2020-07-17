const helper = require("../helper.js");
const LeaderboardEmbed = require("../embeds/scores.js");

function displayLeaderboard(channelArray, quizGuild, guild){
    try {
        const leaderboard = new LeaderboardEmbed();
        let scoreCopy = quizGuild.scores.slice();
        let rolesCopy = quizGuild.roles.slice();
        let roleNamesCopy = quizGuild.roleNames.slice();
        for(let i = 0; i < quizGuild.teamNumber; i++){
            let maxIndex = i;
            for(let j = i; j < quizGuild.teamNumber; j++){
                if(scoreCopy[j] > scoreCopy[maxIndex]){
                    maxIndex = j;
                }
            }
            swap(maxIndex, i, scoreCopy);
            swap(maxIndex, i, rolesCopy);
            swap(maxIndex, i, roleNamesCopy);
        }
        for(let index = 0; index < quizGuild.teamNumber; index++){
            let members = "";
            for(let member of guild.members.cache.values()){
                if(helper.hasRole(rolesCopy[index], member.roles)){
                    members += member.displayName + ", ";
                }
            }
            leaderboard.addTeam(index+1, roleNamesCopy[index], scoreCopy[index], members.slice(0, members.length-2));
        }
        const sending = [];
        for(let channel of channelArray){
            sending.push(channel.send(leaderboard));
        }
        return Promise.all(sending);
    } catch (error) {
        return Promise.reject(error);
    }
    
}

function swap(i, j, array){
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}

module.exports = displayLeaderboard;