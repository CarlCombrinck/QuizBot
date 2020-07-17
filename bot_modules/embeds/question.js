const Embed = require("discord.js").MessageEmbed;

class QuestionEmbed extends Embed{
    constructor(question, time, number = ""){
        super();
        this.setTitle(`Question ${number}`);
        this.setColor('#18d6f7');
        this.addField("The question is...",`${question === "" ? "*None specified*": `${question.slice(0,1000)}${question.length > 1000 ? "..." : ""}`}`);
        this.addField("Time Limit", `${time.toString().length > 1000 ? "Infinity" : time}`);
    }
}

module.exports = QuestionEmbed;