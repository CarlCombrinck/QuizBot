const Embed = require("discord.js").MessageEmbed;

class ErrorEmbed extends Embed{
    constructor(error) {
        super();
        this.setColor('#f7415d');
        this.setTitle("Error");
        this.addField("Something went wrong!",`${error.slice(0,1000)}${error.length > 1000 ? "..." : ""}`);
    }
}

module.exports = ErrorEmbed;