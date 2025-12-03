self.onmessage = (event) => {
    const file = event.data;

    console.log(`[Worker] Compressing ${file.name}...`);

    setTimeout(() => {
        console.log('[Worker] Compression complete.');
        self.postMessage({ compressedFile: file });
    }, 1000);
};