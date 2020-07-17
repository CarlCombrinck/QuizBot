const Embed = require("discord.js").MessageEmbed;

class LeaderboardEmbed extends Embed{
    constructor(){
        super();
        this.setTitle('Quiz Leaderboard')
        this.attachFiles(require.resolve("../../assets/images/leaderboard.png"));
        this.setThumbnail("attachment://leaderboard.png");
        this.setColor('#2288ff');
    }

    addTeam(position, team, score, members){
        if(this.fields.length < 25){
            this.addField(`**#${position}\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0 ${team}**`,"Members:\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"+`(${members.slice(0,250)}${members.length > 250 ? "..." : ""})\n`+ "Score: \u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"+`**${score.toString().length > 250 ? "Infinitely many" : score}** `+ `point(s)`);
        }
    }
}

module.exports = LeaderboardEmbed;