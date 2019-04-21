const Discord = require("discord.js");
const fs = require("fs")

module.exports = async (client) => {
        // Runs when bot goes online, nothing to change
        console.log(`Logged in as ${client.user.username}!`);
        client.user.setActivity(`Prefix is "/" !`,{type:"PLAYING"});

}