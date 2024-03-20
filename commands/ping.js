const { SlashCommandBuilder } = require("discord.js"); //빗금치는 명령어생성 

module.exports = {
  data: new SlashCommandBuilder()
    .setName("핑") // 이름
    .setDescription("퐁 이라고 대답할까요?"), // 설명
  async execute(interaction) {
    await interaction.editReply("퐁"); // 실행한 action의 결과 
  },
};// exports -> 내보내기용
