const { SlashCommandBuilder } = require("discord.js"); //빗금치는 명령어생성 
const scriptlist = ["안녕하세요", "어쩌라구", "아무말입니다", "자고싶다"];
module.exports = {
  data: new SlashCommandBuilder()
    .setName("아무말하기") // 이름
    .setDescription("진짜로 아무 말을 합니다."), // 설명
  async execute(interaction) {
    const index = Math.floor(Math.random() * scriptlist.length);
    await interaction.editReply(scriptlist[index]); // 실행한 action의 결과 
  },
};// exports -> 내보내기용