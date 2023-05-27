const restaurantStatus = (hours) => {
  const currentTime = new Date();
  const openingTime = new Date();
  const closingTime = new Date();

  const [openingString, closingString] = hours.split(' - ');

  openingTime.setHours(+openingString.split(':')[0]);
  openingTime.setMinutes(+openingString.split(':')[1]);

  closingTime.setHours(+closingString.split(':')[0]);
  closingTime.setMinutes(+closingString.split(':')[1]);

  return currentTime >= openingTime && currentTime <= closingTime;
};

export default restaurantStatus;
