const reqEvent = (event) =require(`../events/${event}`);

module.exports = client => {
    /**
     * This handles all the events needed for the bot
     * No need to toggle anything here
     */

     client.on("ready", () => reqEvent("ready")(client));
     client.on("reconnecting", () => reqEvent("reconnecting")(client));
     client.on("disconnect", () => reqEvent("disconnect")(client));
     client.on("error", () => reqEvent("error")(client));
     client.on("message", async message => reqEvent("message")(client,message));
}