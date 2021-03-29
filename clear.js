const { Client, Message, MessageEmbed } = require("discord.js")
const config = require('./config.json');

const command = require('./command');

class clearCommand {
    constructor(client) {
        this.command(client);   
    }

    command(client) {
        command(client, 'clear', async (message) => {
            let args = message.content.split(' ');
            const member = message.mentions.members.first();
            const messages = message.channel.messages.fetch();

            if (message.member.hasPermission('ADMINISTRATOR')) {
                if (member) {
                    const userMessages = (await messages).filter((m) => m.author.id === member.id);
                    await message.channel.bulkDelete(userMessages);
                    message.channel.send(new MessageEmbed()
                            .setAuthor(message.author.username, `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}`)
                            .setFooter(config.defaultFooter)
                            .addField('poggers uwu', `${args[2]} messages sent by ${member.user.username} have deleted!`))
                        .then(msgToDelete => msgToDelete.delete({timeout: 5000}));
                } else {
                    //you were using args[0] before instead of args[1] (args[0] would be ,clear bruh)
                    if (!args[1]) {
                        return message.channel.send("Please specify a number of messages to delete ranging from 1-99.");
                    }
    
                    let msgs = parseInt(args[1]);
    
                    if (isNaN(msgs)) {
                        return message.channel.send("Only Numbers are allowed!");
                    }
    
                    if (msgs > 99) {
                        return message.channel.send("The max amount of messages that I can delete is 99!");
                    }
    
                    await message.channel
                        .bulkDelete(msgs + 1)
                        .catch((err) => console.log(err));
    
                    message.channel.send(new MessageEmbed()
                            .setAuthor(message.author.username, `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}`)
                            .setFooter(config.defaultFooter)
                            .addField(`Cleared ${msgs} messages`, `${msgs} messages have been successfully deleted!`))
                        .then(msgToDelete => msgToDelete.delete({timeout: 5000}));
                }
            } else {
                message.channel.send("User is not permitted to use this command!");
            }
        });
    }
}

module.exports = clearCommand;