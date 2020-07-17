const announce = require("./announce.js");
const RoundEmbed = require("../embeds/round.js");

function newRound(message, quizGuild){
    try {
        let startIndexCategory = message.content.indexOf("["), endIndexCategory = message.content.indexOf("]");
        let category = "*None Specified*";
        if(startIndexCategory !== -1 && endIndexCategory !== -1 && startIndexCategory < endIndexCategory){
            category = message.content.slice(startIndexCategory+1, endIndexCategory);
        }
        else{
            return Promise.reject("Invalid format for category in new round command!");
        }
        quizGuild.roundNumber += 1;
        const roundEmbed = new RoundEmbed(quizGuild.roundNumber, category);
        return announce(roundEmbed, "embed", quizGuild.textChannels);
    } catch (error) {
        return Promise.reject(error);
    }
}

module.exports = newRound;