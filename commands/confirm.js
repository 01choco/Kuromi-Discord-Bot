//과제1-2./인증 명령어로 역할을 부여하거나, "인증되었습니다" 라고 메시지 응답하기
const { SlashCommandBuilder } = require("discord.js"); //빗금치는 명령어생성 
require("dotenv").config();

module.exports = {
  data: new SlashCommandBuilder()
    .setName("인증") // 이름
    .setDescription("확인 및 역할 부여!"), // 설명
  async execute(interaction) {
    await interaction.member.roles.add(process.env.ROLE_ID2);
    await interaction.editReply('인증되었습니다. kuromi_role 역할을 부여하였습니다.');
  },
};