<template>
  <div class="app-main-layout">
    <Navbar @click="isOpen = !isOpen"/>
    <!-- Передаем значение isOpen в пропсы Sidebar -->
    <Sidebar :isOpen="isOpen"/>
    <main 
      class="app-content"
      :class="{ full: !isOpen }"
      >
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
</template>

<script>
import Navbar from "@/ui-components/Navbar";
import Sidebar from "@/ui-components/Sidebar";

export default {
  name: "MainLayout",
  data: () => ({
    isOpen: true
  }),
  components: {
    Navbar,
    Sidebar,
  },
};
</script>