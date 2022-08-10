const validateList = (list) => {
  return list
    .map((item) => {
      const firstValue = item.first.value;
      const secondValue = item.first.value;

      if (firstValue && secondValue) {
        return item;
      }
    })
    .filter((item) => item);
};

export default validateList;
