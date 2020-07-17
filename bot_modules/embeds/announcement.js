const Embed = require("discord.js").MessageEmbed;

class AnnouncementEmbed extends Embed{
    constructor(announcement) {
        super();
        this.setColor('#02a1f7');
        this.setTitle("Announcement");
        this.attachFiles(require.resolve("../../assets/images/announce.png"));
        this.setThumbnail("attachment://announce.png");
        this.addField("Listen up people!",`${announcement.slice(0,1000)}${announcement.length > 1000 ? "..." : ""}`);
    }
}

module.exports = AnnouncementEmbed;