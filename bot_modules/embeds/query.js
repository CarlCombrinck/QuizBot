const Embed = require("discord.js").MessageEmbed;

class QueryEmbed extends Embed{
    constructor(team, query){
        super();
        this.setTitle("Query");
        this.setColor('#0271f9');
        this.addField(`Team #${team.toString().length > 1000 ? "Infinity" : team} asks...`,`${query.slice(0,1000)}${query.length > 1000 ? "..." : ""}`);
    }
}

module.exports = QueryEmbed;