## **Streams in Node.js**

**Streams** are objects that let you **read or write data piece by piece**, instead of loading the entire dataset into memory.
This makes Node.js extremely **efficient for large files or data flows**, as it avoids blocking the event loop.

---

## **Types of Streams**

1. **Readable Streams** – Used to **read data** from a source.

   * Examples: `fs.createReadStream()`, HTTP request bodies.
   * Methods/events: `stream.on('data')`, `stream.on('end')`.

2. **Writable Streams** – Used to **write data** to a destination.

   * Examples: `fs.createWriteStream()`, HTTP response.
   * Methods/events: `stream.write()`, `stream.end()`, `stream.on('finish')`.

3. **Duplex Streams** – Can be **both readable and writable**.

   * Examples: `net.Socket`.
   * Can **read and write simultaneously**.

4. **Transform Streams** – A type of duplex stream that can **modify or transform data** while reading or writing.

   * Examples: `zlib.createGzip()`, `crypto.createCipher()`.
   * Useful for **compression, encryption, or parsing** on the fly.

---

## **Key Methods & Events**

### Readable Stream

* `.on('data', chunk)` – Fired when a **chunk of data** is available.
* `.on('end')` – Fired when the **stream finishes reading**.
* `.on('error', err)` – Handles **errors** during reading.
* `.pipe(destination)` – Pipes data to a **writable stream**.

### Writable Stream

* `.write(chunk)` – Writes a **chunk of data**.
* `.end()` – Signals that **writing is complete**.
* `.on('finish')` – Fired when all data has been written.
* `.on('error', err)` – Handles **write errors**.

---

## **Piping Streams**

* `readable.pipe(writable)` – **Automatically transfers data** from a readable stream to a writable one.
* Benefits:

  * **Less memory usage**.
  * **Handles backpressure** automatically.
* Example:

```js
const fs = require('fs');
const readStream = fs.createReadStream('input.txt');
const writeStream = fs.createWriteStream('output.txt');

readStream.pipe(writeStream);
```

---

## **Backpressure**

* Occurs when **writable stream can’t handle data as fast as readable stream produces it**.
* `.pipe()` **manages backpressure automatically**, pausing/resuming the readable stream when necessary.
* Prevents **memory overload** in Node.js.

---

## **Use Cases of Streams**

* Reading/writing **large files** (logs, videos, CSVs).
* Real-time **data processing** (compression, encryption, parsing).
* Handling **network requests/responses** in a **memory-efficient** way.
* Streaming **data between services** (HTTP requests, sockets).

---

