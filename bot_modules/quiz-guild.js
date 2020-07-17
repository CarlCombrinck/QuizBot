class QuizGuild{
    
    constructor(defaultTeams = 10){
        this.initialised = false;
        this.masterRoleName = "Question Master";
        this.masterRole = null;
        this.mainVoiceChannelName = "Meeting Hall";
        this.mainVoiceChannel = null;
        this.mainTextChannelName = "masters-bot";
        this.mainTextChannel = null;
        this.scoreChannelName = "scores";
        this.scoreChannel = null;
        this.trashTalkChannelName = "sledge-thread";
        this.trashTalkChannel = null;
        this.teamNumber = defaultTeams;
        this.textChannelNames = [];
        this.textChannels = [];
        this.voiceChannelNames = [];
        this.voiceChannels = [];
        this.roleNames = [];
        this.roles = [];
        this.roundNumber = 0;
        this.acceptAnswers = false;
        this.roundAnswers = [];
        this.scores = [];
        this.answerTime = 30000;
    }

    acceptAnswer(message){
        let team = this.textChannels.indexOf(message.channel);
        if(team !== -1){
            this.roundAnswers[team] = message.content;
        }
    }

    closePolls(){
        this.acceptAnswers = false;
    }

    resetAnswers(){
        this.roundAnswers = [];
        for(let i = 0; i < this.teamNumber; i++){
            this.roundAnswers.push(null);
        }
    }

    resetScores(){
        this.scores = [];
        for(let i = 0; i < this.teamNumber; i++){
            this.scores.push(0);
        }
    }

    openPolls(){
        this.acceptAnswers = true;
    }

    resetGame(){
        this.acceptAnswers = false;
        this.roundNumber = 0;
        this.resetAnswers();
        this.resetScores();
    }

    resetAll(){
        this.initialised = false;
        this.masterRoleName = "Question Master";
        this.masterRole = null;
        this.mainVoiceChannelName = "Meeting Hall";
        this.mainVoiceChannel = null;
        this.mainTextChannelName = "masters-bot";
        this.scoreChannelName = "scores";
        this.scoreChannel = null;
        this.trashTalkChannelName = "sledge-thread";
        this.trashTalkChannel = null;
        this.teamNumber = 10;
        this.textChannelNames = [];
        this.textChannels = [];
        this.voiceChannelNames = [];
        this.voiceChannels = [];
        this.roleNames = [];
        this.roles = [];
        this.roundNumber = 0;
        this.acceptAnswers = false;
        this.roundAnswers = [];
        this.scores = [];
        this.answerTime = 30000;
    }

    resetMainText(){
        this.mainTextChannel = null;
    }

}

module.exports = QuizGuild;