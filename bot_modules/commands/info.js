const InfoEmbed = require("../embeds/quiz-info.js");

function displayInfo(quizGuild){
    try {
        const info = new InfoEmbed(quizGuild);
        return quizGuild.mainTextChannel.send(info);
    } catch (error) {
        return Promise.reject(error);
    }
}

module.exports = displayInfo;