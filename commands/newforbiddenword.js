//과제2.금지어를 /금지어등록 명령어로 사용자가 금지어를 추가할 수 있게 해보기
const { SlashCommandBuilder } = require("discord.js"); //빗금치는 명령어생성 

module.exports = {
  data: new SlashCommandBuilder()
    .setName("쿠로미_금지어등록") // 이름
    .setDescription("이 말은 좀 불편해요~!") // 설명
    .addStringOption(option =>
      option.setName(`forbidden_word`)
        .setDescription(`새롭게 금지어로 등록할게요.`)),
  async execute(interaction) {
    const forbidden_word = interaction.options.getString(`forbidden_word`);
    global.forbidden_words.push(forbidden_word);
    console.log(`${forbidden_word}을 금지어로 추가했습니다.`);
    await interaction.editReply(`${forbidden_word} 금지어 추가 완료!`); // 실행한 action의 결과 
  },
};