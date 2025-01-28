self.onmessage = (event) => {
  const { action, data } = event.data;

  if (action === "startStreaming") {
    const { prompt, token, sessionId } = data;

    // Simulate background task
    self.postMessage({ type: "status", data: "Streaming started in the background..." });

    // Simulate receiving streaming data
    let counter = 0;
    const interval = setInterval(() => {
      counter++;
      self.postMessage({ type: "stream", data: `Stream data ${counter}` });

      if (counter >= 5) {
        clearInterval(interval);
        self.postMessage({ type: "complete", data: "Final streamed response." });
      }
    }, 1000);
  }

  if (action === "stopStreaming") {
    self.postMessage({ type: "status", data: "Streaming stopped." });
    self.close(); // Terminate the worker
  }
};
