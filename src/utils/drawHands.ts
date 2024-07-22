import * as handPoseDetection from "@tensorflow-models/hand-pose-detection";

const fingerJoints = {
  thumb: [0, 1, 2, 3, 4],
  indexFinger: [0, 5, 6, 7, 8],
  middleFinger: [0, 9, 10, 11, 12],
  ringFinger: [0, 13, 14, 15, 16],
  pinky: [0, 17, 18, 19, 20],
};

const drawHand = (
  hands: handPoseDetection.Hand[],
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  video: HTMLVideoElement,
  info: HTMLElement
): void => {
  if (!ctx) return;

  hands.forEach((prediction) => {
    if (!prediction.keypoints) return;
    const landmarks = prediction.keypoints;

    // Desenhe as juntas
    for (let j = 0; j < landmarks.length; j++) {
      const circle = new Path2D();
      circle.arc(
        (landmarks[j].x / video.videoWidth) * canvas.width,
        (landmarks[j].y / video.videoHeight) * canvas.height,
        5,
        0,
        2 * Math.PI
      );
      ctx.fillStyle =
        j === 4 || j === 8 || j === 12 || j === 16 || j === 20
          ? "yellow"
          : "plum";
      ctx.fill(circle);
    }

    // Desenhe as linhas dos dedos
    Object.keys(fingerJoints).forEach((finger) => {
      const joints = (fingerJoints as any)[finger];
      for (let j = 0; j < joints.length - 1; j++) {
        const firstJointIndex = joints[j];
        const secondJointIndex = joints[j + 1];

        ctx.beginPath();
        ctx.moveTo(
          (landmarks[firstJointIndex].x / video.videoWidth) * canvas.width,
          (landmarks[firstJointIndex].y / video.videoHeight) * canvas.height
        );
        ctx.lineTo(
          (landmarks[secondJointIndex].x / video.videoWidth) * canvas.width,
          (landmarks[secondJointIndex].y / video.videoHeight) * canvas.height
        );
        ctx.strokeStyle = "plum";
        ctx.lineWidth = 4;
        ctx.stroke();
      }
    });
  });

  updateInfo(hands, info); // Atualiza informações adicionais conforme necessário
};

function updateInfo(hands: handPoseDetection.Hand[], info: HTMLElement): void {
  if (info) {
    info.textContent = `Hands detected: ${hands.length}`;
  }
}

export default drawHand;
