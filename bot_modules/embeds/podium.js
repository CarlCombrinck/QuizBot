const Embed = require("discord.js").MessageEmbed;

class PodiumEmbed extends Embed{
    constructor(){
        super();
        this.setTitle('The Quiz Champions')
        this.setColor('#ffff25');
        try {
            this.attachFiles(require.resolve("../../assets/images/podium.png"));
            this.setThumbnail("attachment://podium.png");
        } catch (error) {
            console.log(error);
        }
    }

    addTeam(team, names, score){
        if(this.fields.length <= 21){
            this.addField("**Team Number**", `**${team.toString().length > 1000 ? "Infinity" : team}**`);
            this.addField("**Members**", `**(${names.slice(0,1000)})**`);
            this.addField("**Score**", `**${score.toString().length > 1000 ? "Infinity" : score}**`);
        }
        else if(this.fields.length === 24){
            this.addField("...", "...");
        }
    }
}

module.exports = PodiumEmbed;