const Discord = require('discord.js');
const client = new Discord.Client({ restTimeOffset: 10 });       
const config = require("./Ayarlamalar/Config.json");
const settings = require("./Ayarlamalar/Settings.json");
const fs = require("fs");
const db = require("quick.db");
const moment = require("moment");
require("moment-duration-format");
const AsciiTable = require('ascii-table');
global.conf = config; 
global.client = client;
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
let Prefix = config.Bot.Prefix;


fs.readdirSync('./Komutlar').forEach(dir => {
const commandFiles = fs.readdirSync(`./Komutlar/${dir}/`).filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
  const stiprus = require(`./Komutlar/${dir}/${file}`);
  var table = new AsciiTable('Stiprus Komut Tablosu');
  table.setHeading("Komut", 'Durum', "Aliases")
  if (stiprus.help.name) {
  client.commands.set(stiprus.help.name, stiprus);
  table.addRow(stiprus.help.name, "✔️", stiprus.conf.aliases)
} else {
  table.addRow(stiprus.help.name, "❌")
  continue;
    }
    stiprus.conf.aliases.forEach(alias => {
      client.aliases.set(alias, stiprus.help.name);
    });
    console.log(table.toString())
  }
})


client.on("message", async message => {
  let client = message.client;
  let Prefix = await db.fetch(`prefix.${message.guild.id}`) || config.Bot.Prefix
  if (message.author.bot) return;
  if (!message.content.startsWith(Prefix)) return;
  let command = message.content.split(' ')[0].slice(Prefix.length);
  let params = message.content.split(' ').slice(1);
  let perms = client.elevation(message);
  let cmd;
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }
  if (cmd) {
    if (perms < cmd.conf.permLevel) return;
    cmd.run(client, message, params, perms);
  }
});


client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === config) permlvl = 4;
  return permlvl;
};


client.on('ready', () => {
  console.log(`Bot ${client.user.tag} Kullanıcı Adıyla Giriş Yaptı!`);

});
client.on("ready", async () => {
  client.user.setPresence({ activity: { name: config.Bot.Activity }, status: config.Bot.Status }, {type: config.Bot.Status_Type});
  client.channels.cache.get(config.Bot.Voice_Channel).join().catch();
 });


const backup = () => {
  fs.copyFile('./json.sqlite', `./Database/Data • ${moment().format('D-M-YYYY • H.mm.ss')} • stiprus.sqlite`, err => {
      if (err) return console.log(err);
      console.log(`Database Yedeklendi. ${moment().format('D-M-YYYY - H.mm.ss')}`);
  });
};
client.on('ready', () => {
  setInterval(() => backup(), 1000 * 60 * 60 * 24); 
});


client.on("guildMemberAdd", member => {
require("moment-duration-format")
const kanal = settings.Channels.Welcome;
let user = client.users.cache.get(member.id);
const hesapkurulus = new Date().getTime() - user.createdAt.getTime();  
const gecengun = moment.duration(hesapkurulus).format(` YY **[Yıl]** DD **[Gün]** HH **[Saat]** mm **[Dakika]**`) 
var kisisayısı = member.guild.members.cache.size.toString().replace(/ /g, "    ")
var stipruscuk = kisisayısı.match(/([0-9])/g)
kisisayısı = kisisayısı.replace(/([a-zA-Z])/g, "bilinmiyor").toLowerCase()
if(stipruscuk) {
kisisayısı = kisisayısı.replace(/([0-9])/g, d => {
return {
'0': settings.Emojis.Sayı_0,
'1': settings.Emojis.Sayı_1,
'2': settings.Emojis.Sayı_2,
'3': settings.Emojis.Sayı_3,
'4': settings.Emojis.Sayı_4,
'5': settings.Emojis.Sayı_5,
'6': settings.Emojis.Sayı_6,
'7': settings.Emojis.Sayı_7,
'8': settings.Emojis.Sayı_8,
'9': settings.Emojis.Sayı_9}[d];
})
}
var hesapkontrol;
if (hesapkurulus < 1296000000)
hesapkontrol = `Tehlikeli ${settings.Emojis.Dangerous}`;
if (hesapkurulus > 1296000000)
hesapkontrol = `Güvenli ${settings.Emojis.Safe}`;
moment.locale("tr");
let stipruskanal = client.channels.cache.get(kanal);
stipruskanal.send(`${member} <@&${settings.Roles.Register_Permission}>`,new Discord.MessageEmbed()
.setColor(settings.Embed.Color)
.setImage(settings.Embed.Image)
.setDescription(`
${settings.Emojis.Emoji_1} **Sunucumuza Hoşgeldin <@${member.id}> Umarım İyi Vakit Geçirirsin.** 
  
${settings.Emojis.Emoji_2} **Seninle Beraber ${kisisayısı} Kişi Olduk.**

${settings.Emojis.Emoji_3} **Kayıt Olmak İçin İsim Yaş Yazıp <@&${settings.Roles.Register_Permission}> Rolünü Etiketleyiniz.**

${settings.Emojis.Emoji_4} **Tagımızı (\`${settings.Server.Tag}\`) Kullanıcı Adına Alarak <@&${settings.Roles.Tagged}> Rolüne Sahip Olabilirsin.**
  
${settings.Emojis.Emoji_5} **Hesabın \`${gecengun}\` Önce Oluşturulmuş ve Hesabın ${hesapkontrol} Gözüküyor.**

${settings.Emojis.Emoji_6} **<#${settings.Channels.Kurallar}> Kanalına Göz Atmayı Unutma! Kuralları Oku Lütfen.**
`)
);
});
  

client.on("guildMemberAdd", member => {
member.setNickname(settings.Server.Register_Name)
if (member.user.bot) {
member.roles.add(settings.Roles.Bots) 
} else {
member.roles.add(settings.Roles.Unregistered) 
};
});

client.on("message" , async (msg, message) => {
  
  if(!msg.guild) return;
  if(msg.content.startsWith(Prefix+"afk")) return; 
  
  let afk = msg.mentions.users.first()
  
  const kisi = db.fetch(`afkid_${msg.author.id}_${msg.guild.id}`)
  
  const isim = db.fetch(`afkAd_${msg.author.id}_${msg.guild.id}`)
 if(afk){
   const sebep = db.fetch(`afkSebep_${afk.id}_${msg.guild.id}`)
   const kisi3 = db.fetch(`afkid_${afk.id}_${msg.guild.id}`)
   if(msg.content.includes(kisi3)){

       msg.channel.send(new Discord.MessageEmbed().setColor(Config.Embed.Color).setFooter(Config.Embed.Footer).setAuthor(msg.member.displayName, msg.author.avatarURL({dynamic: true})).setDescription(`<@` + msg.author.id + `> Etiketlediğiniz Kişi **Afk \nSebep:** \`${sebep}\``))
   }
 }
  if(msg.author.id === kisi){

       msg.channel.send(new Discord.MessageEmbed().setColor(Config.Embed.Color).setFooter(Config.Embed.Footer).setAuthor(msg.member.displayName, msg.author.avatarURL({dynamic: true})).setDescription(`<@${kisi}> Başarıyla Afk Modundan Çıktınız`))
   db.delete(`afkSebep_${msg.author.id}_${msg.guild.id}`)
   db.delete(`afkid_${msg.author.id}_${msg.guild.id}`)
   db.delete(`afkAd_${msg.author.id}_${msg.guild.id}`)
    msg.member.setNickname(isim)
    
  }
  
});

///Tag-Alana-Rol///

const ayarlar = require('./Ayarlamalar/Config.json');
const Config = require('./Ayarlamalar/Settings.json')

client.on("userUpdate", async (oldUser, newUser) => {
  if (oldUser.username !== newUser.username) {
  const tag = Config.Server.Tag
  const sunucu = Config.Server.ID
  const kanal = Config.Channels.Tag_Log
  const rol = Config.Roles.Tagged

  try {

  if (newUser.username.includes(tag) && !client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.cache.has(rol)) {
  await client.channels.cache.get(kanal).send(new Discord.MessageEmbed().setColor(Config.Embed.Color).setFooter(Config.Embed.Footer).setDescription(`**${newUser} Tagımızı Aldığı İçin <@&${rol}> Rolünü Verdim**`)).then(x => x.react('851923111493894184'));
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.add(rol);
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).send(`**Selam <@${newUser.id}>, Sunucumuzda \`${tag}\` Tagımızı Aldığın İçin \`@${client.guilds.cache.get(sunucu).roles.cache.get(rol).name}\` Rolünü Sana Verdim!**`).then(x => x.react('851923111493894184')) // Kalp emoji ID si
  }
  if (!newUser.username.includes(tag) && client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.cache.has(rol)) {
  await client.channels.cache.get(kanal).send(new Discord.MessageEmbed().setColor(Config.Embed.Color).setFooter(Config.Embed.Footer).setDescription(`**${newUser} Tagımızı Çıkardığı İçin <@&${rol}> Rolünü Aldım**`)).then(x => x.react('856636753044963328'));
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).roles.remove(rol);
  await client.guilds.cache.get(sunucu).members.cache.get(newUser.id).send(`**Selam <@${newUser.id}>, Sunucumuzda \`${tag}\` Tagımızı Çıkardığın İçin \`@${client.guilds.cache.get(sunucu).roles.cache.get(rol).name}\` Rolünü Senden Aldım!**`).then(x => x.react('856636753044963328')) // Kırık kalp emoji ID si
  }
} catch (e) {
console.log(`Bir hata oluştu! ${e}`)
 }
}
});

client.login(process.env.token);