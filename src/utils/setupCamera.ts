export const setupCamera = async (video: HTMLVideoElement): Promise<void> => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
    await new Promise((resolve) => {
      video.onloadedmetadata = () => {
        resolve(video);
      };
    });
  } catch (error) {
    console.error("Error accessing camera:", error);
  }
};
