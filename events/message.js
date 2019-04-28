const Discord = require("discord.js");
const fs = require ("fs");
const message_sent = require("../message_sent.json");


module.exports = async (client,message,userMessages) => {
    /**
     * I STRONGLY ADVISE NOT TO CHANGE ANYTHING HERE
     * MOST IMPORTANT THINGS ARE IN HERE AKA THE PART THAT WAS REQUESTED
     */
    client.commands = new Discord.Collection();
    if(message.channel.type === "dm") return;
    if(message.author.bot) return;

    if(userMessages.has("serverToday")) userMessages.inc("serverToday")
    else userMessages.set("serverToday",1)

    let userid = message.author.id;
    
    if(userMessages.has(userid)){

        userMessages.inc(userid);

        if(message_sent.userToday[1] < userMessages.get(userid)){
            message_sent.userToday[0] = message.author.id;
            message_sent.userToday[1] = userMessages.get(userid);
        }

    }else userMessages.set(userid,1);

    fs.writeFile("message_sent.json",JSON.stringify(message_sent), (err)=>{console.error});

    
    if(!message.content.startsWith("/")) return;
    
    
    let messageArray = message.content.split(" ");
    let cmd = messageArray.shift().slice(1);
    let args = messageArray;
    let cmdFile = "";

    try{
        fs.readdir("./commands", (err,folders)=>{
            folders.forEach((files,i) => {
                fs.readdir(`./commands/${files}`, (err,commands) => {
                    if(commands.includes(`${cmd}.js`)){
                        cmdFile = require(`../commands/${files}/${cmd}.js`);
                        if(cmd !== 'peak')  cmdFile.run(client,message,args);
                        else cmdFile.run(client,message,args,userMessages);
                    }
                });
            });
        });
    }catch (err){
        console.error();
    }
}