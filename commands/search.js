const { SlashCommandBuilder } = require("discord.js");
const { trigger } = require("../music_modules/stream.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("search")
    .setDescription("유튜브에서 영상을 검색합니다")
    .addStringOption((option) =>
      option
        .setName("request")
        .setDescription("영상 Url이나 검색하고싶은 키워드를 입력해주세요")
        .setRequired(true)
    ),
  async execute(interaction) {
    const searchWord = interaction.options.getString("request");
    await trigger(interaction, searchWord);
  },
};
