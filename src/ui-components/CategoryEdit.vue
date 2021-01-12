<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Редактировать</h4>
      </div>

      <form @submit.prevent="onSubmit">
        <div class="input-field">
          <select ref="select" v-model="current">
            <option v-for="c in categories" :key="c.id" :value="c.id">
              {{ c.title }}
            </option>
          </select>
          <label>Выберите категорию</label>
        </div>

        <div class="input-field">
          <input
            id="name"
            type="text"
            v-model="title"
            :class="{ invalid: $v.title.$dirty && !$v.title.required }"
          />
          <label for="name">Название</label>
          <span
            class="helper-text invalid"
            v-if="$v.title.$dirty && !$v.title.required"
            >Введите название категории</span
          >
        </div>

        <div class="input-field">
          <input
            id="limit"
            type="number"
            v-model.number="limit"
            :class="{ invalid: $v.limit.$dirty && !$v.limit.minValue }"
          />
          <label for="limit">Лимит</label>
          <span
            class="helper-text invalid"
            v-if="$v.limit.$dirty && !$v.limit.minValue"
          >
            Минимальная величина {{ this.$v.limit.$params.minValue.min }}
          </span>
        </div>
      </form>
      <div class="button-container">
        <button class="btn waves-effect waves-light" @click="updateCategory">
          Обновить
          <i class="material-icons right">send</i>
        </button>
        <button
          class="btn waves-effect waves-light delete"
          @click="deleteCategory"
        >
          Удалить
          <i class="material-icons right">delete</i>
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
.delete
  margin-left: 20px

.button-container
  display: flex
</style>

<script>
import { required, minValue } from 'vuelidate/lib/validators'

export default {
  props: {
    categories: {
      type: Array,
      requried: true
    }
  },
  data: () => ({
    select: null,
    title: '',
    limit: 1000,
    current: null
  }),
  validations: {
    title: { required },
    limit: { minValue: minValue(1000) }
  },
  watch: {
    current(catID) {
      const { title, limit } = this.categories.find(c => c.id === catID)
      this.title = title
      this.limit = limit
    }
  },

  methods: {
    async onSubmit() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      const categoryData = {
        id: this.current,
        title: this.title,
        limit: this.limit
      }

      try {
        await this.$store.dispatch('updateCategory', categoryData)
        this.$emit('updated', categoryData)
        this.$message('Категория уcпешно обновлена')
      } catch (e) {}
    },

    async deleteCategory() {
      try {
        await this.$store.dispatch('deleteCategory', this.current)
        this.$emit('deleteUpdate', this.current)
        this.$message(`Категория "${this.title}" удалена`)
      } catch (e) {}
    },

    updateCategory() {
      this.onSubmit()
    }
  },

  created() {
    const { id, title, limit } = this.categories[0]
    this.current = id
    this.title = title
    this.limit = limit
  },

  mounted() {
    this.select = M.FormSelect.init(this.$refs.select)
    M.updateTextFields()
  },

  destroyed() {
    if (this.select && this.select.destroy) {
      this.select.destroy()
    }
  }
}
</script>
