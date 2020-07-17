const QueryEmbed = require("../embeds/query.js");

function query(message, channel, quizGuild){
    if(message.content.indexOf("-query") === -1){
        try {
            const queryEmbed = new QueryEmbed(quizGuild.textChannels.indexOf(message.channel)+1, message.content.slice(2).trim().length > 256 ? "Query too long." : message.content.slice(2).trim());
            return channel.send(queryEmbed);
        } catch (error) {
            Promise.reject(error);
        }
    }
    else{
        try {
            const queryEmbed = new QueryEmbed(quizGuild.textChannels.indexOf(message.channel)+1, message.content.slice(6).trim().length > 256 ? "Query too long." : message.content.slice(6).trim());
            return channel.send(queryEmbed);
        } catch (error) {
            Promise.reject(error);
        }
    }
}

module.exports = query;