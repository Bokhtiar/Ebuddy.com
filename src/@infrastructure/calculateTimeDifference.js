/** @format */

export const calculateTimeDifference = (time1, time2) => {
  const [hours1, minutes1, seconds1] = time1.split(":").map(Number);
  const [hours2, minutes2, seconds2] = time2.split(":").map(Number);

  const totalMinutes1 = hours1 * 60 + minutes1;
  const totalMinutes2 = hours2 * 60 + minutes2;

  const differenceInMinutes = totalMinutes1 - totalMinutes2;

  return Math.abs(differenceInMinutes);
};
