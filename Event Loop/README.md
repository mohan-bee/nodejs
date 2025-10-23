## Event Loop

The **Event Loop** allows Node.js to handle multiple operations concurrently — even though it runs on a **single thread**.
It does this by **offloading tasks** like I/O to the system, and then **processing their results asynchronously**, so Node never blocks.

---

## **Key Components**

1. **Call Stack** – Executes all synchronous code, line by line.
2. **Task Queue (Macro Task Queue)** – Holds callbacks from functions like `setTimeout()` and `setImmediate()`.
3. **Micro Task Queue** – Handles resolved or rejected promises, and async/await callbacks.
4. **Web APIs / Node APIs** – Handle asynchronous operations like timers, HTTP requests, or file reads.
5. **Event Loop** – Continuously checks if the call stack is empty, and moves tasks from the queues for execution.

---

## **Execution Flow**

1. **Synchronous code** runs first in the **call stack**.
2. After the stack is clear, the **event loop** checks the **microtask queue** (for promises and `process.nextTick`).
3. Then it moves on to the **task queue** (for timers and I/O callbacks).
4. This cycle continues endlessly, allowing Node.js to stay non-blocking.

---

## **Priority Notes**

* `process.nextTick()` has **higher priority** than other microtasks (runs before promises).
* **Microtasks** always run **before** moving to the next **macrotask phase**.
* **setTimeout()** and **setImmediate()** are macrotasks, but their order depends on the phase — usually `setTimeout()` runs first unless there’s pending I/O.
