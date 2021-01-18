<template>
  <div>
    <Loader v-if="loading" />
    <div class="app-main-layout" v-else>
      <Navbar @click="isOpen = !isOpen" />
      <!-- Передаем значение isOpen в пропсы Sidebar -->
      <Sidebar :isOpen="isOpen" :key="locale" />
      <main class="app-content" :class="{ full: !isOpen }">
        <div class="app-page">
          <router-view />
        </div>
      </main>

      <div class="fixed-action-btn">
        <router-link class="btn-floating btn-large blue" to="/record">
          <i class="large material-icons">add</i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/ui-components/Navbar";
import Sidebar from "@/ui-components/Sidebar";
import messages from '@/utils/messages'

export default {
  name: "MainLayout",
  components: {
    Navbar,
    Sidebar,
  },
  data: () => ({
    isOpen: true,
    loading: true,
  }),
    computed: {
    error() {
      return this.$store.getters.error
    },
    locale() {
      return this.$store.getters.info.locale
    }
  },
  watch: {
    error(fbError) {
      console.log(fbError);
      this.$error(messages[fbError.code] || 'Что-то пошло не так')
    },
  },
  async mounted() {
    // Если есть данные то загрузки не будет , а если нет данных придется дождаться запроса
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch("fetchInfo");
    }
    this.loading = false;
  },
};
</script>