import _, { update } from 'lodash'

export default {
  data() {
    return {
      page: +this.$route.query.page || 1,
      pageSize: 5,
      pageCount: 0,
      allItmes: [] /* Хранение всех данных */,
      items: [] /* Показываемые данные */
    }
  },
  methods: {
    pageChangeHandler(page) {
      this.$router.push(`${this.$route.path}?page=${page}`)
      this.items = this.allItmes[page - 1] || this.allItmes[0]
    },
    setupPagination(allItmes) {
      this.allItmes = _.chunk(allItmes, this.pageSize)
      this.pageCount = _.size(this.allItmes)
      this.items = this.allItmes[this.page - 1] || this.allItmes[0]
    }
  }
}
