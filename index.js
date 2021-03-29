const Discord = require('discord.js')
const client = new Discord.Client()
//const config = require('./config.json')

client.on('ready', () => {
    console.log('The client is ready!')
})

client.login(process.env.SAKI_TOKEN)
//client.login(config.token)