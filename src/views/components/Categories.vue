<template>
  <div>
    <div class="page-title">
      <h3>{{ 'Menu_Categories' | localize }}</h3>
    </div>
    <section>
      <Loader v-if="loading" />
      <div class="row" v-else>
        <CategoryCreate @created="addNewCategory" />
        <CategoryEdit
          v-if="categories.length"
          :categories="categories"
          @updated="updateCategories"
          @deleteUpdate="deleteUpdate"
          :key="categories.length + updateCount"
        />
        <p v-else class="center">Категорий нет</p>
      </div>
    </section>
  </div>
</template>

<script>
import CategoryCreate from '@/ui-components/CategoryCreate'
import CategoryEdit from '@/ui-components/CategoryEdit'

export default {
  name: 'categories',
   metaInfo() {
    return {
      title: this.$title('Menu_Categories')
    }
  },
  components: {
    CategoryCreate,
    CategoryEdit
  },
  data: () => ({
    categories: [],
    loading: true,
    updateCount: 0
  }),
  methods: {
    addNewCategory(category) {
      this.categories.push(category)
    },
    updateCategories(category) {
      const idx = this.categories.findIndex(c => c.id === category.id)
      this.categories[idx].title = category.title
      this.categories[idx].limit = category.limit
      setTimeout(() => {this.updateCount++}, 0)
    },
    deleteUpdate(categoryId) {
      this.categories = this.categories.filter(c => c.id !== categoryId)
      this.updateCount++
      setTimeout(() => {this.updateCount++}, 0)
    },
  },
  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategories')
    this.loading = false
  }
}
</script>
