const toFormatedDate = (date) => {
  const fullDate = new Date(date);
  const day = "0" + fullDate.getDate();
  const month = "0" + (fullDate.getMonth() + 1);
  const year = fullDate.getFullYear();
  return isNaN(day) || isNaN(month) || isNaN(year) ? "-" : `${day.slice(-2)}/${month.slice(-2)}/${year}`
}

const toCalendarDate = (date) => {
  const fullDate = new Date(date);
  const day = "0" + fullDate.getDate();
  const month = "0" + (fullDate.getMonth() + 1);
  const year = fullDate.getFullYear();
  return isNaN(day) || isNaN(month) || isNaN(year) ? "-" : `${year}-${month.slice(-2)}-${day.slice(-2)}`
}
export {toCalendarDate, toFormatedDate};