import "./styles.scss";
import { detectHands } from "./utils/detectHands";
import { setupCamera } from "./utils/setupCamera";

import {
  MediaPipeHandsMediaPipeModelConfig,
  SupportedModels,
  createDetector,
} from "@tensorflow-models/hand-pose-detection";

const video = document.getElementById("video") as HTMLVideoElement;
const canvas = document.getElementById("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");
const info = document.getElementById("info");

async function main(): Promise<void> {
  await setupCamera(video);

  const model = SupportedModels.MediaPipeHands;
  const detectorConfig: MediaPipeHandsMediaPipeModelConfig = {
    runtime: "mediapipe",
    solutionPath: `https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.4.1646424915`,
    maxHands: 2,
    modelType: "full",
  };
  const detector = await createDetector(model, detectorConfig);

  video.play();
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  async function detect() {
    if (!model || !ctx || !video || !info) return;
    const hands = await detector.estimateHands(video);
    detectHands(hands, video, canvas, ctx, info);
  }

  // Configura o intervalo de 1 segundo
  setInterval(() => {
    detect();
  }, 50); // 1000 milissegundos = 1 segundo
}

function resizeCanvas(): void {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
}

main();
