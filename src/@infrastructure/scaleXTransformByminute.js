/** @format */

export const scaleXTransformPerMinute = (minutes, baseScale = 1) => {
  const initialScale = baseScale;
  const perFrame = parseFloat(initialScale / 60);
  const parentScaleX = perFrame * minutes;
  const childrenScaleX = parentScaleX;

  return {
    parentScale: parentScaleX,
    childrenScale: childrenScaleX,
  };
};
