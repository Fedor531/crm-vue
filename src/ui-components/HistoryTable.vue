<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Сумма</th>
          <th>Дата</th>
          <th>Категория</th>
          <th>Тип</th>
          <th>Открыть</th>
          <th>Удалить</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(record, idx) in records" :key="record.id">
          <td>{{ idx + 1 }}</td>
          <td>{{ record.amount | currency('RUB') }}</td>
          <td>{{ new Date(record.date) | date('date') }}</td>
          <td>
            <button
              class="category btn-small btn waves-effect waves-light modal-trigger"
              data-target="modal1"
              @click="changeRecordCategory(record)"
              v-tooltip="'Изменить категорию'"
            >
              {{ record.categoryName }}
            </button>
          </td>
          <td>
            <span class="white-text badge" :class="[record.typeClass]">
              {{ record.typeName }}
            </span>
          </td>
          <td>
            <button
              class="btn-small btn"
              @click="$router.push(`/detail/${record.id}`)"
              v-tooltip="'Открыть запись'"
            >
              <i class="material-icons">open_in_new</i>
            </button>
          </td>
          <td>
            <button class="btn-small btn" @click="deleteRecord(record.id)">
              <i class="material-icons">delete_forever</i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <CategoryModal @updateAll="update" :activeRecord="activeRecord" :categories="categoriesForRecord" />
  </div>
</template>

<style lang="sass" scoped>
.category
  cursor: pointer
  background-color: #26a69a

.category-list
  display: flex
  flex-direction: column
  &__item
    font-size: 24px
    cursor: pointer
    &:hover
      color: green
</style>

<script>
import CategoryModal from '../ui-components/CategoryModal'

export default {
  props: {
    categories: {
      type: Array
    },
    records: {
      required: true,
      type: Array
    }
  },
  data() {
    return {
      categoriesForRecord: [],
      activeRecord: null
    }
  },
  components: {
    CategoryModal
  },
  methods: {
    update() {
      this.$emit('updateAll')
    },
    deleteRecord(recordId) {
      if (confirm('Вы действительно ходите удалить')) {
        this.$emit('delete', recordId)
      }
    },
    changeRecordCategory(record) {
      this.activeRecord = record
      if (record.type === 'income') {
        this.categoriesForRecord = this.categories.filter(
          cat => cat.type === 'income' && record.categoryId !== cat.id
        )
      } else if (record.type === 'outcome') {
        this.categoriesForRecord = this.categories.filter(
          cat => cat.type === 'outcome' && record.categoryId !== cat.id
        )
      }
    }
  }
}
</script>
