export const dateFilter = {
  computed: {
    date: (e) => {
      const time = e.messageObj.Date * 1000 || e.messageObj.CreateAt * 1000
      const dt = new Date(time)
      const month = dt.getMonth() + 1
      const day = dt.getDate()
      const date = `${month}.${day}`
      return date
    }
  }
}
