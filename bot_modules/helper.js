function getChannelByName(name, type, channelManager){
    for(let channel of channelManager.cache.values()){
        if(channel.name === name && channel.type === type){
            return channel;
        }
    }
    return undefined;
}

function getChannelByID(id, channelManager){
    return channelManager.cache.get(id);
}

function getMemberByID(id, memberManager){
    return memberManager.cache.get(id);
}

function getRoleByName(name, roleManager){
    for(let role of roleManager.cache.values()){
        if(role.name === name){
            return role;
        }
    }
    return undefined;
}

function hasRole(role, roleManager){
    return roleManager.cache.get(role.id) !== undefined;
}

function isAnswerChannel(channel, channelArray){
    return channelArray.indexOf(channel) !== -1;
}

function isParticipant(member, roleArray){
    for(let role of roleArray){
        if(hasRole(role, member.roles)){
            return true;
        }
    }
    return false;
}

function isQuizMaster(member, masterRole){
    return hasRole(masterRole, member.roles);
}

module.exports = {
    getChannelByName, 
    getChannelByID, 
    getMemberByID, 
    getRoleByName, 
    hasRole, 
    isAnswerChannel,
    isParticipant, 
    isQuizMaster };



