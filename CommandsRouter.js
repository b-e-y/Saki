const config = require('./config.json');
const Discord = require('discord.js');

const fetch = require('node-fetch');

class Commands {
    constructor(client) {
        //general commands
        this.pingCommand(client);
        this.hugCommand(client);
        this.kissCommand(client);
        this.helpCommand(client);
        this.patCommand(client);
        
        //admin commands
        this.banCommand(client);
        this.kickCommand(client);
    }

    helpCommand(client) {
        client.on('message', message => {
            if(message.content.startsWith(`${config.prefix}help`)){
                let commandCategories = config.commands;

                let embed = new Discord.MessageEmbed()
                    .setAuthor(message.author.username, `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}`)
                    .setTitle(`Help (${config.prefix})`)
                    .setFooter(config.defaultFooter);

                for(var i = 0; i < commandCategories.length; i++){
                    let catName = commandCategories[i].category;
                    let commands = [];

                    for(var ii = 0; ii < commandCategories[i].commands.length; ii++){
                        commands.push(commandCategories[i].commands[ii].commandName + ': ' + commandCategories[i].commands[ii].commandDescription);
                    }

                    embed.addField(catName, commands);
                }

                message.channel.send(embed);
            }
        });
    }

    pingCommand(client) {
        client.on('message', message => {
            if(message.content.startsWith(`${config.prefix}ping`)){
                let embed = new Discord.MessageEmbed()
                    .setAuthor(message.author.username, `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}`)
                    .addField('Pong!', `${Math.round(client.ws.ping)}ms`, true);

                message.channel.send(embed);
            }
        });
    }

    async hugCommand(client) {
        client.on('message', async (message) => {
            if(message.content.startsWith(`${config.prefix}hug`)){
                if(!message.mentions.users.first() || !message.guild.member(message.mentions.users.first())){
                    message.channel.send('You must provide a user to hug >.<!!');
                    return;
                }

                let userToHug = message.mentions.users.first();

                //get anime pic ez
                let res = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${config.giphyApiKey}&q=anime%20hug`);
                let result = await res.json();

                let urls = [];

                for(var i = 0; i < result.data.length; i++){
                    if(result.data[i].url.includes('anime')){
                        urls.push(result.data[i].images.original.url);
                    }
                }

                let url = urls[this.getRandomInt(0, urls.length)];

                let embed = new Discord.MessageEmbed()
                    .setTitle(`${message.author.username} hugged ${userToHug.username}!`)
                    .setImage(url)
                    .setFooter(config.defaultFooter);

                message.channel.send(embed);
            }
        });
    }

    async patCommand(client) {
        client.on('message', async (message) => {
            if(message.content.startsWith(`${config.prefix}pat`)){
                if(!message.mentions.users.first() || !message.guild.member(message.mentions.users.first())){
                    message.channel.send('You must provide a user to pat >.<!!');
                    return;
                }

                let userToPat = message.mentions.users.first();

                //get anime pic ez
                let res = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${config.giphyApiKey}&q=anime%20pat`);
                let result = await res.json();

                let urls = [];

                for(var i = 0; i < result.data.length; i++){
                    if(result.data[i].url.includes('anime')){
                        urls.push(result.data[i].images.original.url);
                    }
                }

                let url = urls[this.getRandomInt(0, urls.length)];

                let embed = new Discord.MessageEmbed()
                    .setTitle(`${message.author.username} patted ${userToPat.username}!`)
                    .setImage(url)
                    .setFooter(config.defaultFooter);

                message.channel.send(embed);
            }
        });
    }

    async kissCommand(client) {
        client.on('message', async (message) => {
            if(message.content.startsWith(`${config.prefix}kiss`)){
                if(!message.mentions.users.first() || !message.guild.member(message.mentions.users.first())){
                    message.channel.send('You must provide a user to kiss OwO!!');
                    return;
                }

                let userToKiss = message.mentions.users.first();

                //get anime pic ez
                let res = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${config.giphyApiKey}&q=anime%20kiss`);
                let result = await res.json();

                let urls = [];

                for(var i = 0; i < result.data.length; i++){
                    if(result.data[i].url.includes('anime')){
                        urls.push(result.data[i].images.original.url);
                    }
                }

                let url = urls[this.getRandomInt(0, urls.length)];

                let embed = new Discord.MessageEmbed()
                    .setTitle(`${message.author.username} kissed ${userToKiss.username}!`)
                    .setImage(url)
                    .setFooter(config.defaultFooter);

                message.channel.send(embed);
            }
        });
    }

    banCommand(client) {
        client.on('message', message => {
            if(message.content.startsWith(`${config.prefix}ban`)){
                if(!message.member.hasPermission("BAN_MEMBERS")) {
                    message.channel.send('User is not permitted to use this command >.<!!!!');
                    return;
                }

                if(!message.guild.member(message.mentions.users.first())){
                    message.channel.send('You must provide a user to ban!');
                    return;
                }

                let userId = message.mentions.users.first().id;

                message.guild.members.ban(userId)
                    .catch((e) => {
                        console.error(e);
                        message.channel.send('An error occured while banning user ' + userId);
                        return;
                    })

                message.channel.send(
                    new Discord.MessageEmbed()
                        .setAuthor(message.author.username, `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}`)
                        .addField("ez ban uwu!!!", "Successfully banned user " + message.mentions.users.first().username + "!")
                        .setFooter(config.defaultFooter));
            }
        });
    }

    kickCommand(client) {
        client.on('message', message => {
            if(message.content.startsWith(`${config.prefix}kick`)){
                if(!message.member.hasPermission("KICK_MEMBERS")) {
                    message.channel.send('User is not permitted to use this command >.<!!!!');
                    return;
                }

                if(!message.guild.member(message.mentions.users.first())){
                    message.channel.send('You must provide a user to kick!');
                    return;
                }

                let userId = message.mentions.users.first().id;

                message.guild.members.cache.get(userId).kick()
                    .catch((e) => {
                        console.error(e);
                        message.channel.send('An error occured while kicking user ' + userId);
                        return;
                    });

                message.channel.send(
                    new Discord.MessageEmbed()
                        .setAuthor(message.author.username, `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}`)
                        .addField("Kicked hahahaa too ezzz", "Successfully kicked user " + message.mentions.users.first().username + "!")
                        .setFooter(config.defaultFooter));
            }
        });
    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    }
}

module.exports = Commands;