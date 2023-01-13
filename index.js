const { Client, Collection } = require("discord.js");
require('dotenv').config()

const client = new Client({
    intents: 32767,
    partials: [
        'CHANNEL', // Required to receive DMs
    ]
});
module.exports = client;

// Global Variables
client.commands = new Collection();
client.slashCommands = new Collection();

// Initializing the project
require("./handler")(client);

client.login(process.env.BOT_TOKEN);
