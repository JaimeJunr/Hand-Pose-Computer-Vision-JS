import * as handPoseDetection from "@tensorflow-models/hand-pose-detection";
import drawHand from "./drawHands";
import detectGesture from "./detectGestures";

// const detectPosition = (
//   hands: handPoseDetection.Hand[],
//   video: HTMLVideoElement,
//   canvas: HTMLCanvasElement,
//   ctx: CanvasRenderingContext2D
// ) => {
//   if (hands.length > 0) {
//     const landmarks = hands[0].;
//     const wrist = landmarks[8];

//     if (wrist) {
//       // Converter as coordenadas do video para o canvas
//       const x = (wrist[0] / video.videoWidth) * canvas.width;
//       const y = (wrist[1] / video.videoHeight) * canvas.height;

//       // Obter as áreas esquerda e direita
//       const leftArea = document.getElementById("leftArea");
//       const rightArea = document.getElementById("rightArea");

//       if (leftArea && rightArea) {
//         // Obter as posições e dimensões das áreas
//         const leftAreaRect = leftArea.getBoundingClientRect();
//         const rightAreaRect = rightArea.getBoundingClientRect();

//         // Detectar se o ponto está sobre a área esquerda
//         if (
//           x >= leftAreaRect.left &&
//           x <= leftAreaRect.right &&
//           y > leftAreaRect.top &&
//           y < leftAreaRect.bottom
//         ) {
//           ctx.fillStyle = "green";
//           ctx.fillText("Esquerda", 90, 100);
//           console.log("Esquerda");
//         }

//         // Detectar se o ponto está sobre a área direita
//         if (
//           x > rightAreaRect.left &&
//           x < rightAreaRect.right &&
//           y > rightAreaRect.top &&
//           y < rightAreaRect.bottom
//         ) {
//           ctx.fillStyle = "green";
//           ctx.fillText("Direita", 90, 100);
//           console.log("Direita");
//         }
//       }
//     }
//   }
// };

export const detectHands = async (
  hands: handPoseDetection.Hand[],
  video: HTMLVideoElement,
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  info: HTMLElement
): Promise<void> => {
  try {
    if (!hands || !ctx || !video || video.readyState !== 4) {
      return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpa o canvas antes de desenhar
    drawHand(hands, ctx, canvas, video, info);

    // Detectar gesto
    detectGesture(hands, ctx);
    // Detectar posição
    // detectPosition(hands, video, canvas, ctx);
  } catch (error) {
    console.error("Error detecting hands:", error);
  }
};
