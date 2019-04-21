const fs = require("fs");
const announcementChannel = require("../../announcementChannel.json");

/**
 * DO NOT CHANGE ANyTHING HERE !!!
 * THIS IS THE COMMAND THAT SETS THE ANNOUNCEMENT CHANNEL
 */
module.exports.run = async (client, message, args) => {
    if(!message.member.hasPermission("ADMINISTRATOR"))  return;

    if(!args[0]) return message.channel.send("You have to mention a channel!!");

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
