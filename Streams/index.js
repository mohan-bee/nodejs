const fs = require("fs");
const zlib = require("zlib");
const { pipeline } = require("stream");

const inputFile = "./largefile.bin";
const outputFile = "./largefile.zip";

const totalBytes = fs.statSync(inputFile).size;
let processedBytes = 0;


const readStream = fs.createReadStream(inputFile);
const writeStream = fs.createWriteStream(outputFile);
const gzip = zlib.createGzip();


function showProgress(current, total) {
  const percent = current / total;
  const barLength = 40; 
  const filledLength = Math.round(barLength * percent);
  const bar = "=".repeat(filledLength) + "-".repeat(barLength - filledLength);
  const progress = (percent * 100).toFixed(2);


  process.stdout.clearLine(0);
  process.stdout.cursorTo(0);
  process.stdout.write(`Compressing [${bar}] ${progress}%`);
}

readStream.on("data", (chunk) => {
  processedBytes += chunk.length;
  showProgress(processedBytes, totalBytes);
});

pipeline(readStream, gzip, writeStream, (err) => {
  if (err) {
    console.error("\nError in pipeline:", err);
  } else {
    process.stdout.write("\nCompression completed successfully!\n");
  }
});
