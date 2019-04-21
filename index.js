const Discord = require("discord.js");
const client = new Discord.Client();
const announcementChannel = require("./announcementChannel.json")
const message_sent = require("./message_sent.json")
client.commands = new Discord.Collection();
require("./util/eventHandler")(client);

function announce(){
    /**
     * This is the announcement at the end of the day feel free to 
     * change this to suite your needs.
     */
    client.channels.find(ch => ch.name === announcementChannel.channel).send(`__**Todays Record**__\n ${message_sent.todaysRecord[0]}:${message_sent.todaysRecord[1]}\n\n__**All Time**__\n ${message_sent.oatRecord[0]}:${message_sent.oatRecord[1]}`);
}

if(announcementChannel.channel !== "undefined"){
    let dayInMilliseconds = 1000 * 60 * 60 * 24;
    setInterval(announce,dayInMilliseconds );
}
// Please enter your token for your bot or it will not run!!!
client.login("EnterYourTokenHere");