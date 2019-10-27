const commando = require('discord.js-commando');
const app = require('../../app.js');
const config = require('../../config.json');
const Discord = require('discord.js');

class DMallCommand extends commando.Command {
    constructor(client){
        super(client, {
            name: `dmguilds`,
            group: 'dms',
            memberName: 'dmguilds',
            description: 'Sends message provided to all members of the guilds in which bot is available.',
            examples: [ 'Hey everyone! This might reach more people than an announcement...' ]
        });
    }

    async run(message, args){
        let dmGuilds = bot.guilds;
        let role = message.mentions.roles.first();
        var msg = message.content;


        try {
            msg = msg.substring(msg.indexOf("dmguilds") + 5);
        } catch(error) {
            console.log(error);
            return;
        }

        if(!msg || msg.length <= 1) {
            const embed = new Discord.RichEmbed()
                .addField(":x: Failed to send!", "Message not specified")
                .addField(":eyes: Listen up!", "Every character past the command will be sent,\nand apparently there was nothing to send.");
            message.channel.send({ embed: embed });
            return;
        }
        if(!message.member.hasPermission(['ADMINISTRATOR'])) return message.reply('Sorry you do not have required permission to use this command! \n ***Permission required : `ADMINISTRATOR`***');

        let memberarray = dmGuilds.members.array();
        let membercount = memberarray.length;
        console.log(`Responding to ${message.author.username} :  Sending message to all ${membercount} members of ${dmGuild.name}.`)
        message.channel.send(`sending message to ${membercount} users as requested by ${message.author.username}`)
        for (var i = 0; i < membercount; i++) {
            let timeout = Math.floor((Math.random() * (config.wait - 0.01)) * 1000) + 10;
            let member = memberarray[i];
            await sleep(timeout);
            if(i == (membercount-1)) {
                console.log(`Waited ${timeout}ms.\t\\/\tDMing ${member.user.username}`);
            } else {
                console.log(`Waited ${timeout}ms.\t|${i + 1}|\tDMing ${member.user.username}`);
            }
            member.send(`${msg}`);
        }
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = DMguildsCommand;
