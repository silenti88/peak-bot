const Discord = require("discord.js"); 
const message_sent = require("../../message_sent.json");
// {"todaysRecord":["316671807052578827",16,24],"oatRecord":["defaultUser",0,"defaultDateUser",0,"defaultDateGuild"]}
module.exports.run = async (client, message, args) => {
    /**
     * Feel very free to change this or contact me on how you would like it 
     * properly formatted, I feel as if this might not be professional looking
     * so you might need to change it.
     */ 
   let oatHighest = message_sent.oatRecord[0]
   let todaysHighest = message.guild.members.find(m => m.user.id === message_sent.todaysRecord[0]).user;
   if(oatHighest !== "defaultUser"){
      oatHighest = message.guild.members.find(m => m.user.id === message_sent.oatRecord[0]).user;
   }else{
      oatHighest.username = "defaultUser";
   }
   let leaderboard = new Discord.RichEmbed()
   .setAuthor(client.user.username)
   .setColor([109, 15, 3])
   .addBlankField()
   .setTitle("Leaderboard")
   .setThumbnail(client.user.avatarURL)
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