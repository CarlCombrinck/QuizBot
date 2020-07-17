const helper = require("../helper.js");

async function unmute(channel, masterRole){
    try {
        for(let member of channel.members.values()){
            if(!helper.hasRole(masterRole, member.roles)){
                if(member.voice.serverMute){
                    await member.voice.setMute(false);
                }
            }
        }
        return "Unmuted members!";
    } catch (error) {
        return error;
    }
}

module.exports = unmute;
