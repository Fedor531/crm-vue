<template>
  <div>
    <div class="page-title">
      <h3>{{ 'Menu_Bill' | localize }}</h3>

      <button class="btn waves-effect waves-light btn-small" @click="refresh">
        <i class="material-icons">refresh</i>
      </button>
    </div>

    <Loader v-if="loading" />

    <div class="row" v-else>
      <HomeBill :rates="currency.rates" />
      <HomeCurrency :rates="currency.rates" :date="currency.date" />
    </div>
  </div>
</template>

<script>
import HomeBill from '@/ui-components/HomeBill'
import HomeCurrency from '@/ui-components/HomeCurrency'

export default {
  name: 'home',
  components: {
    HomeBill,
    HomeCurrency
  },
  data: () => ({
    loading: true,
    currency: null
  }),
  methods: {
    async refresh() {
      this.loading = true
      try {
        this.currency = await this.$store.dispatch('fetchCurrency')
        console.log(this.currency)
        this.loading = false
      } catch (e) {
        console.log(e)
      }
    }
  },
  async mounted() {
    try {
      this.currency = await this.$store.dispatch('fetchCurrency')
      console.log(this.currency)
      this.loading = false
    } catch (e) {
      console.log(e)
    }
  }
}
</script>
