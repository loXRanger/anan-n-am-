const { MessageEmbed } = require("discord.js");
const ayarlar = require('../../Ayarlamalar/Config.json');
const Config = require('../../Ayarlamalar/Settings.json')

module.exports.run = (client, message, args) => {
  
//-------------------------------------------------------------------------------\\
  
if(![Config.Roles.Register_Permission].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR'))
return message.channel.send(new MessageEmbed().setDescription(`${message.author} Komutu kullanmak için yetkin bulunmamakta.`).setFooter(Config.Embed.Footer).setColor(Config.Embed.Color).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true }))).then(x => x.delete({timeout: 5000}));
  
//-------------------------------------------------------------------------------\\  
  

let tag = Config.Server.Tag;
const ttag = message.guild.members.cache.filter(m => m.user.username.includes(tag)).size

const embed = new MessageEmbed()
.setColor(Config.Embed.Color)
.setFooter(Config.Embed.Footer)
message.channel.send(embed.setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setDescription(`**Taglı Üye Sayısı:** \`${ttag}\``));
};

  exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["tag-say", "tagsay"],
  permLvl: 0,
}

exports.help = {
  name: 'taglı',
  description: 'Sunucudaki taglı kişi sayısını gösterir / Stiprus was here',
  usage: 'tag-say'
}
