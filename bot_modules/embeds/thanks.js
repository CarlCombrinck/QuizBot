const Embed = require("discord.js").MessageEmbed;

class ThanksEmbed extends Embed{
    constructor(){
        super();
        this.setTitle("That's all folks!");
        this.addField("A Big Thank You", "Thanks so much for joining us. We hope you had a great time. Until next time!");
        this.setColor('#09f8f5');
    }
}

module.exports = ThanksEmbed;