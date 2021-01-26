<template>
  <div id="modal1" ref="modal" class="modal">
    <div class="modal-content">
      <h5 class="modal__title">Выберите новую категорию</h5>
      <div v-for="(item, idx) in this.categories" :key="idx">
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            :value="item.id"
            v-model="newCategoryId"
          />
          <span class="type-name">{{ item.title }}</span>
        </label>
      </div>
    </div>
    <div class="modal-footer">
      <button
        class="modal-footer__ok waves-effect waves-green btn-small btn"
        :disabled="!newCategoryId"
        @click="onSubmit"
      >
        Изменить
      </button>
      <button class="modal-close waves-effect waves-green btn-small btn">
        Отмена
      </button>
    </div>
  </div>
</template>

<style lang="sass" scoped>
.modal
  &-content
    &__title
      margin-bottom: 10px
  &-footer
    &__ok
      margin-right: 20px !important

.type-name
  font-size: 22px !important
  color: #333
</style>

<script>
export default {
  props: ['categories', 'activeRecord',],
  data() {
    return {
      newCategoryId: null,
      modal: null
    }
  },
  methods: {
    async onSubmit() {
      const changeData = {
        recordId: this.activeRecord.id,
        categoryId: this.newCategoryId
      }
      await this.$store.dispatch('changeRecordCategory', changeData)
      this.$emit('updateAll')
      this.modal.close()
      this.newCategoryId = null
    }
  },
  watch:{
    activeRecord() {
      this.newCategoryId = null
    }
  },
  mounted() {
    this.modal = M.Modal.init(this.$refs.modal, { startingTop: '50%' })
  },
  beforeDestroy() {
    this.modal.destroy()
  }
}
</script>
