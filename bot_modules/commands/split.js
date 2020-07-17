async function splitIntoTeams(mainVoiceChannel, teamVoiceChannels, roleArray){
    for(let member of mainVoiceChannel.members.values()){
        for(let role of member.roles.cache.values()){
            if(roleArray.indexOf(role) !== -1){
                try {
                    await member.voice.setChannel(teamVoiceChannels[roleArray.indexOf(role)]);
                    break;
                } catch (error) {
                    return error;
                }
            }
        }
    }
    return "Members split into teams.";
}

module.exports = splitIntoTeams;