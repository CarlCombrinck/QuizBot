const helper = require("../helper.js");

function initialise(message, quizGuild, guild){
    let startTeamIndex = message.content.indexOf("["), endTeamIndex = message.content.indexOf("]");
    let teams = quizGuild.teamNumber;
    if(startTeamIndex !== -1 && endTeamIndex !== -1 && startTeamIndex < endTeamIndex){
        teams = parseInt(message.content.slice(startTeamIndex+1,endTeamIndex))
        if(isNaN(teams)){
            quizGuild.resetAll();
            return Promise.reject("Invalid team number provided!");
        }
        quizGuild.teamNumber = teams;
    }
    try {
        quizGuild.masterRole = helper.getRoleByName(quizGuild.masterRoleName, guild.roles);
        quizGuild.mainVoiceChannel = helper.getChannelByName(quizGuild.mainVoiceChannelName, "voice", guild.channels);
        quizGuild.mainTextChannel = helper.getChannelByName(quizGuild.mainTextChannelName, "text", guild.channels);
        quizGuild.trashTalkChannel = helper.getChannelByName(quizGuild.trashTalkChannelName, "text", guild.channels);
        quizGuild.scoreChannel = helper.getChannelByName(quizGuild.scoreChannelName, "text", guild.channels);
        for(let i = 0 ; i < quizGuild.teamNumber ; i++){
            let textChannel = helper.getChannelByName(`team-${i+1}-answers`, "text", guild.channels);
            if(textChannel !== undefined){
                quizGuild.textChannels.push(textChannel);
                quizGuild.textChannelNames.push(`team-${i+1}-answers`);
            }
            let voiceChannel = helper.getChannelByName(`Team ${i+1}`, "voice", guild.channels);
            if(voiceChannel !== undefined){
                quizGuild.voiceChannels.push(voiceChannel);
                quizGuild.voiceChannelNames.push(`Team ${i+1}`);
            }
            let role = helper.getRoleByName(`Team ${i+1}`, guild.roles);
            if(role !== undefined){
                quizGuild.roles.push(role);
                quizGuild.roleNames.push(`Team ${i+1}`);
                quizGuild.roundAnswers.push(null);
                quizGuild.scores.push(0);
            }
        } 
        if(quizGuild.textChannels.length === quizGuild.voiceChannels.length && quizGuild.voiceChannels.length === quizGuild.roles.length && quizGuild.roles.length === quizGuild.teamNumber){
            quizGuild.initialised = true;
            return Promise.resolve(`Found ${quizGuild.textChannels.length} team answer channels\nFound ${quizGuild.voiceChannels.length} team voice channels`);
        }
        else{
            let errorString = `Found ${quizGuild.textChannels.length} team answer channels\nFound ${quizGuild.voiceChannels.length} team voice channels\nTeam Number is ${quizGuild.teamNumber}!`;
            quizGuild.resetAll();
            return Promise.reject(errorString);
        }
        
    } catch (error) {
        quizGuild.resetAll();
        return Promise.reject(error);
    }  
}

module.exports = initialise;