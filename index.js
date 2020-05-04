"use strict";
const fs = require("fs");
const dir = "./out"; //Output path
const youtubedl = require("youtube-dl");

if (!fs.existsSync(dir)) fs.mkdirSync(dir); //Create the folder if doesn't exists

if (process.argv.length > 2) {
  const video = youtubedl(
    process.argv[2],
    ["-f", process.argv.length == 3 ? "mp4" : process.argv[3]],
    {}
  );
  video.on("info", (info) => {
    let size = info.size;
    let pos = 0;
    console.log("Download started");
    console.log("Filename: " + info._filename);
    console.log(`Size: ${(info.size / (1024 * 1024)).toFixed(2)} MB`);
    video.on("data", (chunk) => {
      pos += chunk.length;

      if (size) {
        const percent = ((pos / size) * 100).toFixed(2);
        process.stdout.cursorTo(0);
        process.stdout.clearLine(1);
        process.stdout.write("Downloaded: " + percent + "%");
      }
    });
    video.on("end", () => {
      console.log("\nDone");
    });
    video.pipe(fs.createWriteStream(`${dir}/${info._filename}`));
  });
  return;
}

console.log("Invalid input");
