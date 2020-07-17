const Embed = require("discord.js").MessageEmbed;

class ResponseEmbed extends Embed{
    constructor(){
        super();
        this.setTitle("Question Responses");
        this.setColor('#ffa137');
    }

    addResponse(team, response){
        if(this.fields.length < 25){
            this.addField(`Team ${team}`, `${response.slice(0,1000)}${response.length > 1000 ? "..." : ""}`);
        }
    }
}

module.exports = ResponseEmbed;