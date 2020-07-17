const ResponseEmbed = require("../embeds/responses.js");

function displayAnswers(answerArray, channel){
    try {
        const response = new ResponseEmbed();
        for(let index = 0; index < answerArray.length; index++){
            response.addResponse(index+1,`${answerArray[index] === null ? "*No Response*" : answerArray[index]}`);
        }
        return channel.send(response);
    } catch (error) {
        return Promise.reject(error);
    }
}

module.exports = displayAnswers;