const Embed = require("discord.js").MessageEmbed;

class ScoreChangeEmbed extends Embed{
    constructor(points){
        super();
        this.setTitle('Score Update');
        this.setColor(points > 0 ? '#11f911' : '#ff2222');
        this.addField(`Your score ${points>0 ? "increased" : "decreased"} by`, `${(Math.abs(points)).toString().length > 1000 ? "infinitely many" : Math.abs(points)} points(s)`);
    }
}

module.exports = ScoreChangeEmbed;