const abortable = require("abortable-iterator");
const AbortController = require("abort-controller");

const ERR_MPLEX_STREAM_RESET = "ERR_MPLEX_STREAM_RESET";
const ERR_MPLEX_STREAM_ABORT = "ERR_MPLEX_STREAM_ABORT";

// An example function that creates an async iterator that yields an increasing
// number every x milliseconds and NEVER ENDS!
const asyncCounter = async function* (start, delay) {
  let i = start;
  while (true) {
    yield new Promise((resolve) => setTimeout(() => resolve(i++), delay));
  }
};

// Create a counter that'll yield numbers from 0 upwards every second
const everySecond = asyncCounter(0, 100000);

// Make everySecond abortable!
const abortController = new AbortController();
const resetController = new AbortController();

const abortableEverySecond = abortable(everySecond, [
  {
    signal: abortController.signal,
    options: {
      abortMessage: "stream aborted",
      abortCode: ERR_MPLEX_STREAM_ABORT,
    },
  },
  {
    signal: resetController.signal,
    options: {
      abortMessage: "stream reset",
      abortCode: ERR_MPLEX_STREAM_RESET,
    },
  },
]);

// Abort after 5 seconds
setTimeout(() => resetController.abort(), 5000);

(async () => {
  try {
    // Start the iteration, which will throw after 5 seconds when it is aborted
    for await (const n of abortableEverySecond) {
      console.log(n);
    }
  } catch (err) {
    if (err.code === "ERR_ABORTED") {
      // Expected - all ok :D
    } else {
      console.log(err.code);
      throw err;
    }
  }
})();
