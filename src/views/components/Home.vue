<template>
  <div>
    <div class="page-title">
      <h3>Счет</h3>

      <button class="btn waves-effect waves-light btn-small">
        <i class="material-icons">refresh</i>
      </button>
    </div>

    <Loader v-if="loading"/>
    
    <div class="row" v-else>
      <HomeBill />
      <HomeCurrency />
      
    </div>
  </div>
</template>

<script>
import HomeBill from "@/ui-components/HomeBill";
import HomeCurrency from "@/ui-components/HomeCurrency";

export default {
  name: "home",
  data: () => ({
    loading: true,
    currency: null
  }),
  components: {
    HomeBill,
    HomeCurrency,
  },
};
</script>