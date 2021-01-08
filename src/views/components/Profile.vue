<template>
  <div>
    <div class="page-title">
      <h3>Профиль</h3>
    </div>

    <form class="form" @submit.prevent="onSubmit">
      <div class="input-field">
        <input
          :class="{ invalid: $v.name.$dirty && !$v.name.required }"
          v-model.trim="name"
          id="name"
          type="text"
        />
        <label for="name">Имя</label>
        <small
          class="helper-text invalid"
          v-if="$v.name.$dirty && !$v.name.required"
        >
          Введите ваше имя
        </small>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        Обновить
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { required } from "vuelidate/lib/validators";

export default {
  data: () => ({
    name: "",
  }),
  validations: {
    name: { required },
  },
  methods: {
    async onSubmit() {
      // Если поле не валидно
      if (this.$v.$invalid) {
        // Активация валидации
        this.$v.$touch();
        return;
      }
      this.$store.dispatch('updateName', this.name)
    },
  },
};
</script>