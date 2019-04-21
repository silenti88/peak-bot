const Discord = require("discord.js");
const client = new Discord.Client();
const announcementChannel = require("./announcementChannel.json")
let message_sent = require("./message_sent.json")
const fs = require("fs")
client.commands = new Discord.Collection();
require("./util/eventHandler")(client);

if(announcementChannel.channel !== "undefined"){
    let dayInMilliseconds = 1000 * 60 * 60 * 24;
    let timer = setInterval(function announce(){
        /**
         * This is the announcement at the end of the day feel free to 
         * change this to suite your needs.
         */
        let newAnnouncementMessage = new Discord.RichEmbed()
        .setAuthor("peak-bot")
        .setTitle("STATS")
        .setDescription(`We have surpassed all previous messages per day with a whopping ${message_sent.todaysRecord[2]} messages. With the previous record being ${message_sent.oatRecord[3]}`)
        .addField("Most Active User(today)","Score",false)
        .addField(`${message_sent.todaysRecord[0]}`,`${message_sent.todaysRecord[1]}`,false)
        .addField("Most Active User(Of All Time)","Score",false)
        .addField(`${message_sent.oatRecord[0]}`,`${message_sent.oatRecord[1]}`,false)
        .setColor(3447003)
    
        let announcementMessage = new Discord.RichEmbed()
        .setAuthor("peak-bot")
        .setTitle("STATS")
        .setDescription(`We had ${message_sent.todaysRecord[2]} today but sadly we could not surpass our highest record of ${message_sent.oatRecord[3]}`)
        .addField("Most Active User(today)","Score",true)
        .addField(`${message_sent.todaysRecord[0]}`,`${message_sent.todaysRecord[1]}`,true)
        .addField("Most Active User(Of All Time)","Score",true)
        .addField(`${message_sent.oatRecord[0]}`,`${message_sent.oatRecord[1]}`,true)
        .setColor(3447003)
    
    
        if(message_sent.oatRecord[3] < message_sent.todaysRecord[2]){
            client.channels.find(ch => ch.name === announcementChannel.channel).send(newAnnouncementMessage);
            message_sent.oatRecord[3] = message_sent.todaysRecord[2];
            message_sent.oatRecord[4] = Date.now() - 5000 ;
            if(message_sent.oatRecord[1] < message_sent.todaysRecord[1]){
                message_sent.oatRecord[0] = message_sent.todaysRecord[0];
                message_sent.oatRecord[1] = message_sent.todaysRecord[1];
                message_sent.oatRecord[2] = Date.now()-5000
            }
        }else{
            client.channels.find(ch => ch.name === announcementChannel.channel).send(announcementMessage);
        }
        message_sent.todaysRecord[0] = "Default";
        message_sent.todaysRecord[1] = 0;
        message_sent = {"todaysRecord":["defaultUser",0,0],"oatRecord":[message_sent.oatRecord[0],message_sent.oatRecord[1],message_sent.oatRecord[2],message_sent.oatRecord[3],message_sent.oatRecord[4]]}
        fs.writeFile("message_sent.json",JSON.stringify(message_sent),(err)=>{console.error});
    },dayInMilliseconds);
}
// Please enter your token for your bot or it will not run!!!
client.login("EnterYourTokenHere");