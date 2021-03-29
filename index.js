const Discord = require('discord.js')
const client = new Discord.Client()

const config = require('./config.json')

const CommandsRouter = require('./CommandsRouter');
const command = require('./command')
const clear = require('./clear');
const helpCommand = require('./help');

client.on('ready', () => {
    console.log('The client is ready!')

    
    command(client, 'membercount', (message) => {
        client.guilds.cache.forEach((guild) => {
            let embed = new Discord.MessageEmbed()
                .setAuthor(message.author.username, `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}`)
                .setTitle(`${guild.name} has total of ${guild.memberCount} members`);

            message.channel.send(embed);
        });
    });
    
    command(client, 'status', message => {
        const content = message.content.replace('.status ', '')


        client.user.setPresence({
            activity: {
                name: content,
                type: 0,
            },
        })
    })

    new CommandsRouter(client);
    // new helpCommand(client);
    new clear(client);
})

//client.login(process.env.SAKI_TOKEN)
client.login(config.token)