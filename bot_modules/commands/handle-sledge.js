const SledgeEmbed = require("../embeds/sledge.js");

function handleSledge(message){
    if(message.content.toUpperCase() !== message.content){
        try {
            return new SledgeEmbed(message);
        } catch (error) {
            return null;
        }
    }
    return null;
}

module.exports = handleSledge;