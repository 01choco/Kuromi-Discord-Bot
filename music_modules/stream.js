const {
  joinVoiceChannel,
  createAudioPlayer,
  createAudioResource,
  VoiceConnectionStatus,
  getVoiceConnection,
  AudioPlayerStatus,
  entersState,
} = require("@discordjs/voice");

const { pushqueue, queue } = require("./pushqueue.js");
const ytdl = require("ytdl-core");

async function trigger(interaction, text) {
  //유저가 음성채널에 들어가지 않았을 때
  if (!interaction.member.voice.channel) {
    return interaction.editReply("먼저 음성 채널에 들어가주세요.");
  }

  const voiceChannel = await joinVoiceChannel({
    channelId: interaction.member.voice.channel.id,
    guildId: interaction.guild.id,
    adapterCreator: interaction.guild.voiceAdapterCreator,
  });

  if (queue.length == 0) {
    await stream(interaction, text, voiceChannel);
  } else {
    const resultEmbed = await pushqueue(text);
    interaction.editReply({
      content: "다음 노래가 대기열에 추가됐습니다",
      embeds: [resultEmbed],
    });
  }
}

async function stream(interaction, text, voiceChannel) {
  const audioPlayer = createAudioPlayer();
  
  let embedInfo = await pushqueue(text);

  await play(voiceChannel, audioPlayer);

  await interaction.editReply({
    content: "노래를 재생합니다",
    embeds: [embedInfo],
  });

  audioPlayer.on(AudioPlayerStatus.Playing, async () => {});

  audioPlayer.on(AudioPlayerStatus.Idle, async () => {
    queue.shift();

    if (queue.length > 0) {
      await play(voiceChannel, audioPlayer);
      interaction.channel.send(`다음 노래 재생 중 : **${queue[0].title}**`);
    } else {
      interaction.channel.send("대기열에 노래가 없습니다.");
    }
  });
}

async function play(voiceChannel, audioPlayer) {
  let song = await ytdl(queue[0].url, { quality: "highestaudio" });
  let resource = await createAudioResource(song);

  console.log(queue);

  audioPlayer.play(resource);
  voiceChannel.subscribe(audioPlayer);
}

module.exports = {
  trigger,
};
