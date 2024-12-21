document.addEventListener("DOMContentLoaded", function() {
    const bitsElement = document.getElementById("bits");
    const kbsElement = document.getElementById("kbs");
    const mbsElement = document.getElementById("mbs");
    const statusElement = document.getElementById("status");
    const startButton = document.getElementById("start-button");

    async function measureSpeed() {
        const testFile = `https://source.unsplash.com/random/`; // Random image from Unsplash
        statusElement.textContent = "Testing your speed...";
        statusElement.classList.add("testing"); // Add blinking animation

        startButton.classList.add("testing"); // Add testing animation to button

        const startTime = new Date().getTime();
        try {
            await fetch(testFile, { method: "GET", cache: "no-cache" });
            const endTime = new Date().getTime();

            const fileSize = 500000; // Approximate file size for Unsplash images in bytes (can vary)
            const duration = (endTime - startTime) / 1000; // Duration in seconds
            const bitsPerSecond = (fileSize * 8) / duration;
            const kbps = bitsPerSecond / 1024;
            const mbps = kbps / 1024;

            bitsElement.innerHTML = `<span>Speed in Bits:</span> ${bitsPerSecond.toFixed(2)} bps`;
            kbsElement.innerHTML = `<span>Speed in KBs:</span> ${kbps.toFixed(2)} KB/s`;
            mbsElement.innerHTML = `<span>Speed in MBs:</span> ${mbps.toFixed(2)} MB/s`;

            statusElement.textContent = "Test complete!";
        } catch (error) {
            statusElement.textContent = "Test failed. Please try again.";
            console.error("Error measuring speed:", error);
        } finally {
            startButton.classList.remove("testing"); // Remove button testing animation
            statusElement.classList.remove("testing"); // Remove status blinking animation
        }
    }

    // Attach event listener to the start button
    startButton.addEventListener("click", measureSpeed);
});
