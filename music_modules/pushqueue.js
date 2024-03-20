const yturlReg =
  /^https?:\/\/(www\.youtube\.com|youtube\.com|youtu\.be)\/(.*)$/;
const ytplReg1 =
  /^https?:\/\/(www\.youtube\.com|youtube\.com|youtu\.be)\/playlist(.*)$/;
const ytplReg2 =
  /^https?:\/\/(www\.youtube\.com|youtube\.com|youtu\.be).*(list=PL|list=OL)([^#\&\?]*)/;

const {
  ytUrlGetInfo,
  ytsearchGetInfo,
  ytplaylistGetInfo,
} = require("./search.js");

const { EmbedBuilder } = require("discord.js");

const queue = [];

async function pushqueue(text) {
  let res =
    ytplReg1.test(text) || ytplReg2.test(text)
      ? await ytplaylistGetInfo(text)
      : yturlReg.test(text)
      ? await ytUrlGetInfo(text)
      : await ytsearchGetInfo(text);

  if (res.items) {
    queue.push(res.items);
  } else {
    queue.push(res);
  }

  console.log(res);
  const resultEmbed = new EmbedBuilder()
    .setTitle(res.title)
    .setURL(res.url)
    .setThumbnail(res.thumbnail)
    .setAuthor({ name: res.author });

  return resultEmbed;
}

module.exports = {
  pushqueue,
  queue,
};
