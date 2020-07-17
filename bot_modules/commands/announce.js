const AnnounceEmbed = require("../embeds/announcement.js");

function announce (message, type, channelArray){
    let sending = [];
    let embedToSend;
    if(type === "msg"){
        let startIndex = message.content.indexOf("["), endIndex = message.content.indexOf("]");
        if(startIndex === -1 || endIndex === -1 || startIndex > endIndex){
            return Promise.reject("Invalid string formatting for announcement!");
        }
        let messageString = message.content.slice(startIndex+1, endIndex);
        embedToSend = new AnnounceEmbed(messageString);
    }
    else if(type === "string"){
        embedToSend = new AnnounceEmbed(message);
    }
    else if(type === "embed"){
        embedToSend = message;
    }
    else{
        return Promise.reject("Invalid type for announcement!");
    }

    for(let channel of channelArray){
        sending.push(channel.send(embedToSend));
    }
    return Promise.all(sending);
}

module.exports = announce;