let memoizedJourney = {};
export const setUserJourney = journey => {
  console.log(journey);
  memoizedJourney = {
    ...memoizedJourney,
    ...journey
  };

  localStorage.setItem("userJourney", JSON.stringify(memoizedJourney));
};

export const getUserJourney = () => {
  if (!memoizedJourney.hasOwnProperty("journey")) {
    memoizedJourney = JSON.parse(localStorage.getItem("userJourney"));
  }

  return memoizedJourney;
};
