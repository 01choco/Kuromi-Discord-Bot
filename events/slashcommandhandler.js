//interaction 설정하기 (가져온 파일이름과 일치하는지)

const { Events } = require("discord.js");
module.exports = {
    name: Events.InteractionCreate,
    once: false,
    async execute(interaction) {
        if (!interaction.isChatInputCommand()) return;
  
        const command = interaction.client.commands.get(interaction.commandName);
      
        if (!command) {
          console.log("구현되지 않은 명령어입니다.");
          return; // command가 NULL 값을 반환하는 경우 : 존재하지 않는 command
        }
        
        await interaction.deferReply();

        try { //정상적으로 실행됨 
          await command.execute(interaction); //interaction을 실행
        }catch(error) {
          interaction.editReply("명령어를 실행하는 데 오류가 발생했습니다."); //실행 중 오류 발생
          console.log("error");
        } 
    },
};