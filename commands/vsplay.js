const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js"); //빗금치는 명령어생성 

module.exports = {
  data: new SlashCommandBuilder()
    .setName("vs게임하기") // 이름
    .setDescription("vs 게임을 진행합니다.") // 설명
    .addStringOption((option) =>
        option
          .setName("vsleft")
          .setDescription("왼쪽 항목을 입력하세요")
          .setRequired(true))
    .addStringOption((option) =>
        option
          .setName("vsright")
          .setDescription("오른쪽 항목을 입력하세요")
          .setRequired(true))
    .addIntegerOption((option) => 
        option.setName("time")
          .setDescription("게임 시간을 입력하세요")
          .setRequired(true))
    .addBooleanOption((option) =>
        option.setName("votebool")
        .setDescription("투표 현황 보이게 하기")
    ),
  async execute(interaction) {
    const vsleft = interaction.options.getString("vsleft");
    const vsright = interaction.options.getString("vsright");
    const time = interaction.options.getInteger("time");
    const voteBool = interaction.options.getBoolean("votebool");
    const mainEmbed = new EmbedBuilder()
      .setTitle("누가누가 이길까?")
      .setColor(0xc79be9);
    
    const mainVote = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setLabel(vsleft)
          .setStyle(ButtonStyle.Primary)
          .setCustomId("leftagree" + interaction.id),
        new ButtonBuilder()
          .setLabel(vsright)
          .setStyle(ButtonStyle.Danger)
          .setCustomId("rightagree" + interaction.id)
    );

    const message = await interaction.editReply({ 
        embeds: [mainEmbed], 
        components: [mainVote], 
    });

    const filter = (i) => {
      return i.customId == "leftagree" + interaction.id || i.customId == "rightagree" + interaction.id;
    };

    const buttonCollector = message.createMessageComponentCollector({ filter, time: time*1000, dispose: true });
    
    let first = 0;
    let second = 0;
    let useridlist = [];

    buttonCollector.on('collect', async (i) => {
      for(let a = 0; a<useridlist.length; a++){
        if(useridlist[a] == i.user.id) {
          i.reply({
          content: `더 이상 투표할 수 없습니다.`,
          ephemeral: true,
          });
          return;
        }
      }
      i.update({ embeds: [mainEmbed], components: [mainVote]});
      console.log(i.customId);
      if (i.customId == "leftagree" + interaction.id) first++;
      else if (i.customId == "rightagree" + interaction.id) second++;

      if (voteBool == true) {
        interaction.editReply({ content: `실시간 결과: ${vsleft}(왼쪽) ${first}표, ${vsright}(오른쪽) ${second}표`, embeds: [mainEmbed], components: [mainVote] });
      }
      useridlist.push(i.user.id);
    });

    buttonCollector.on('end', (collected) => {
      interaction.editReply({ content: `투표 종료. \n결과: ${vsleft}(왼쪽) ${first}표, ${vsright}(오른쪽) ${second}표`, embeds: [], components: [] });
    });
  },
};