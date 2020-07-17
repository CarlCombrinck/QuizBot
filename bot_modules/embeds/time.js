const Embed = require("discord.js").MessageEmbed;

class TimeEmbed extends Embed{
    constructor(warning, time){
        super();
        this.setTitle("Time Warning");
        this.setColor('#ffb111');
        this.addField("Warning",`${warning.slice(0,1000)}${warning.length > 1000 ? "..." : ""}`);
        this.addField("Time Remaining",`${time.toString().slice(0,1000)}${time.toString().length > 1000 ? "..." : ""}`);
    }
}

module.exports = TimeEmbed;