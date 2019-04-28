const Discord = require("discord.js");
const client = new Discord.Client();
const Enmap = require("enmap")
let userMessages = new Enmap();
const announcementChannel = require("./announcementChannel.json");
let message_sent = require("./message_sent.json");
const fs = require("fs");
client.commands = new Discord.Collection();
require("./util/eventHandler")(client,userMessages);

if(announcementChannel.channel !== "undefined"){
    let dayInMilliseconds = 1000 * 30;
    let today = new Date();
    setInterval(function announce(){
        /**
         * This is the announcement at the end of the day feel free to 
         * change this to suite your needs.
         */
        let monthNames = [
            "January", "February", "March",
            "April", "May", "June", "July",
            "August", "September", "October",
            "November", "December"
        ];
        
        let day = today.getDate();
        let mIndex = today.getMonth();
        let year = today.getFullYear();
        
        
        let announcement = "__**"+monthNames[mIndex]+" "+day+" "+year+"**__\n\n**__Server Statistics:__**\n";
        if(userMessages.get("serverToday") > message_sent.serverOAT[0]){
            announcement += `\nMilestone: New peak was reached! A total of ${userMessages.get("serverToday")} messages`;
            announcement += ` were written today! Previous record was ${message_sent.serverOAT[0]} which was `;
            announcement += `set on ${message_sent.serverOAT[1]}\n\nTotal Messages Today: ${userMessages.get("serverToday")}`;
            
            message_sent.serverOAT[0] = userMessages.get("serverToday");
            message_sent.serverOAT[1] = `${monthNames[mIndex]} ${day}, ${year}`;

        }else{
            announcement += `Total Messages Today: ${userMessages.get("serverToday")}\n`;
            announcement += `Most Active Day Ever: ${message_sent.serverOAT[0]}\n(${message_sent.serverOAT[1]})`;

        }
        if(message_sent.userToday[1] > message_sent.userOAT[1]){
            announcement += `\n\n**__User Statistics__**\nMilestone: A new peak was reached! `;
            announcement += `The total of ${message_sent.userToday[1]} by ${client.users.get(message_sent.userToday[0])} is a new `;
            announcement += `record! Previous record was ${message_sent.userOAT[1]} by ${client.users.get(message_sent.userOAT[0])} which `;
            announcement += `was set on ${message_sent.userOAT[2]}`;
            announcement += `\nMost Active User Today: ${client.users.get(message_sent.userToday[0])}\n(${message_sent.userToday[1]})`;

            message_sent.userOAT[0] = message_sent.userToday[0];
            message_sent.userOAT[1] = message_sent.userToday[1];
            message_sent.userOAT[2] = `${monthNames[mIndex]} ${day}, ${year}`;

        }else{
            announcement += `\n\n**__User Statistics__**\n`;
            announcement += `Most Active User Today: ${client.users.get(message_sent.userToday[0])}(${message_sent.userToday[1]})\n`;
            announcement += `Most Active User on a single day: ${client.users.get(message_sent.userOAT[0])}(${message_sent.userOAT[1]})`;
            announcement += `${message_sent.userOAT[2]}`;

        }
        userMessages.clear()
        message_sent.userToday[0] = 'user';
        message_sent.userToday[1] = 0;
        fs.writeFile('message_sent.json',JSON.stringify(message_sent),(err)=>{console.error()});
        client.channels.find(ch => ch.name === announcementChannel.channel).send(announcement);

    },dayInMilliseconds);
}
// Please enter your token for your bot or it will not run!!!
client.login("ENTERTOKENHERE");