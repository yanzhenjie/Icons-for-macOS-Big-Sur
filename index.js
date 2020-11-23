const fs = require("fs");
const png2icns = require("png2icns");
const util = require("util");

const convert = util.promisify(png2icns);
const pngFiles = fs
  .readdirSync("./png")
  .filter((file) => file.endsWith(".png"));

async function build(pngFiles) {
  if (pngFiles.length == 0) {
    console.log("No files to convert");
  } else if (pngFiles.length == 1) {
    await convert({
      in: `./png/${pngFiles[pngFiles.length - 1]}`,
      out: `./icns/${pngFiles[pngFiles.length - 1].replace(".png", ".icns")}`,
      sizes: [16, 32, 64, 128, 256, 512, 1024],
    });
    console.log(
      `Done generating ${pngFiles[pngFiles.length - 1].replace(
        ".png",
        ".icns"
      )}`
    );
    pngFiles.pop();
  } else {
    await convert({
      in: `./png/${pngFiles[pngFiles.length - 1]}`,
      out: `./icns/${pngFiles[pngFiles.length - 1].replace(".png", ".icns")}`,
      sizes: [16, 32, 64, 128, 256, 512, 1024],
    });
    console.log(
      `Done generating ${pngFiles[pngFiles.length - 1].replace(
        ".png",
        ".icns"
      )}`
    );
    pngFiles.pop();
    build(pngFiles);
  }
}
build(pngFiles);
