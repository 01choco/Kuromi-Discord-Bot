const fs = require('fs'); //파일 사용시
const path = require('path');
const { Client, Collection, Events, GatewayIntentBits, SlashCommandAssertions, Message } = require("discord.js");
require("dotenv").config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

//여기서부터 커맨드 등록
client.commands = new Collection();

const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  if ('data' in command && 'execute' in command) {
    client.commands.set(command.data.name, command);
  } else {
    console.log("데이터가 제대로 처리되지 않았습니다. 스킵합니다.");
  }
}

//여기서부터는 이벤트 핸들러
const eventsPath = path.join(__dirname, "events");
const eventFiles = fs
  .readdirSync(eventsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

//기본 설정, 필요한 금지어 배열
const util = require("util");
const { channel } = require('diagnostics_channel');
const wait = util.promisify(setTimeout);

const forbidden_words = [
  "나쁜말",
  "안좋은말",
  "tlqkf",
  "시발",
  "시1발",
  "발",
];
global.forbidden_words = forbidden_words;

const omg_words = [
  "뼈석",
];
global.omg_words = omg_words;

const scriptlist = [
  "타코야키 먹고 싶네..", 
  "어쩌라구", 
  "아무말 아무말", 
  "날씨가 너무 춥죠?",
  "장준호 바보임?",
  "호준이 진짜 갑열리랑 데이트함?",
  "얘들아 공부해",
  "준호 트파한테 차였니?",
  "경배님인지 숭배님인지 보고싶네..",
  "장주노 여친 생기기 D-310",
  "도희 VS 용준",
  "이갑열 VS 신형두",
  "너 뭐 돼?",
  "알빠노",
  "서형님은 정말 아름다우시군요.....",
  "송강호 떡 먹어주기 vs 송강 호떡 먹어주기",
  "준호야 재입대할래???????",
  "호연아 박사할래?",
  "졸업시험 보기 싫으면 보지마~ 더 있으면 되지~",
];
global.scriptlist = scriptlist;

client.login(process.env.TOKEN);
