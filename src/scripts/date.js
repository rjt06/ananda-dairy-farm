const date = new Date();
const weekDay = date.toLocaleString("default", { weekday: "long" }).slice(0, 3);
const dateNum = date.getDate();
const month = date.toLocaleString("default", { month: "long" });
const year = date.getFullYear();
const hours = date.getHours();

export const dateWithDay = () => {
  const storedDate = `${weekDay}, ${dateNum} ${month} ${year}`;
  return storedDate;
};

export const dateToday = () => {
  const storedDate = `${dateNum} ${month} ${year}`;
  return storedDate;
};

export const greetingMessage = () => {
  let greeting;
  if (0 <= hours && hours < 12) greeting = "Good Morning";
  if (12 <= hours && hours < 17) greeting = "Good Afternoon";
  if (17 <= hours && hours < 24) greeting = "Good Evening";
  return greeting;
};
