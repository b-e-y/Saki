const { Client, Message, MessageEmbed } = require("discord.js")

module.exports = {
    name: "clear",
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {string[]} args
     */
    run: async (client, message, args) => {
        const member = message.mentions.members.first();
        const messages = message.channel.messages.fetch();

        if (message.member.hasPermission('ADMINISTRATOR')) {
            if (member) {
                const userMessages = (await messages).filter((m) => m.author.id === member.id);
                await message.channel.bulkDelete(userMessages);
                message.channel.send(`${member} messages has been cleared.`);
            } else {
                //you were using args[0] before instead of args[1] (args[0] would be ,clear bruh)
                if (!args[1])
                    return message.channel.send("Please specify a number of messages to delete ranging from 1-99.");

                let msgs = parseInt(args[1]);

                if (isNaN(msgs))
                    return message.channel.send("Only Numbers are allowed!");

                if (msgs > 99)
                    return message.channel.send("The max amount of messages that I can delete is 99!");

                await message.channel
                    .bulkDelete(msgs + 1)
                    .catch((err) => console.log(err));

                message.channel.send(`Successfully deleted ${msgs} messages.`);
            }
        } else {
            message.channel.send("User is not permitted to use this command!");
        }
    },
};