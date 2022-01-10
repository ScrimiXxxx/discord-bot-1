const Discord = require('discord.js');
const { fstat } = require('fs');
const bot = new Discord.Client({ intents: ["GUILDS", "GUILD_MEMBERS", "GUILD_MESSAGES", "DIRECT_MESSAGES", "GUILD_BANS", ]})
const token = require("./token.json")

bot.on('ready', async () =>{
    console.log("le bot est prêt")
    bot.user.setStatus("dnd")
    bot.user.setActivity("les boss 👑", {type: 'STREAMING', url :'https://www.twitch.tv/jlamaru'});
})
bot.on('guildMemberAdd', member => {
    member.send(`bienvenue à toi ${member.user.username} !`)
    bot.channels.cache.get('925055287545716798').send(`bienvenue à toi ${member} ! va prendre tes rôles dans <#925055287545716798>`);
    member.roles.add('925056358523486308')



})
bot.on('guildMemberRemove', member => {
    bot.channels.cache.get('925055287545716798').send(`${member.user.username} est parti !`)
})
bot.on('message', message => {
    if(message.content.startsWith("!clear")){
        message.delete();
        if(message.member.roles.cache.has('927253150786801755')){
            let args = message.content.trim().split(/ +/g);
            
            if(args[0]){
                if(!isNaN(args[0]) && args[0] >= 1 && args[0] <=99){

                    message.bulkDelete(args[1])

                }

            }

            
        }
    }
})



bot.on('message', async (message) => {
    if (
      message.content.toLowerCase().startsWith('!clear') ||
      message.content.toLowerCase().startsWith('!c ')
    ) {
      if (!message.member.roles.cache.has('927253150786801755'))
        return message.channel.send("You cant use this command since you're missing `manage_messages` perm");
      if (!isNaN(message.content.split(' ')[1])) {
        let amount = 0;
        if (message.content.split(' ')[1] === '1' || message.content.split(' ')[1] === '0') {
          amount = 1;
        } else {
          amount = message.content.split(' ')[1];
          if (amount > 100) {
            amount = 100;
          }
        }
        await message.channel.bulkDelete(amount, true).then((_message) => {
          message.channel.send(`le bot à clear \`${_message.size}\` messages :broom:`).then((sent) => {
            setTimeout(function () {
              sent.delete();
            }, 2500);
          });
        });
      } else {
        message.channel.send('veuillez entrer un nombre ').then((sent) => {
          setTimeout(function () {
            sent.delete();
          }, 2500);
        });
      }
    } else {
      if (message.content.toLowerCase() === '!help clear') {
        const newEmbed = new Discord.MessageEmbed().setColor('#00B2B2').setTitle('**Clear Help**');
        newEmbed
          .setDescription('This command clears messages for example `.clear 5` or `.c 5`.')
          .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
          .setTimestamp();
        message.channel.send(newEmbed);
      }
    }
  });

bot.login(token.token);