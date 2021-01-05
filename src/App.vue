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
      console.log(this.$route.meta.layout);
      return (this.$route.meta.layout || 'empty') + '-layout'
    },
  },
};
</script>

<style lang="sass">
@import '~materialize-css/dist/css/materialize.min.css'
@import 'assets/index.css'
</style>
