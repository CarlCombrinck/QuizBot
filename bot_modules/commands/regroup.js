async function regroup(channelArray, mainChannel){
    for(let channel of channelArray){
        for(let member of channel.members.values()){
            try {
                await member.voice.setChannel(mainChannel);
            } catch (error) {
                return Promise.reject(error);
            }
        }
    }
    return "Members regrouped!";
}

module.exports = regroup;