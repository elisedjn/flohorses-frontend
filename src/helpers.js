const toFormatedDate = (date) => {
  const fullDate = new Date(date);
  const day = "0" + fullDate.getDate();
  const month = "0" + (fullDate.getMonth() + 1);
  const year = fullDate.getFullYear();
  return `${day.slice(-2)}/${month.slice(-2)}/${year}`
}

export default toFormatedDate;