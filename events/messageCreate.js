const client = require("../index");
const openai = require("../modules/openAI");

client.on("messageCreate", async (message) => {
    if(message.content != "" && !message.content.toLowerCase().startsWith(process.env.BOT_PREFIX) && !message.author.bot) {
        let result = await openai(message.content);
        if (result.length <= 0 || !result || result == "" || result == null) message.reply("Ha ocurrido un error, inténtalo de nuevo.");
        if(message.channel.type = "DM") {
            message.author.send(result);
        } else {
            message.reply(result);
        }
    }

    if (
        message.author.bot ||
        !message.content.toLowerCase().startsWith(process.env.BOT_PREFIX)
    )
        return;

    const [cmd, ...args] = message.content
        .slice(process.env.BOT_PREFIX)
        .trim()
        .split(/ +/g);

    const command = client.commands.get(cmd.toLowerCase()) || client.commands.find(c => c.aliases?.includes(cmd.toLowerCase()));

    if (!command) return;
    await command.run(client, message, args);
});
