const Embed = require("discord.js").MessageEmbed;

class InfoEmbed extends Embed{
    constructor(quizGuild){
        super();
        this.setColor('#f8f627');
        this.setTitle("Quiz Information");
        this.addField("Team Count", `${quizGuild.teamNumber}`);
        this.addField("Command Channel", `${quizGuild.mainTextChannelName.slice(0,1000)}`);
        this.addField("Current Scores", (`[${quizGuild.scores}]`).slice(0,1000));
        this.addField("Answer Polls", `${quizGuild.acceptAnswers ? "Open" : "Closed"}`);
        this.addField("Default Answer Time", (`${quizGuild.answerTime/1000} seconds`).slice(0,1000));
    }
}

module.exports = InfoEmbed;
            