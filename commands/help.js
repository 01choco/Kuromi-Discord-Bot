const { SlashCommandBuilder, EmbedBuilder } = require("discord.js"); //빗금치는 명령어생성 

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help") // 이름
    .setDescription("커맨드의 기능을 설명합니다."), // 설명
  async execute(interaction) {
    const replyEmbed = {
      color: 0xc79be9,
      title: 'Slash Command Helper',
      author: {
        name: '01choco',
        icon_url: 'https://img.insight.co.kr/static/2019/01/10/700/2ns73968u56vpfgx517k.jpg',
        url: 'https://github.com/01choco',
      },
      description: 'kuromi 봇의 슬래시 커맨드 기능을 설명합니다.',
      thumbnail: {
        url: 'https://pbs.twimg.com/profile_images/1509908753554219008/gVT9s0U7_400x400.jpg',
      },
      fields: [
        {
          name: '/인증',
          value: '확인 및 역할 부여!: 인증 및 kuromi_role 역할을 부여합니다.',
          inline: true,
        },
        {
          name: '/쿠로미_금지어등록',
          value: '이 말은 좀 불편해요~!: 새로운 금지어를 등록합니다.',
          inline: true,
        },
        {
          name: '/핑',
          value: '퐁 이라고 대답할까요?: 퐁이라고 대답을 합니다.',
          inline: true,
        },
        {
          name: '/아무말하기',
          value: '진짜로 아무 말을 합니다.: 랜덤으로 메시지가 보내집니다.',
          inline: true,
        },
      ],
      footer: {
        text: 'kuromi_bot',
        icon_url: 'https://blog.kakaocdn.net/dn/byFpKw/btrJfZD47xK/kzjkvTKqlqGDYtfFEdTRX0/img.jpg',
      },
    };
    
    await interaction.editReply({embeds: [replyEmbed]});
  },
};// exports -> 내보내기용