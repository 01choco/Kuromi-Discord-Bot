require("dotenv").config();

const { REST, Routes } = require("discord.js");
const fs = require("fs");
const { memoryUsage } = require("process");

const commands = [];
const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  commands.push(command.data.toJSON());
}

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log(`detected ${commands.length} commands. start registering.`);
    const data = await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID3
      ),
      { body: commands }
    );

    console.log(`${data.length} commands sucessfully reloaded.`);
  } catch (error) {
    console.log(error);
  }
})();
