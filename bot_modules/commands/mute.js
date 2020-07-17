const helper = require("../helper.js");

async function mute(channel, masterRole){
    try {
        for(let member of channel.members.values()){
            if(!helper.isQuizMaster(member, masterRole)){
                if(!member.voice.serverMute){
                    await member.voice.setMute(true);
                }
            }
        }
        return "Muted members!";
    } catch (error) {
        return error;
    }
}

module.exports = mute;