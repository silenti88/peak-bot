const Discord = require("discord.js"); 
const message_sent = require("../../message_sent.json");

module.exports.run = async (client, message, args, userMessages) => {
    /**
     * Feel very free to change this or contact me on how you would like it 
     * properly formatted, I feel as if this might not be professional looking
     * so you might need to change it.
     */ 
   let todaysHighest = client.users.get(message_sent.userToday[0]).username;
   let oatUser = client.users.find(u => u.id === message_sent.userOAT[0]);
   
   if(message_sent.userOAT[0] === "user"){
      message.channel.send("There is no previous highest of all time. The most active of today however is "+todaysHighest+" with "+message_sent.userToday[1]+" messages");
   }else{
      oatUser = oatUser.username;
      let reply = "**__Today Statistics__**\n\n**__Server Statistics__**\n"
      reply += "So far today we have "+userMessages.get("serverToday")+" the current record is "
      reply += message_sent.serverOAT[0]+" set on "+message_sent.serverOAT[1]+".\n\n"
      reply += "**__User Statistics__**\nThe highest message sent by one user is "+message_sent.userOAT[1]+' on '+message_sent.userOAT[2]+' by '+oatUser+"."
      reply += " The current highest of today is "+message_sent.userToday[1]+" set by "+todaysHighest+"."
      
      message.channel.send(reply);
   }

} 

module.exports.help = {
   name: "peak",
   description: "Peak at the most messages for the day."
}
