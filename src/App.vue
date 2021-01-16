<template>
  <div id="app">
    <!-- component создает динамические компоненты в зависимости от приходящей строки -->
    <component :is="layout">
    </component>
  </div>
</template>

<script>
import EmptyLayout from "@/layouts/EmptyLayout";
import MainLayout from "@/layouts/MainLayout";

export default {
  components: {
    EmptyLayout,
    MainLayout,
  },
  computed: {
    layout() {
      return (this.$route.meta.layout || 'empty') + '-layout'
    },
  },
};
</script>

<style lang="sass">
body
  font-family: 'Roboto', sans-serif

@import '~materialize-css/dist/css/materialize.min.css'
@import 'assets/index.css'
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500&display=swap');
</style>
