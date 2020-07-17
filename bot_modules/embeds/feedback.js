const Embed = require("discord.js").MessageEmbed;

class FeedbackEmbed extends Embed{
    constructor(answer, feedback, positive){
        super();
        this.setTitle('Question Feedback');
        this.setColor(positive ? '#09ff31' :'#f93f31');
        this.addField("Your Answer",`${answer.slice(0,1000)}${answer.length > 1000 ? "..." : ""}`);
        this.addField("Feedback",`${feedback.slice(0,1000)}${feedback.length > 1000 ? "..." : ""}`);
    }
}

module.exports = FeedbackEmbed;