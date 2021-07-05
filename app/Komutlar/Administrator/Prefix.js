const Discord = require('discord.js')
const db = require('quick.db');
const ayarlar = require('../../Ayarlamalar/Config.json')
const Config = require("../../Ayarlamalar/Settings.json");
exports.run = async (client, message, args) => {
let a = ayarlar.Bot.Prefix
    let p = await db.fetch(`prefix.${message.guild.id}`) || ayarlar.Bot.Prefix
 let o = await db.fetch(`prefix.${message.guild.id}`)
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(new Discord.MessageEmbed()
.setColor(Config.Embed.Color).setFooter(Config.Embed.Footer).setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
.setDescription(`<:r_partner_3d:848242028617531392>  **Bu Komutu Kullanabilmek İçin \`Mesajları Yönet\` Yetkisine Sahip Olmalısınız.**`).then(x => x.delete({timeout: Config.Embed.Timeout})));
  
if(args[0] === "ayarla") {
if(o) { return message.channel.send(new Discord. MessageEmbed()
                                         .setColor(Config.Embed.Color).setFooter(Config.Embed.Footer).setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
.setDescription(`**Ayarlanmış Şeyi Tekrar Ayarlıyamassın | Şuanki Prefix:** \`${p}\` **Sıfırlamak İçin** \`${p}\`**prefix sıfırla**`));
      }
if(!args[1]) return message.channel.send(new Discord.MessageEmbed()
                                              .setColor(Config.Embed.Color).setFooter(Config.Embed.Footer).setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
.setDescription(`<:r_partner_3d:848242028617531392>   **Bir Prefix Girip Tekrar Dene |  Şuanki Prefix:** \`${p}\``));
db.set(`prefix.${message.guild.id}`, args[1])
message.channel.send(new Discord.MessageEmbed()
                          .setColor(Config.Embed.Color).setFooter(Config.Embed.Footer).setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
.setDescription(`<:r_partner_3d:848242028617531392>   **Prefix Başarıyla Ayarlandı | Şuanki Prefix:** \`${args[1]}\``));
}
    if(args[0] === "sıfırla") {
    if(!o) {
       return message.channel.send(new Discord.MessageEmbed()
                                        .setColor(Config.Embed.Color).setFooter(Config.Embed.Footer).setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
.setDescription(`<:r_partner_3d:848242028617531392>  **Ayarlanmayan Prefixi Sıfırlayamazsınız | Şuanki Prefix:** \`${p}\``));
    }
    db.delete(`prefix.${message.guild.id}`)       
   return message.channel.send(new Discord.MessageEmbed()
                                    .setColor(Config.Embed.Color).setFooter(Config.Embed.Footer).setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))
.setDescription(`<:r_partner_3d:848242028617531392>  **Prefix Başarıyla Sıfırlandı | Şuanki Prefix:** \`${a}\``));
  }
 
 if(!args[0]) return message.channel.send(new Discord.MessageEmbed()     
                  .setColor(Config.Embed.Color).setFooter(Config.Embed.Footer).setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true}))                     
.setDescription(`<:r_partner_3d:848242028617531392>  **Prefix Ayarlamak İçin** \`${p}\`**prefix ayarla <prefix>**\n <:r_partner_3d:848242028617531392>  **Sıfırlamak İçin** \`${p}\`**prefix sıfırla | Şuanki Prefix:** \`${p}\``));
  
};
exports.conf = {
  aliases: ["prefix"],
  permLevel: 0
};

exports.help = {
  name: 'prefix',
  description: 'Prefixi ayarlamınızı sağlar. / Stiprus was here',
  usage: 'prefix'
};