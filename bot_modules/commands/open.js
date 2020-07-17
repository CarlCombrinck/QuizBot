const announce = require("./announce.js");
const QuestionEmbed = require("../embeds/question.js");
const TimeEmbed = require("../embeds/time.js");
const ResponseEmbed = require("../embeds/responses.js");

function open(message, quizGuild){
    let questionStart = message.content.indexOf("~"), questionEnd = message.content.indexOf("~", questionStart+1);
    let timeStart = message.content.indexOf("["), timeEnd = message.content.indexOf("]");
    let time = quizGuild.answerTime;
    let questionString = "";
    if(timeStart !== -1 && timeEnd !== -1 && timeStart+1 < timeEnd){
        seconds = parseInt(message.content.slice(timeStart+1, timeEnd));
        if(isNaN(seconds)){
            return Promise.reject("Invalid time given!");
        }
        time = seconds*1000;
    }
    if(questionStart !== -1 && questionEnd !== -1 && questionStart < questionEnd){
        questionString = `${message.content.slice(questionStart+1,questionEnd)}`;
        quizGuild.openPolls();
        quizGuild.resetAnswers();
        if(questionString.length > 256){
            return Promise.reject("Question too long!");
        }
        const question = new QuestionEmbed(questionString, `${(time/1000)} seconds`);
        try {
            announce(question, "embed", quizGuild.textChannels);  
        } catch (error) {
            return Promise.reject(error);
        }
        let timeEnd = new Promise((resolve, reject) => {
            setTimeout(() => {
                let prevState = quizGuild.acceptAnswers;
                quizGuild.acceptAnswers = false;
                if(prevState){
                    const warning = new TimeEmbed("Time is Up!", "0 seconds");
                    const responses = new ResponseEmbed();
                    for(let index = 0; index < quizGuild.roundAnswers.length; index++){
                        try {
                            responses.addResponse(index+1, quizGuild.roundAnswers[index] === null ? "*No response*" : quizGuild.roundAnswers[index]);
                        } catch (error) {
                            reject(error);
                        }
                    }
                    try {
                        Promise.all(
                            [announce(warning, "embed", quizGuild.textChannels),
                            announce(responses, "embed", [quizGuild.trashTalkChannel, quizGuild.mainTextChannel])]).then(_ => {
                                resolve("Polls opened and responses displayed!");
                            }).catch(err => {
                                reject(err);
                            });
                    } catch (error) {
                        reject(error);
                    }
                }
                else{
                    resolve("Already closed");
                }
            }, time);
        });
        if(time > 10000){
            setTimeout(() => {
                if(quizGuild.acceptAnswers){
                    const warning = new TimeEmbed("You better hurry up!", "10 seconds");
                    try {
                        announce(warning, "embed", quizGuild.textChannels);
                    } catch (error) {
                        Promise.reject(error);
                    }
                }
            }, time-10000);
        }
        return timeEnd;
    }
    else{
        return Promise.reject("Invalid formatting for question string!");
    }
}

module.exports = open;