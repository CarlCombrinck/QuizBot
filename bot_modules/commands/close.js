const announce = require("./announce");

function close(quizGuild){
    try {
        quizGuild.closePolls();
        return announce("Answer polls were closed by the Quiz Master!", "string", quizGuild.textChannels);
    } catch (error) {
        return Promise.reject(error);
    }
}

module.exports = close;