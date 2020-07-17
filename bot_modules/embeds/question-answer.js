const Embed = require("discord.js").MessageEmbed;

class AnswerEmbed extends Embed{
    constructor(answer){
        super();
        this.setTitle("Question Answer");
        this.addField("The correct answer was:", `${answer.slice(0,1000)}${answer.length > 1000 ? "..." : ""}`);
        this.setColor('#ff25f1');
    }
}

module.exports = AnswerEmbed;