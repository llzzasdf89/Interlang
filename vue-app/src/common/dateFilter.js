export const dateFilter = {
  computed: {
    date: (e) => {
      const dt = new Date(e.createdAt * 1000)
      const month = dt.getMonth() + 1
      const day = dt.getDate()
      const date = `${month}.${day}`
      return date
    }
  }
}
