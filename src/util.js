export const sortData = data => {
  const sortedData = [...data];
  sortedData.sort((a, b) => {
    if (a.cases > b.cases) {
      // console.log(a.cases, b.cases);
      return -1;
    } else {
      return 1;
    }
  });
  // console.log(sortedData);

  return sortedData;
};
