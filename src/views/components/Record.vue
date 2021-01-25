<template>
  <div>
    <div class="page-title">
      <h3>{{ 'Menu_NewRecord' | localize }}</h3>
    </div>
    <Loader v-if="loading" />

    <p class="center" v-else-if="!categories.length">
      Категорий пока нет.
      <router-link to="/categories">Добавить новую категорию</router-link>
    </p>

    <form class="form" v-else @submit.prevent="onSubmit">
      <div class="type-amount">
        <div>
          <label>
            <input
              class="with-gap"
              name="type"
              type="radio"
              value="outcome"
              v-model="type"
            />
            <span class="type-name">Расход</span>
          </label>
        </div>
        <div class="income-btn">
          <label>
            <input
              class="with-gap"
              name="type"
              type="radio"
              value="income"
              v-model="type"
            />
            <span class="type-name">Доход</span>
          </label>
        </div>
      </div>

      <div class="input-field">
        <select ref="select" v-model="categoryId">
          <option v-for="c in sortCategories" :key="c.id" :value="c.id">
            {{ c.title }}
          </option>
        </select>
        <label>Выберите категорию</label>
      </div>

      <div class="input-field">
        <input
          :class="{ invalid: $v.amount.$dirty && !$v.amount.minValue }"
          id="amount"
          type="number"
          v-model.number="amount"
        />
        <label for="amount">Сумма</label>
        <span
          class="helper-text invalid"
          v-if="$v.amount.$dirty && !$v.amount.minValue"
        >
          Минимальная величина {{ this.$v.amount.$params.minValue.min }}
        </span>
      </div>

      <div class="input-field">
        <input
          :class="{
            invalid: $v.description.$dirty && !$v.description.required
          }"
          id="description"
          type="text"
          v-model.trim="description"
        />
        <label for="description">Описание</label>
        <span
          class="helper-text invalid"
          v-if="$v.description.$dirty && !$v.description.required"
        >
          Введите описание
        </span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Создать
        <i class="material-icons right">create</i>
      </button>
    </form>
  </div>
</template>

<style lang="sass" scoped>
.type-name
  color: #000

.income-btn
  margin-left: 20px

.type-amount
  margin-bottom: 40px
  display: flex

</style>

<script>
import { required, minValue } from 'vuelidate/lib/validators'
import { mapGetters } from 'vuex'

export default {
  name: 'record',
  metaInfo() {
    return {
      title: this.$title('Menu_NewRecord')
    }
  },
  data: () => ({
    loading: true,
    categories: [],
    sortCategories: [],
    select: null,
    categoryId: null,
    type: 'outcome',
    amount: 10,
    description: ''
  }),
  validations: {
    amount: { minValue: minValue(10) },
    description: { required }
  },
  watch: {
    async type() {
      if (this.type === 'outcome') {
        this.sortCategories = this.categories.filter(c => c.type === 'outcome')
      } else if (this.type === 'income') {
        this.sortCategories = this.categories.filter(c => c.type === 'income')
      }
      this.categoryId = this.sortCategories[0].id

      setTimeout(() => {
        this.select = M.FormSelect.init(this.$refs.select)
        M.updateTextFields()
      }, 200)
    }
  },
  computed: {
    ...mapGetters(['info']),

    canCreateRecord() {
      if (this.type === 'income') {
        return true
      }

      return this.info.bill >= this.amount
    }
  },
  methods: {
    async onSubmit() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      if (this.canCreateRecord) {
        try {
          this.$store.dispatch('createRecord', {
            categoryId: this.categoryId,
            amount: this.amount,
            description: this.description,
            type: this.type,
            date: new Date().toJSON()
          })
          const bill =
            this.type === 'income'
              ? this.info.bill + this.amount
              : this.info.bill - this.amount
          await this.$store.dispatch('updateInfo', { bill })
          this.$message('Запись успешно создана')
          this.$v.$reset()
          this.amount = 10
          this.description = ''
        } catch (e) {}
      } else {
        this.$message(
          `Недостаточно средств на счете (${this.amount - this.info.bill})`
        )
      }
    }
  },
  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategories')
    this.loading = false
    if (this.categories.length) {
      if (this.type === 'outcome') {
        this.sortCategories = this.categories.filter(c => c.type === 'outcome')
      } else if (this.type === 'income') {
        this.sortCategories = this.categories.filter(c => c.type === 'income')
      }
      this.categoryId = this.sortCategories[0].id
    }
    setTimeout(() => {
      this.select = M.FormSelect.init(this.$refs.select)
      M.updateTextFields()
    }, 0)
  },

  destroyed() {
    if (this.select && this.select.destroy) {
      this.select.destroy()
    }
  }
}
</script>
