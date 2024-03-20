const { Events } = require("discord.js");

module.exports = {
    name: Events.GuildMemberAdd,
    once: false,
    async execute(member) {
        const channel = member.guild.channels.cache.find(channel => channel.name === "일반");
        await console.log(`User ${member.id} join!`);
        await channel.send('hello!'); 

    },
};