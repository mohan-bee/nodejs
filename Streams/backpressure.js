// Handling backpressure Manually 

// Read Stream reads the data chunk by chunk it will take some time to read the complete data
// Write Stream writes the data chunk by chunk it will take some time to write the complete data
// If the write stream is slower than the read stream then the read stream will keep on reading the data and the write stream will keep on writing the data
// This will lead to memory overflow as the read stream will keep on reading the data and the write stream will not be able to write the data fast enough
// To handle this we can use backpressure mechanism

const fs = require("fs")

const readStream = fs.createReadStream('largefile.bin')
const writeStream = fs.createWriteStream('copy.bin')

readStream.on('data', (chunk) => {
    const canRead = writeStream.write(chunk)
    console.log(canRead)
    if(!canRead) {
        readStream.pause()
        writeStream.once("drain", () => {
            readStream.resume()
        })
    }

    readStream.on("end", () => {
        writeStream.end()
        console.log("Copied successfully !!")
    })
})
