const PodiumEmbed = require("../embeds/podium.js");
const ThanksEmbed = require("../embeds/thanks.js");
const helper = require("../helper.js");

function endGame(quizGuild, members){
    try{
        const podium = new PodiumEmbed();
        const thanks = new ThanksEmbed();
        const sending = [];
        const teams = getPodiumTeams(quizGuild.scores);
        addToPodium(teams, quizGuild, members, podium);
        sending.push(quizGuild.scoreChannel.send(podium));
        sending.push(quizGuild.scoreChannel.send(thanks));
        for(let channel of quizGuild.textChannels){
            sending.push(channel.send(podium));
            sending.push(channel.send(thanks));
        }
        return Promise.all(sending);
    }
    catch(error){
        return Promise.reject(error);
    }
}

function getPodiumTeams(scoreArray){
    const topTeams = [];
    let max = -1;
    for(let score of scoreArray){
        if(score > max){
            max = score;
        }
    }
    for(let index = 0; index < scoreArray.length; index++){
        if(scoreArray[index] === max){
            topTeams.push(index);
        }
    }
    return topTeams;
}

function addToPodium(teams, quizGuild, members, podium){
    for(let team of teams){
        let names = "";
        for(let member of members.values()){
            if(helper.hasRole(quizGuild.roles[team], member.roles)){
                names += member.displayName + ", ";
            }
        }
        podium.addTeam(team+1, names.slice(0, names.length-2), quizGuild.scores[team]);
    }
}

module.exports = endGame;