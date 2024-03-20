const { SlashCommandBuilder } = require("discord.js");
const { trigger } = require("../music_modules/stream.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("skip")
    .setDescription("다음 음악을 재생합니다."),
async execute(interaction) {
    if(GlobalAudioPlayer) {
        GlobalAudioPlayer.stop();
    } else {
        interaction.editReply("노래를 먼저 재생해주세요..")
    }
  }
};
