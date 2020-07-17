const Embed = require("discord.js").MessageEmbed;

class RoundEmbed extends Embed{
    constructor(roundNumber, category) {
        super();
        this.setColor('#02d1f7');
        this.setTitle(`Round ${roundNumber}`);
        this.attachFiles(require.resolve("../../assets/images/announce.png"));
        this.setThumbnail("attachment://announce.png");
        this.addField("A new round is about to start and its category is...",`${category.slice(0,1000)}${category.length > 1000 ? "..." : ""}`);
    }
}

module.exports = RoundEmbed;