const Discord = require("discord.js");
const ayarlar = require('../../Ayarlamalar/Config.json');
const Config = require('../../Ayarlamalar/Settings.json');

exports.run = async (client, message, args) => {

let onaylama = '848242018613592095' // Onaylama Emoji ID si
let reddetme = '856169891571695666' // Reddetme Emoji ID si

if (!message.member.voice.channel) {
return message.reply(new Discord.MessageEmbed().setDescription("Ses kanalında olman lazım!").setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor(Config.Embed.Color).setFooter(Config.Embed.Footer)).then(m => m.delete,{timeout: 5000});
}
const filter = (reaction, user) => {
return [onaylama, reddetme].includes(reaction.emoji.id) && user.id === kullanıcı.id;
};
  
let kullanıcı = message.mentions.members.first()
if (!kullanıcı) return message.channel.send(new Discord.MessageEmbed().setDescription('Bir Kullanıcı Belirt.').setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor(Config.Embed.Color).setFooter(Config.Embed.Footer)).then(m => m.delete,{timeout: 5000});

let member = message.guild.member(kullanıcı);

if (!member.voice.channel) return message.channel.send(new Discord.MessageEmbed().setDescription('Etiketlenen Kullanıcı Ses Kanalında Değil.').setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor(Config.Embed.Color).setFooter(Config.Embed.Footer)).then(m => m.delete,{timeout: 5000});

const voiceChannel = message.member.voice.channel.id;
if (!voiceChannel) return;
  
let log = new Discord.MessageEmbed()
.setColor(Config.Embed.Color).setFooter(Config.Embed.Footer)
.setDescription(`${kullanıcı}, ${message.author} Seni \`${message.member.voice.channel.name}\` Odasına Çekmek İstiyor. Kabul ediyormusun ?`)
  
let mesaj = await message.channel.send(log)
await mesaj.react(onaylama)
await mesaj.react(reddetme)
mesaj.awaitReactions(filter, {
max: 1,
time: 60000,
errors: ['time']
}).then(collected => {
const reaction = collected.first();
if (reaction.emoji.id === onaylama) {
let kabul = new Discord.MessageEmbed()
.setColor(Config.Embed.Color).setFooter(Config.Embed.Footer)
.setDescription(`${kullanıcı} Odaya Çekilme Teklifini Onayladı`)
message.channel.send(kabul)
kullanıcı.voice.setChannel(message.member.voice.channel.id)
} else {
let stiprus = new Discord.MessageEmbed()
.setColor(Config.Embed.Color).setFooter(Config.Embed.Footer)
.setDescription(`${kullanıcı} Odaya Çekilme Teklifini Reddetti`)
message.channel.send(stiprus)
}
})
}


exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["gel"],
  permLevel: 0,
}

exports.help = {
  name: 'çek',
  description: 'Etiketlediğiniz kişiye odaya çekme isteği yollar. / Stiprus was here',
  usage: 'çek'
}