const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const ayarlar = require('../../Ayarlamalar/Config.json');
const Config = require('../../Ayarlamalar/Settings.json');

exports.run = async (client, message, args) => {
  const kisi = db.fetch(`afkid_${message.author.id}_${message.guild.id}`);
  if (kisi) return;
  const sebep = args[0];
  if (!args[0]) {
    let kullanıcı = message.guild.members.cache.get(message.author.id);
    const b = kullanıcı.displayName;

    await db.set(
      `afkSebep_${message.author.id}_${message.guild.id}`,
      "Sebep Girilmemiş"
    );
    await db.set(
      `afkid_${message.author.id}_${message.guild.id}`,
      message.author.id
    );
    await db.set(`afkAd_${message.author.id}_${message.guild.id}`, b);

    const ramo = await db.fetch(
      `afkSebep_${message.author.id}_${message.guild.id}`
    );

   message.channel.send(new MessageEmbed().setColor(Config.Embed.Color).setFooter(Config.Embed.Footer).setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setDescription(`${kullanıcı} Başarıyla Afk Oldunuz Afk Olmanızın Sebebi: **${ramo}**`));

    message.member.setNickname(`[AFK] ` + b);
  }
  if (args[0]) {
    let sebep = args.join(" ");
    let kullanıcı = message.guild.members.cache.get(message.author.id);
    const b = kullanıcı.displayName;
    await db.set(`afkSebep_${message.author.id}_${message.guild.id}`, sebep);
    await db.set(
      `afkid_${message.author.id}_${message.guild.id}`,
      message.author.id
    );
    await db.set(`afkAd_${message.author.id}_${message.guild.id}`, b);
    const ramo = await db.fetch(
      `afkSebep_${message.author.id}_${message.guild.id}`
    );

   message.channel.send(new MessageEmbed().setColor(Config.Embed.Color).setFooter(Config.Embed.Footer).setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setDescription(`${kullanıcı} Başarıyla Afk Oldunuz Afk Olmanızın Sebebi: **${ramo}**`));

    message.member.setNickname(`[AFK] ` + b);
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['awayfromkeyboard'],
  permLevel: 0
};

exports.help = {
  name: "afk",
  description: 'Afk olmanızı sağlar. / Stiprus was here',
  usage: "afk / afk <sebep>"
};

