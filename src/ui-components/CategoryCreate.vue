<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>Создать</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field">
          <select ref="select" v-model="current">
            <option
              v-for="item in typeCategory"
              :key="item.id"
              :value="item.type"
            >
              {{ item.name }}
            </option>
          </select>
          <label>Источник расхода/дохода</label>
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

        <div class="input-field" v-if="watchTypeCategory">
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

        <button class="btn waves-effect waves-light" type="submit">
          Создать
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { required, minValue } from 'vuelidate/lib/validators'

export default {
  data: () => ({
    title: '',
    limit: 1000,
    current: null,
    typeCategory: [
      {
        id: 1,
        name: 'Расход',
        type: 'outcome'
      },
      {
        id: 2,
        name: 'Доход',
        type: 'income'
      }
    ]
  }),
  validations: {
    title: { required },
    limit: { minValue: minValue(1000) }
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }
      try {
        const category = await this.$store.dispatch('createCategory', {
          title: this.title,
          type: this.current,
          limit: this.limit
        })
        this.title = ''
        this.limit = 1000
        this.$v.$reset()
        this.$message('Категория была создана')
        this.$emit('created', category)
      } catch (e) {}
    }
  },
  watch: {
    // Повешали слушатель на computed свойство
    watchTypeCategory() {
      if (this.current === 'outcome') {
        setTimeout(() => {
          M.updateTextFields()
        }, 0)
      }
    }
  },
  computed: {
    watchTypeCategory() {
      return this.current === 'outcome'
    }
  },
  created() {
    this.current = 'outcome'
  },
  mounted() {
    // Обновить значения input
    this.select = M.FormSelect.init(this.$refs.select)
    M.updateTextFields()
  }
}
</script>
