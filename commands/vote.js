const { SlashCommandBuilder, EmbedBuilder } = require("discord.js"); //빗금치는 명령어생성 
const emojis = ["✅", "❌"];

module.exports = {
  data: new SlashCommandBuilder()
    .setName("투표") // 이름
    .setDescription("이모티콘 형식으로 투표합니다") // 설명
    .addStringOption((option) =>
        option
          .setName("votecontent")
          .setDescription("투표 내용을 정합니다")
          .setRequired(true))
    .addIntegerOption((option) => 
        option.setName("votetime")
          .setDescription("투표 받을 시간을 초 단위로 입력해주세요")
          .setRequired(true)
    ),
  async execute(interaction) {
    const voteContent = interaction.options.getString("votecontent");
    const voteTime = interaction.options.getInteger("votetime");
    const mainEmbed = new EmbedBuilder()
      .setTitle(voteContent)
      .setColor(0xc79be9);
    
    const message = await interaction.editReply({ embeds: [mainEmbed] });
    emojis.forEach((e) => message.react(e));
    const filter = (reaction, user) => {
      return emojis.find((e) => e == reaction.emoji.name) && !user.bot;
    };

    let yes = 0;
    let no = 0;
    const yeslist = [];
    const nolist = [];

    const collector = message.createReactionCollector({ filter, time: voteTime*1000, dispose: true }); // 1-2. 취소 핸들링
    collector.on('collect', (reaction, user) => {
      console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);
      if (reaction.emoji.name == "✅") {
        yes++;
        for(let i=0; i<nolist.length; i++){
          if(nolist[i] == user.tag) {
            message.reactions.resolve("❌").users.remove(user.id);
            break; // 중복 투표자 제거
          }
        }
        yeslist.push(user.tag);
      }
      else if (reaction.emoji.name == "❌") {
        no++;
        for(let i=0; i<yeslist.length; i++){
          if(yeslist[i] == user.tag) {
            message.reactions.resolve("✅").users.remove(user.id);
            break;
          }
        }
        nolist.push(user.tag);
      }

    });
    
    collector.on('remove', (reaction, user) => {
      console.log(`이모티콘 ${reaction.emoji.name}를 유저 ${user.tag}님이 지웠습니다.`);
      if (reaction.emoji.name == "✅") {
        yes--;
        for(let i=0; i<yeslist.length; i++){
          if (yeslist[i] == user.tag){
            yeslist.splice(i, 1);
          }
        }
      }
      else if (reaction.emoji.name == "❌") {
        no--; // 1-2. 취소 핸들링
        for(let i=0; i<nolist.length; i++){
          if (nolist[i] == user.tag){
            nolist.splice(i, 1);
          }
        }
      }
    });
    
    collector.on('end', collected => {
      console.log(`총 ${collected.size} 개의 이모티콘을 수집했습니다.`);
      console.log(`${yes}, ${no}`);

      const resultEmbed = new EmbedBuilder()
        .setTitle("투표 결과")
        .setDescription(`찬성 ${yes}표, 반대 ${no}표\n찬성자: ${yeslist} 반대자: ${nolist}`);

      interaction.editReply({embeds : [resultEmbed]});
      message.reactions.removeAll() // 1-3. embed로 결과 띄우고 이모지 모두 제거
    });
  },
};