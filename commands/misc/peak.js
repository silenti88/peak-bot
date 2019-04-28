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
      message.channel.send('The current highest of all time is '+oatUser+" with "+message_sent.userOAT[1]+". The most active of today so far is "+todaysHighest);
   }

} 

module.exports.help = {
   name: "peak",
   description: "Peak at the most messages for the day."
}