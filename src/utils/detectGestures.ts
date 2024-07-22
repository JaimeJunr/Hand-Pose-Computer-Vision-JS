import * as handPoseDetection from "@tensorflow-models/hand-pose-detection";

const calculateDistance = (
  point1: handPoseDetection.Keypoint,
  point2: handPoseDetection.Keypoint
) => {
  return Math.floor(
    100 *
      Math.sqrt(
        Math.pow(point1.x - point2.x, 2) + Math.pow(point1.y - point2.y, 2)
      )
  );
};

const detectGesture = (
  hands: handPoseDetection.Hand[],
  ctx: CanvasRenderingContext2D
) => {
  if (!ctx) {
    console.log("Contexto do canvas não definido");
    return;
  }

  hands.forEach((hand, index) => {
    if (!hand.keypoints3D) return;
    const landmarks = hand.keypoints3D;

    // Posições das landmarks para o cálculo das distâncias
    const wrist = landmarks[0];
    const wristThumb = landmarks[5];

    const thumbTip = landmarks[4];
    const indexTip = landmarks[8];
    const middleTip = landmarks[12];
    const ringTip = landmarks[16];

    // Calcular distâncias
    const distanceThumb = calculateDistance(wristThumb, thumbTip);
    const distanceIndex = calculateDistance(wrist, indexTip);
    const distanceMiddle = calculateDistance(wrist, middleTip);
    const distanceRing = calculateDistance(wrist, ringTip);

    console.log(
      `Mão ${
        index + 1
      }: Thumb: ${distanceThumb} | Index: ${distanceIndex} | Middle: ${distanceMiddle} | Ring: ${distanceRing}`
    );

    ctx.fillStyle = "blue";
    ctx.lineWidth = 4;

    const baseX = 10; // Posição x base para o texto
    const baseY = 100 + index * 50; // Posição y base para o texto, variando para cada mão

    // Detectar gesto com base nas distâncias calculadas

    if (
      distanceThumb <= 2 &&
      distanceIndex <= 8 &&
      distanceMiddle <= 7 &&
      distanceRing <= 7
    ) {
      ctx.fillText(`Mão ${index + 1}: Mão fechada`, baseX, baseY);
    } else if (
      distanceThumb >= 4 &&
      distanceIndex > 10 &&
      distanceMiddle > 10 &&
      distanceRing > 10
    ) {
      ctx.fillText(`Mão ${index + 1}: Mão aberta`, baseX, baseY);
    } else if (
      distanceThumb >= 4 &&
      distanceIndex <= 8 &&
      distanceMiddle <= 7 &&
      distanceRing <= 7
    ) {
      ctx.fillText(`Mão ${index + 1}: Joinha`, baseX, baseY);
    } else if (
      distanceThumb <= 2 &&
      distanceIndex > 10 &&
      distanceMiddle <= 7 &&
      distanceRing <= 7
    ) {
      ctx.fillText(`Mão ${index + 1}: Apontando`, baseX, baseY);
    }
    // Paz
    else if (
      distanceThumb <= 3 &&
      distanceIndex > 10 &&
      distanceMiddle > 10 &&
      distanceRing <= 9
    ) {
      ctx.fillText(`Mão ${index + 1}: Paz`, baseX, baseY);
    }
    // Arminha
    else if (
      distanceThumb >= 4 &&
      distanceIndex > 10 &&
      distanceMiddle <= 7 &&
      distanceRing <= 7
    ) {
      ctx.fillText(`Mão ${index + 1}: Arminha`, baseX, baseY);
    }
  });
};

export default detectGesture;
