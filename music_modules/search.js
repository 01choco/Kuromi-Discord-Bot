const ytdl = require("ytdl-core");
const ytsr = require("ytsr");
const ytpl = require("ytpl");

async function ytUrlGetInfo(url) {
  const result = await ytdl.getInfo(url);
  return {
    title: result.videoDetails.title,
    url: result.videoDetails.video_url,
    thumbnail: `https://i.ytimg.com/vi/${result.videoDetails.videoId}/hqdefault.jpg`,
    author: result.videoDetails.author.name,
  };
}

async function ytsearchGetInfo(text) {
  const defaultSearchQuery = await ytsr.getFilters(text);
  const videoUrls = defaultSearchQuery.get("Type").get("Video").url;
  const searchResult = await ytsr(videoUrls, {
    pages: 1,
  });

  if (searchResult.items.length == 0) {
    return 1;
  }

  return {
    title: searchResult.items[0].title,
    url: searchResult.items[0].url,
    thumbnail: `https://i.ytimg.com/vi/${searchResult.items[0].id}/hqdefault.jpg`,
    author: searchResult.items[0].author.name,
  };
}

async function ytplaylistGetInfo(url) {
  const result = await ytpl(url);
  let playlistInfo = {
    title: result.title,
    url: result.url,
    thumbnail: result.bestThumbnail.url,
    author: result.author ? result.author.name : "Youtube Music",
    items: [],
  };

  for (let song of result.items) {
    playlistInfo.items.push({
      title: song.title,
      url: song.shortUrl,
      thumbnail: `https://i.ytimg.com/vi/${song.id}/hqdefault.jpg`,
      author: song.author.name,
    });
  }

  return playlistInfo;
}

module.exports = {
  ytUrlGetInfo,
  ytsearchGetInfo,
  ytplaylistGetInfo,
};
