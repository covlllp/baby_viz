export function getCoordsFromAngle(angle: number, radius: number) {
  return {
    x: Math.sin(angle) * radius,
    y: -(Math.cos(angle) * radius),
  };
}
