const Discord = require("discord.js");
const fs = require ("fs");
const message_sent = require("../message_sent.json");


module.exports = async (client,message) => {
    /**
     * I STRONGLY ADVISE NOT TO CHANGE ANYTHING HERE
     * MOST IMPORTANT THINGS ARE IN HERE AKA THE PART THAT WAS REQUESTED
     */
    client.commands = new Discord.Collection();
    if(message.channel.type === "dm") return;
    if(message.author.bot) return;

    message_sent.todaysRecord[2] += 1

    if(message_sent[message.author.id]){

        message_sent[message.author.id] += 1;

        if(message_sent.todaysRecord[1] < message_sent[message.author.id]){
            message_sent.todaysRecord[0] = message.author.id;
            message_sent.todaysRecord[1] = message_sent[message.author.id];
        }

    }else{message_sent[message.author.id] = 1}
    
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
                        cmdFile.run(client,message,args);
                    }
                });
            });
        });
    }catch (err){
        console.error();
    }
}