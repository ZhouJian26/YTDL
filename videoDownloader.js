"use strict";
const fs = require("fs");
const ytdl = require("ytdl-core");
const readline = require("readline");
const dir = "./out"; //Output path

if (!fs.existsSync(dir)) fs.mkdirSync(dir); //Create the folder if doesn't exists

if (process.argv.length > 2) {
  ytdl
    .getBasicInfo(process.argv[2], (err, info) => {
      return info.title.trim();
    })
    .then((title) => {
      let starttime;
      let video = ytdl(process.argv[2]);
      video.pipe(fs.createWriteStream(`${dir}/${title}.mp4`));
      video.once("response", () => {
        starttime = Date.now();
        console.log("Download Status");
      });
      video.on("progress", (chunkLength, downloaded, total) => {
        const percent = downloaded / total;
        const downloadedMinutes = (Date.now() - starttime) / 1000 / 60;
        const estimatedDownloadTime =
          downloadedMinutes / percent - downloadedMinutes;
        readline.cursorTo(process.stdout, 0);
        process.stdout.write(`${(percent * 100).toFixed(2)}% downloaded `);
        process.stdout.write(
          `(${(downloaded / 1024 / 1024).toFixed(2)}MB of ${(
            total /
            1024 /
            1024
          ).toFixed(2)}MB)\n`
        );
        process.stdout.write(
          `Running for: ${downloadedMinutes.toFixed(2)}minutes `
        );
        process.stdout.write(
          `| Estimated time left: ${estimatedDownloadTime.toFixed(2)}minutes `
        );
        readline.moveCursor(process.stdout, 0, -1);
      });
      video.on("end", () => {
        process.stdout.write("\n\n");
        console.log(`Saved in ${dir}/${title}.mp3`);
      });
    });
  return;
}

console.log("Invalid input");
