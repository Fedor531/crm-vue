<template>
  <div>
    <div class="page-title">
      <h3>{{ 'RecordHistory' | localize }}</h3>
      <button
        class="btn-small btn  waves-effect waves-light graf-button all-button"
        @click="setup"
      >
        <i class="material-icons">Общее</i>
      </button>
      <button
        class="btn-small btn  waves-effect waves-light graf-button"
        @click="viewIncomeOutcomeChart"
      >
        <i class="material-icons">График расходов и доходов</i>
      </button>
    </div>

    <div class="history-chart">
      <canvas ref="canvas"></canvas>
    </div>

    <Loader v-if="loading" />

    <p class="center" v-else-if="!records.length">
      Записей пока нет <router-link to="/record">Добавьте первую</router-link>
    </p>

    <section v-else>
      <HistoryTable :records="items" @delete="deleteRecord" />
      <Paginate
        v-model="page"
        :page-count="pageCount"
        :click-handler="pageChangeHandler"
        :prev-text="'Назад'"
        :next-text="'Вперед'"
        :container-class="'pagination'"
        :page-class="'waves-effect'"
      ></Paginate>
    </section>
  </div>
</template>

<style lang="sass" scoped>

.graf-button
  line-height: 0

.all-button
  margin: 0 30px 0 auto
</style>

<script>
import paginationMixin from '@/mixins/pagination.mixin'
import HistoryTable from '@/ui-components/HistoryTable'
import { Pie } from 'vue-chartjs'

export default {
  name: 'history',
  metaInfo() {
    return {
      title: this.$title('Menu_History')
    }
  },
  extends: Pie,
  data: () => ({
    loading: true,
    records: [],
    categories: [],
    update: 0
  }),
  mixins: [paginationMixin],
  components: {
    HistoryTable
  },
  methods: {
    async deleteRecord(recordId) {
      await this.$store.dispatch('deleteRecord', recordId)
      this.records = this.records.filter(r => r.id !== recordId)
      this.setup()
      this.$message('Запись удалена')
    },

    viewIncomeOutcomeChart() {
      const arr = [
        { title: 'Доход', type: 'income' },
        { title: 'Расход', type: 'outcome' }
      ]
      this.renderChart({
        labels: arr.map(c => c.title),
        datasets: [
          {
            label: 'Доход и расход',
            data: arr.map(c => {
              return this.records.reduce((total, r) => {
                if (r.type === c.type) {
                  total += +r.amount
                }
                return total
              }, 0)
            }),
            backgroundColor: [
              'rgba(74, 201, 6, 0.2)',
              'rgba(255, 99, 132, 0.2)'
            ],
            borderColor: ['rgba(74, 201, 2, 1)', 'rgba(255, 99, 132, 1)'],
            borderWidth: 1
          }
        ]
      })
    },

    async setup() {
      this.setupPagination(
        this.records.map(record => {
          return {
            ...record,
            categoryName: this.categories.find(c => c.id === record.categoryId)
              .title,
            typeClass: record.type === 'income' ? 'green' : 'red',
            typeName: record.type === 'income' ? 'Доход' : 'Расход'
          }
        })
      )

      this.renderChart({
        labels: this.categories.map(c => c.title),
        datasets: [
          {
            label: 'Расходы по категориям',
            data: this.categories.map(c => {
              return this.records.reduce((total, r) => {
                if (r.categoryId === c.id && r.type === 'outcome') {
                  total += +r.amount
                }
                return total
              }, 0)
            }),
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }
        ]
      })
    }
  },
  async mounted() {
    this.records = await this.$store.dispatch('fetchRecords')
    this.categories = await this.$store.dispatch('fetchCategories')

    this.setup()

    this.loading = false
  }
}
</script>
