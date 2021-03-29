// const config = require('./config.json');
// const Discord = require('discord.js');

// const fetch = require('node-fetch');

// class helpCommand {
//     constructor(client) {
//         this.helpCommand(client);   
//     }

//     helpCommand(client) {
//         client.on('message', message => {
//             if(message.content.startsWith(`${config.prefix}help`)){
//                 let commandCategories = config.commands;

//                 let embed = new Discord.MessageEmbed()
//                     .setAuthor(message.author.username, `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}`)
//                     .setTitle(`Help (${config.prefix})`)
//                     .setFooter(config.defaultFooter);

//                 for(var i = 0; i < commandCategories.length; i++){
//                     let catName = commandCategories[i].category;
//                     let commands = [];

//                     for(var ii = 0; ii < commandCategories[i].commands.length; ii++){
//                         commands.push(commandCategories[i].commands[ii].commandName + ': ' + commandCategories[i].commands[ii].commandDescription);
//                     }

//                     embed.addField(catName, commands);
//                 }

//                 message.channel.send(embed);
//             }
//         });
//     }
// }

// module.exports = helpCommand;