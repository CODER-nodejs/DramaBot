const Discord = require('discord.js');

require("dotenv").config();

const client = new Discord.Client();

 //You can change prefix here
const prefix = '-';

const cheerio = require('cheerio');

const rp = require('request-promise');

 
const fs = require('fs');
 
client.commands = new Discord.Collection();
 
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);
 
    client.commands.set(command.name, command);
}
 
 //This command prompts if bot is online
client.once('ready', () => {
    console.log('The bot is online :)');
});
 
client.on('message', message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;
 
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
 
    if(command === 'dramagen'){
        client.commands.get('dramagen').execute(client, Discord, rp, cheerio, message, args);
    } 
});

client.login(process.env.TOKEN);
