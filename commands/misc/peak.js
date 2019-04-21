const Discord = require("discord.js"); 
const message_sent = require("../../message_sent.json");

module.exports.run = async (bot, message, args) => {
    /**
     * Feel very free to change this or contact me on how you would like it 
     * properly formatted, I feel as if this might not be professional looking
     * so you might need to change it.
     */
   let todaysHighest = message.guild.members.find(m => m.user.id === message_sent.todaysRecord[0]).user;
   let oatHighest = message.guild.members.find(m => m.user.id === message_sent.oatRecord[0]).user;
   let leaderboard = new Discord.RichEmbed()
   .setAuthor(bot.user.username)
   .setColor([109, 15, 3])
   .addBlankField()
   .setTitle("Leaderboard")
   .setThumbnail(bot.user.avatarURL)
   .addField("Most Active User Of All Time:",oatHighest.username,false)
   .addField("Messages sent:",message_sent.oatRecord[1],false)
   .addField("Most Active User Of Today:",todaysHighest.username,false)
   .addField("Messages sent:",message_sent.todaysRecord[1],false)
   .setFooter(message.author.username,message.author.avatarURL)
   .addField(message.author.username , message_sent[message.author.id],true)
   .setTimestamp()
   message.channel.send(leaderboard);
} 

module.exports.help = {
   name: "peak",
   description: "Peak at the most messages for the day."
}