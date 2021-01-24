<template>
  <div>
    <div class="page-title">
      <h3>{{ 'RecordHistory' | localize }}</h3>
      <button
        class="btn-small btn  waves-effect waves-light graf-button outcome"
        @click="renderOutcome"
      >
        <i class="material-icons">Расходы</i>
      </button>
      <button
        class="btn-small btn  waves-effect waves-light graf-button"
        @click="renderIncome"
      >
        <i class="material-icons">Доходы</i>
      </button>
      <button
        class="btn-small btn  waves-effect waves-light graf-button"
        @click="allChart"
      >
        <i class="material-icons">Расходы и доходы</i>
      </button>
    </div>

    <div class="history-chart">
      <canvas ref="canvas" width="1000px" height="700px"></canvas>
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
  font-family: 'Roboto', sans-serif
  line-height: 0
  &:not(:last-child)
    margin-right: 30px


.outcome
  margin-left:  auto
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
    update: 0,
    activeChart: null
  }),
  mixins: [paginationMixin],
  components: {
    HistoryTable
  },
  methods: {
    async deleteRecord(recordId) {
      await this.$store.dispatch('deleteRecord', recordId)
      this.records = this.records.filter(r => r.id !== recordId)
      switch (this.activeChart) {
        case 'all':
          this.allChart()
          break
        case 'income':
          this.renderIncome()
          break
        case 'outcome':
          this.renderOutcome()
          break
        default:
          this.allChart()
          break
      }
      this.$message('Запись удалена')
    },

    renderIncome() {
      this.activeChart = 'income'

      const incomeArray = []
      this.records.forEach(record => {
        if (record.type === 'income') {
          incomeArray.push({
            ...record,
            categoryName: this.categories.find(c => c.id === record.categoryId)
              .title,
            typeClass: 'green',
            typeName: 'Доход'
          })
        }
      })
      this.setupPagination(incomeArray.reverse())

      const categoryLabels = []

      this.categories.forEach(c => {
        if (
          this.records.find(r => {
            return r.categoryId == c.id
          }) &&
          c.type === 'income'
        ) {
          categoryLabels.push(c)
        }
      })

      const backgroundC = categoryLabels.map(c => {
        return `rgba(${Math.ceil(Math.random() * 255)}, ${Math.ceil(
          Math.random() * 255
        )}, ${Math.ceil(Math.random() * 255)}, .4)`
      })

      this.renderChart({
        labels: categoryLabels.map(c => c.title),
        datasets: [
          {
            label: 'Доходы по категориям',
            data: categoryLabels.map(c => {
              return this.records.reduce((total, r) => {
                if (r.type === 'income' && r.categoryId === c.id) {
                  total += +r.amount
                }
                return total
              }, 0)
            }),
            backgroundColor: backgroundC,
            borderColor: backgroundC,
            borderWidth: 1
          }
        ]
      })
    },

    renderOutcome() {
      this.activeChart = 'outcome'

      const outcomeArray = []
      this.records.forEach(record => {
        if (record.type === 'outcome') {
          outcomeArray.push({
            ...record,
            categoryName: this.categories.find(c => c.id === record.categoryId)
              .title,
            typeClass: 'red',
            typeName: 'Расход'
          })
        }
      })

      this.setupPagination(outcomeArray.reverse())
      const categoryLabels = []

      this.categories.forEach(c => {
        if (
          this.records.find(r => {
            return r.categoryId == c.id
          }) &&
          c.type === 'outcome'
        ) {
          categoryLabels.push(c)
        }
      })

      const backgroundC = categoryLabels.map(c => {
        return `rgba(${Math.ceil(Math.random() * 255)}, ${Math.ceil(
          Math.random() * 255
        )}, ${Math.ceil(Math.random() * 255)}, .4)`
      })

      this.renderChart({
        labels: categoryLabels.map(c => c.title),
        datasets: [
          {
            label: 'Расходы по категориям',
            data: categoryLabels.map(c => {
              return this.records.reduce((total, r) => {
                if (r.type === 'outcome' && r.categoryId === c.id) {
                  total += +r.amount
                }
                return total
              }, 0)
            }),
            backgroundColor: backgroundC,
            borderColor: backgroundC,
            borderWidth: 1
          }
        ]
      })
    },

    allChart() {
      this.activeChart = 'all'

      this.setupPagination(
        this.records
          .map(record => {
            return {
              ...record,
              categoryName: this.categories.find(
                c => c.id === record.categoryId
              ).title,
              typeClass: record.type === 'income' ? 'green' : 'red',
              typeName: record.type === 'income' ? 'Доход' : 'Расход'
            }
          })
          .reverse()
      )

      const arrType = [
        { title: 'Доход', type: 'income' },
        { title: 'Расход', type: 'outcome' }
      ]
      this.renderChart({
        labels: arrType.map(c => c.title),
        datasets: [
          {
            label: 'Доход и расход',
            data: arrType.map(c => {
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
    }
  },

  async mounted() {
    this.records = await this.$store.dispatch('fetchRecords')
    this.categories = await this.$store.dispatch('fetchCategories')

    this.allChart()

    this.loading = false
  }
}
</script>
