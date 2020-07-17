const prefix = require("../config/config.json").prefix;
const helper = require("./helper.js");

const QuizGuild = require("./quiz-guild.js");
const quizGuild = new QuizGuild();

const announce = require("./commands/announce.js");
const displayAnswers = require("./commands/answers.js");
const awardBonus = require("./commands/bonus.js");
const clearAnswerChannels = require("./commands/clear-answers.js");
const clearScoreChannel = require("./commands/clear-scores.js");
const clearText = require("./commands/clear-text.js");
const close = require("./commands/close.js");
const endGame = require("./commands/finish-game.js");
const grade = require("./commands/grade.js");
const handleSledge = require("./commands/handle-sledge.js");
const displayInfo = require("./commands/info.js");
const init = require("./commands/init.js");
const showLeaderBoard = require("./commands/leaderboard.js");
const mute = require("./commands/mute.js");
const newRound = require("./commands/new-round.js");
const open = require("./commands/open.js");
const handleQuery = require("./commands/query.js");
const regroup = require("./commands/regroup.js");
const resetAll = require("./commands/reset-all.js");
const resetGame = require("./commands/reset-game.js");
const scoreTeam = require("./commands/score.js");
const setScores = require("./commands/set-scores.js");
const split = require("./commands/split.js");
const unmute = require("./commands/unmute.js");

const AnswerEmbed = require("./embeds/question-answer.js");
const Embed = require("discord.js").MessageEmbed;

function handle (message) {
    if(quizGuild.initialised){
        if(message.content.startsWith(prefix)){
            if(helper.isQuizMaster(message.member, quizGuild.masterRole)){
                let command = message.content.slice(1);
                if(command.startsWith("ann") || command.startsWith("announce")){
                    announce(message, "msg", quizGuild.textChannels).then(_ => {
                        console.log(`Success -> Announcement made!`);
                        commandFeedback("Announcement made!", true);
                    }).catch(err => {
                        console.log(`Error -> Error encountered while announcing!\nError:\n${err}`);
                        commandFeedback(`Problem making announcement!\n${err}`, false);
                    }); 
                }
                else if(command === "a" || command === "answers"){
                    displayAnswers(quizGuild.roundAnswers, quizGuild.mainTextChannel).then(_ => {
                        console.log(`Success -> Answers printed!`);
                        commandFeedback("Answers printed!", true);
                    }).catch(err => {
                        console.log(`Error -> Error encountered while printing answers!\nError:\n${err}`);
                        commandFeedback(`Problem printing answers!\n${err}`, false);
                    });
                }
                else if(command.startsWith("bonus") || command.startsWith("b")){
                    awardBonus(message, quizGuild.scores, quizGuild).then(_ => {
                        console.log(`Success -> Bonus points awarded!`);
                        commandFeedback("Bonus points awarded!", true);
                    }).catch(err => {
                        console.log(`Error -> Error encountered while adding bonus points!\nError:\n${err}`);
                        commandFeedback(`Problem allocating bonus points!\n${err}`, false);
                    });
                }
                else if(command === "ct" || command === "cleartext"){
                    clearAnswerChannels(quizGuild.textChannels).then(_ => {
                        console.log(`Success -> Answer channels cleared!`);
                        commandFeedback(`Answer channels cleared!`, true);
                    }).catch(err => {
                        console.log(`Error -> Error encountered while clearing answer channels!\nError:\n${err}`);
                        commandFeedback(`Problem clearing answer channels!\n${err}`, false);
                    });
                }
                else if(command === "cs" || command === "clearscores"){
                    clearScoreChannel(quizGuild.scoreChannel).then(_ => {
                        console.log(`Success -> Scores cleared!`);
                        commandFeedback("Scores cleared!", true);
                    }).catch(err => {
                        console.log(`Error -> Error encountered while clearing scores!\nError:\n${err}`);
                        commandFeedback(`Problem clearing scores!\n${err}`, false);
                    });
                }
                else if(command === "cr" || command === "clear"){
                    clearText(message.channel).then(_ => {
                        console.log(`Success -> #${message.channel.name} cleared!`);
                        commandFeedback(`#${message.channel.name} cleared!`, true);
                    }).catch(err => {
                        console.log(`Error -> Error encountered while clearing a channel!\nError:\n${err}`);
                        commandFeedback(`Problem clearing #${message.channel.name}!\n${err}`, false);
                    });
                }
                else if(command === "cl" || command === "close"){
                    close(quizGuild).then(_ => {
                        console.log(`Success -> Polls closed!`);
                        commandFeedback(`Polls closed!`, true);
                    }).catch(err => {
                        console.log(`Error -> Error encountered while closing polls!\nError:\n${err}`);
                        commandFeedback(`Problem closing polls!\n${err}`, false);
                    });
                }
                else if(command === "f" || command === "finish"){
                    showLeaderBoard(quizGuild.textChannels.slice().concat([quizGuild.scoreChannel]), quizGuild, message.guild).then(_ => {
                        return endGame(quizGuild, message.guild.members.cache);
                    }).then(_ => {
                        console.log(`Success -> Quiz finished!`);
                        commandFeedback(`Quiz finished!`, true);
                    }).catch(err => {
                        console.log(`Error -> Error encountered while ending quiz!\nError:\n${err}`);
                        commandFeedback(`Problem ending quiz!\n${err}`, false);
                    });
                }
                else if(command.startsWith("grade") || command.startsWith("g")){
                    let startIndexAnswer = message.content.indexOf("~"), endIndexAnswer = message.content.indexOf("~", startIndexAnswer+1);
                    if(startIndexAnswer !== -1 && endIndexAnswer !== -1 && startIndexAnswer < endIndexAnswer){
                        const answer = new AnswerEmbed(message.content.slice(startIndexAnswer+1, endIndexAnswer));
                        announce(answer, "embed", quizGuild.textChannels).then(_ => {
                            console.log(`Success -> Answer displayed!`);
                            commandFeedback(`Answer displayed!`, true);
                        }).catch(err => {
                            console.log(`Error -> Error encountered while displaying answers!\nError:\n${err}`);
                            commandFeedback(`Problem displaying teams!\n${err}`, false);
                        });
                    }
                    grade(message, quizGuild.scores, quizGuild.textChannels, quizGuild.teamNumber, quizGuild.roundAnswers).then(_ => {
                        console.log(`Success -> Teams graded!`);
                        commandFeedback(`Teams graded!`, true);
                    }).catch(err => {
                        console.log(`Error -> Error encountered while grading teams!\nError:\n${err}`);
                        commandFeedback(`Problem grading teams!\n${err}`, false);
                    });
                }
                else if(command === "in" || command === "info"){
                    displayInfo(quizGuild).then(_ => {
                        console.log(`Success -> Info displayed!`);
                        commandFeedback(`Info displayed!`, true);
                    }).catch(err => {
                        console.log(`Error -> Error encountered displaying info!\nError:\n${err}`);
                        commandFeedback(`Problem displaying info!\n${err}`, false);
                    });
                }
                else if(command === "l" || command === "leaderboard"){
                    showLeaderBoard([quizGuild.scoreChannel], quizGuild, message.guild).then(_ => {
                        console.log(`Success -> Leaderboard displayed!`);
                        commandFeedback(`Leaderboard displayed!`, true);
                    }).catch(err => {
                        console.log(`Error -> Error encountered initialising quiz!\nError:\n${err}`);
                        commandFeedback(`Problem displaying leaderboard!\n${err}`, false);
                    });
                }
                else if(command === "m" || command === "mute"){
                    mute(quizGuild.mainVoiceChannel, quizGuild.masterRole).then(msg => {
                        console.log(`Success -> Members muted!`);
                        commandFeedback(msg, true);
                    }).catch(err => {
                        console.log(`Error -> Error encountered muting members!\nError:\n${err}`);
                        commandFeedback(`Problem muting members!\n${err}`, false);
                    });
                }
                else if(command.startsWith("nr") || command.startsWith("newround")){
                    newRound(message, quizGuild).then(_ => {
                        console.log(`Success -> New round announced!`);
                        commandFeedback("New round announced!", true);
                    }).catch(err => {
                        console.log(`Error -> Error encountered while announcing new round!\nError:\n${err}`);
                        commandFeedback(`Problem announcing new round!\n${err}`, false);
                    });
                }
                else if(command.startsWith("o") || command.startsWith("open")){
                    open(message, quizGuild).then(msg => {
                        console.log(`Success -> Polls were opened and responses collected!`);
                        commandFeedback(msg, true);
                    }).catch(err => {
                        console.log(`Error -> Error encountered while opening polls!\nError:\n${err}`);
                        commandFeedback(`Problem while opening polls!\n${err}`, false);
                    });
                    commandFeedback(`Began opening polls!`, true);
                }
                else if(command === "ra" || command === "resetall"){
                    resetAll(quizGuild).then(msg => {
                        console.log(`Success -> ${msg}`);
                        commandFeedback(msg, true);
                    }).catch(err => {
                        console.log(`Error -> Error encountered while resetting everything!\nError:\n${err}`);
                        commandFeedback(`Problem while resetting all!\n${err}`, false);
                    });
                }
                else if(command === "rg" || command === "resetgame"){
                    resetGame(quizGuild).then(msg => {
                        console.log(`Success -> ${msg}`);
                        commandFeedback(msg, true);
                    }).catch(err => {
                        console.log(`Error -> Error encountered while resetting game!\nError:\n${err}`);
                        commandFeedback(`Problem while resetting game!\n${err}`, false);
                    });
                }
                else if(command.startsWith("r") || command.startsWith("regroup")){
                    regroup(quizGuild.voiceChannels, quizGuild.mainVoiceChannel).then(msg => {
                        console.log(`Success -> ${msg}`);
                        commandFeedback(msg, true);
                    }).catch(err => {
                        console.log(`Error -> Error encountered while regrouping!\nError:\n${err}`);
                        commandFeedback(`Problem while regrouping!\n${err}`, false);
                    });
                }
                else if(command.startsWith("sc") || command.startsWith("score")){
                    scoreTeam(message, quizGuild).then(_ => {
                        console.log(`Success -> Team scored!`);
                        commandFeedback("Team scored!", true);
                    }).catch(err => {
                        console.log(`Error -> Error encountered while scoring a team!\nError:\n${err}`);
                        commandFeedback(`Problem while scoring a team!\n${err}`, false);
                    });
                }
                else if(command.startsWith("ss") || command.startsWith("setscores")){
                    setScores(message, quizGuild).then(_ => {
                        console.log(`Success -> Scores set!`);
                        commandFeedback("Scores set!", true);
                    }).catch(err => {
                        console.log(`Error -> Error encountered while scoring a team!\nError:\n${err}`);
                        commandFeedback(`Problem while setting scores!\n${err}`, false);
                    });
                }
                else if(command === "s" || command === "split"){
                    split(quizGuild.mainVoiceChannel, quizGuild.voiceChannels, quizGuild.roles).then(msg => {
                        console.log(`Success -> ${msg}`);
                        commandFeedback(msg, true);
                    }).catch(err => {
                        console.log(`Error -> Error encountered while splitting teams!\nError:\n${err}`);
                        commandFeedback(`Problem while splitting teams!\n${err}`, false);
                    });
                }
                else if(command === "u" || command === "unmute"){
                    unmute(quizGuild.mainVoiceChannel, quizGuild.masterRole).then(msg => {
                        console.log(`Success -> ${msg}`);
                        commandFeedback(msg, true);
                    }).catch(err => {
                        console.log(`Error -> Error encountered unmuting members!\nError:\n${err}`);
                        commandFeedback(`Problem unmuting members!\n${err}`, false);
                    });
                }

            }
            
        }
        else{
            if(helper.isParticipant(message.member, quizGuild.roles)){
                if(message.channel === quizGuild.trashTalkChannel){
                    const response = handleSledge(message);
                    if(response !== null){
                        message.delete().then(_ => {
                            return quizGuild.trashTalkChannel.send(response);
                        }).catch(err => {
                            console.log(`Error -> Error encountered while handling sledge\nError:\n${err}`);
                        });
                    }
                }
                else if(helper.isAnswerChannel(message.channel, quizGuild.textChannels) && (message.content.startsWith("-q") || message.content.startsWith("-query"))){
                    handleQuery(message, quizGuild.mainTextChannel, quizGuild).then(_ => {
                        const response = new Embed();
                        return message.channel.send(response.setColor('#f9f9f9').setTitle("Please hold...").addField("Good news!", "Your query has been received as will be looked at shortly!"));
                    }).catch(err => {
                        console.log(`Error -> Error encountered while handling query!\nError:\n${err}`);
                    });
                }
                else if(helper.isAnswerChannel(message.channel, quizGuild.textChannels) && quizGuild.acceptAnswers){
                    quizGuild.acceptAnswer(message);
                }
            }
        }

    }
    else{
        if((message.content.startsWith(`${prefix}i`) || message.content.startsWith(`${prefix}init`)) && message.channel.name === quizGuild.mainTextChannelName){
            init(message, quizGuild, message.guild).then(msg => {
                console.log(`Success -> Quiz initialised!`);
                commandFeedback(`Quiz initialised!\n${msg}`, true);
            }).catch(err => {
                console.log(`Error -> Error encountered initialising quiz!\nError:\n${err}`);
                commandFeedback(`Problem initialising quiz!\n${err}`, false);
            });
        }
    }

}

const SuccessEmbed = require("./embeds/success.js");
const ErrorEmbed = require("./embeds/error.js");

function commandFeedback(messageString, isSuccess){
    try {
        if(isSuccess){
            quizGuild.mainTextChannel.send(new SuccessEmbed(messageString));
        }
        else{
            quizGuild.mainTextChannel.send(new ErrorEmbed(messageString));
        }
    } catch (error) {
        console.log(`Error -> While sending command feeback!\nError: ${error}`);
    }
}

module.exports.handle = handle;