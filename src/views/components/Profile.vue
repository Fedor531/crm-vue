<template>
  <div>
    <div class="page-title">
      <h3>{{ 'ProfileTitle' | localize }}</h3>
    </div>

    <form class="form" @submit.prevent="onSubmit">
      <div class="input-field">
        <input
          :class="{ invalid: $v.name.$dirty && !$v.name.required }"
          v-model.trim="name"
          id="name"
          type="text"
        />
        <label for="name">{{ 'ProfileName' | localize }}</label>
        <small
          class="helper-text invalid"
          v-if="$v.name.$dirty && !$v.name.required"
        >
          {{ 'MessageErrorName' | localize }}
        </small>
      </div>

      <div class="switch">
        <label>
          English
          <input type="checkbox" v-model="isRuLocale" />
          <span class="lever"></span>
          Русский
        </label>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{ 'UpdateName' | localize }}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<style lang="sass" scoped>
.switch
  margin-bottom: 2rem
</style>

<script>
import { required } from 'vuelidate/lib/validators'
import { mapGetters, mapActions } from 'vuex'

export default {
  data: () => ({
    name: '',
    isRuLocale: true
  }),
  validations: {
    name: { required }
  },
  methods: {
    ...mapActions(['updateInfo']),
    async onSubmit() {
      // Если поле не валидно
      if (this.$v.$invalid) {
        // Активация валидации
        this.$v.$touch()
        return
      }
      try {
        await this.updateInfo({ name: this.name, locale: this.isRuLocale ? 'ru-RU' : 'en-US' })
      } catch (e) {}
    }
  },

  mounted() {
    this.name = this.info.name
    this.isRuLocale = this.info.locale === 'ru-RU'
    setTimeout(() => {
      M.updateTextFields()
    }, 0)
  },

  computed: {
    ...mapGetters(['info'])
  }
}
</script>
