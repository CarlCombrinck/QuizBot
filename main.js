const Discord = require("discord.js");
const client = new Discord.Client();
const commandHandler = require("./bot_modules/command-handler.js");

client.login(process.env.token);

client.once('ready', () => {
    console.log("Success -> Bot Ready");
});

client.on('message', message => {
    commandHandler.handle(message);
});

client.on('error', error => {
    console.log(`Error encountered in main.js\nErr: {${error}}`);
});

