const Discord = require('discord.js');
const Config = require("../../Ayarlamalar/Settings.json");

exports.run = async (client, message, args) => {
  
    let stiprusembed = new Discord.MessageEmbed().setColor(Config.Embed.Color).setFooter(Config.Embed.Footer).setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(Config.setDescription(`**Bu Yetkiyi Kullanabilmen İçin \`Yönetici\` Yetkisine Sahip Olmalısın.**`)).then(x => x.delete({timeout: Config.Embed.Timeout}));
    let everyone = message.guild.roles.cache.find(x => x.name === `@everyone`);
   
  if(message.channel.permissionsFor(everyone).has("SEND_MESSAGES")) {
      message.channel.updateOverwrite(everyone, {
        SEND_MESSAGES: false,
      });
      message.react(`🔒`)
  } else {
      message.channel.updateOverwrite(everyone, {
        SEND_MESSAGES: null,
      });
      message.react(`🔓`)
  };

};
exports.conf = {
  aliases: ['kilit'],
  permLevel: 0
};

exports.help = {
  name: 'kilit',
  description: 'Komutu kullandığınız kanalı kilitler - açar. / Stiprus was here',
  usage: 'kilit'
};