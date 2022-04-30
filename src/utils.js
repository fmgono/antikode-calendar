import dayjs from "dayjs"

export function getMonth(month = dayjs().month()) {
  // get current year based on parameter months
  const year = dayjs().year()
  const firstDayOfTheMonth = dayjs(new Date(year, month, 1)).day()
  let currentMonthCount = 0 - firstDayOfTheMonth
  const dayMatrix = new Array(5).fill([]).map( _ => {
    return new Array(7).fill(null).map( _ => {
      currentMonthCount++
      return dayjs(new Date(year, month, currentMonthCount))
    })
  })

  return dayMatrix
}