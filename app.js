const Discord = require('discord.js');
const figlet = require('figlet');
const colors = require('colors');
const readline = require('readline');
const commando = require(`discord.js-commando`);

const config = require('./config.json');
const bot = new commando.Client({
    commandPrefix:'re!'
});

const cmdsArray = [
    "dmall <message>",
    "dmrole <role> <message>"
];

bot.on("ready", () => {
    clear();
    console.log('______')
    let statuses = [
        `⚡${bot.users.size} users⚡`,
        `⚡${bot.guilds.size} servers⚡`,
        'My owner Ron!',
        're!help',
        'https://discord.gg/s57xYAg'
]
        setInterval(function() {
        let status = statuses[Math.floor(Math.random() * statuses.length)];
        bot.user.setActivity(status, {type: "WATCHING"});
}, 3000)
});

bot.on('message', message => {
    if(message.content === 're!servers') {
        	message.channel.send(`__**${bot.user.username} is currently on the following servers:**__ \n\n${bot.guilds.map(g => `${g.name} - **${g.memberCount} Members**`).join(`\n`)}`, {split: true});
    }
});

bot.on("error", (error) => {
    bot.login(config.token);
});

bot.registry.registerGroup('dms', 'help');
bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + "/commands");

if (process.env.BOT_TOKEN) bot.login(process.env.BOT_TOKEN);
else bot.login(config.token);




function clear() {
    console.clear();
    console.log(figlet.textSync("Wraith Bot v1.0.0").green);
    console.log("\n\nWraith bot for Discord. \n Sends DMs to selected members of guild.\n  Made by Ronak.");
    console.log(`\nRandom send time set @ 0.01-${config.wait}s`);
    console.log(` Type  ${config.prefix}help  in a chat.\n\n`);
}
