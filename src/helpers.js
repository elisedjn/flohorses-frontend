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

const nameIteration = (phases, newPhase, stringPhase) => {
  let count = 1
  phases.forEach(phase => {
    if(phase.phaseName.includes(stringPhase)) count ++  
  })
  count > 1 ? newPhase.phaseName = stringPhase + " " + count : newPhase.phaseName = stringPhase
} 

export {toCalendarDate, toFormatedDate, nameIteration};