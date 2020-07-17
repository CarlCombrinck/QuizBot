const Embed = require("discord.js").MessageEmbed;

class SuccessEmbed extends Embed{
    constructor(msg) {
        super();
        this.setColor('#09f891');
        this.setTitle("Success");
        this.addField("Command Successful!",`${msg.slice(0,1000)}${msg.length > 1000 ? "..." : ""}`);
    }
}

module.exports = SuccessEmbed;