const Embed = require("discord.js").MessageEmbed;

class BonusEmbed extends Embed{
    constructor(points) {
        super();
        this.setColor('#02f157');
        this.setTitle("Bonus Points");
        this.attachFiles(require.resolve("../../assets/images/bonus.png"));
        this.setThumbnail("attachment://bonus.png");
        this.addField("Well Done!",`You were awarded ${points.toString().length > 950 ? "a massive number of" : points} bonus point(s) for being funny!`);
    }
}

module.exports = BonusEmbed;