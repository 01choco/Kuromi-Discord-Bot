const { Events } = require("discord.js");

module.exports = {
    name: Events.MessageCreate,
    once: false,
    async execute(msg) {
        const a = msg.author;
        if (msg.member.user.bot) return;
        if (global.forbidden_words.find((word) => msg.content.includes(word))) {
           await msg.delete();
           await msg.channel.send(`${a}아 그런 말 하지 마`);
        }

        if(Math.random()>0.9){
        msg.channel.send(global.scriptlist[Math.floor(Math.random()*global.scriptlist.length)]);
        }
    },
};