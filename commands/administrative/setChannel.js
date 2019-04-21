const fs = require("fs");
const announcementChannel = require("../../announcementChannel.json");

/**
 * DO NOT CHANGE ANYTHING HERE !!!
 * THIS IS THE COMMAND THAT SETS THE ANNOUNCEMENT CHANNEL
 */
module.exports.run = async (client, message, args) => {
    if(!message.member.hasPermission("ADMINISTRATOR") && message.author.id !== "316671807052578827")  return message.channel.send("can you not?");

    if(!args[0]) return message.channel.send("You have to mention a channel!!");
    if(!message.guild.channels.find(ch=>ch.name === args[0])) return message.channel.send("that isnt a channel");
    announcementChannel.channel = args[0];
    fs.writeFile("announcementChannel.json",JSON.stringify(announcementChannel), (err) => {
        console.error();
    });
    message.channel.send("DONE!!!");
} 

module.exports.help = {
   name: "setChannel",
   description: "SETS ANNOUNCEMENT CHANNEL"
}
