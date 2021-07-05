const Discord = require('discord.js');
const ayarlar = require('../../Ayarlamalar/Config.json');
const Config = require('../../Ayarlamalar/Settings.json')
const db = require('quick.db');
const gifler = ['https://cdn.discordapp.com/attachments/856286188164218880/856557709422493716/755244622946631700.gif', 'https://cdn.discordapp.com/attachments/856286188164218880/856557597879566336/755244492801441892.gif', 'https://cdn.discordapp.com/attachments/856286188164218880/856557331126812693/749054660769218631.gif', 'https://cdn.discordapp.com/attachments/856286188164218880/856557307688124456/749053689419006003.gif', 'https://cdn.discordapp.com/attachments/856286188164218880/856557254480232448/749051341325729913.gif']

exports.run = async (client, message, args) => {

let Prefix = await db.fetch(`prefix.${message.guild.id}`) || ayarlar.Bot.Prefix

message.channel.send(new Discord.MessageEmbed()
.setAuthor('Yardım Menüsü', message.author.avatarURL({dynamic: true}))
  .setColor(Config.Embed.Color)
  .setDescription(`> **• | Merhaba!** ${message.author} Stiprus kayıt botunun yardım menüsüne hoşgeldin komutlar aşağıda.`)
  .addField('__Top Kayıt__', `\`${Prefix}top-kayıt\``, true)
  .addField('__Mesaj Sil__', `\`${Prefix}sil {1-100}\``, true)
  .addField('__Tag Say__', `\`${Prefix}tag-say\``, true)
  .addField('__Kanal Kilit__', `\`${Prefix}kilit\``, true)
  .addField('__Sesli Çek__', `\`${Prefix}çek\``, true)
  .addField('__Prefix Sistemi__', `\`${Prefix}prefix\``, true)
  .addField('__AFK__', `\`${Prefix}afk {sebep}\``, true)
  .addField('__Geçmiş İsimler__', `\`${Prefix}isimler\``, true)
  .addField('__Kayıt Bilgi__', `\`${Prefix}bilgi\``, true)
  .setImage(Config.Embed.Image)
  .setTimestamp()
  .setThumbnail(gifler[Math.floor(Math.random() * gifler.length)])
  .setFooter(Config.Embed.Footer)
)
message.react(Config.Emojis.Check);
}

exports.conf = {
  aliases: ['yardım'],
  permLevel: 0
};

exports.help = {
  name: 'yardım',
  description: 'Yardım menüsünü gösterir. / Stiprus was here',
  usage: 'yardım'
};