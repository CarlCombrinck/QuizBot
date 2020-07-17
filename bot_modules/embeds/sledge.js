const Embed = require("discord.js").MessageEmbed;

class SledgeEmbed extends Embed{
    constructor(message) {
        super();
        this.setColor('#f7415d');
        this.setTitle('YOU IDIOT');
        this.addField(`"${message.content.slice(0,250)}${message.content.length>250?"...":""}"`,`**ALL MESSAGES MUST BE IN CAPS *@${message.member.displayName.toUpperCase()}*, SMH!**`);
    }
}

module.exports = SledgeEmbed;