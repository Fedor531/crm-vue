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
  metaInfo() {
    return {
      title: this.$title('Menu_Bill')
    }
  },
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
        /* this.currencyу = await this.$store.dispatch('fetchCurrency') */
        this.currency = {
          base: 'EUR',
          date: new Date(),
          rates: {
            EUR: 1,
            RUB: 89.595339,
            USD: 1.21357
          },
          success: true,
          timestamp: 1610848927
        }
        this.loading = false
      } catch (e) {
        console.log(e)
      }
    }
  },
  async mounted() {
    try {
      /*  this.currency = await this.$store.dispatch('fetchCurrency') */
      this.currency = {
        base: 'EUR',
        date: new Date(),
        rates: {
          EUR: 1,
          RUB: 89.595339,
          USD: 1.21357
        },
        success: true,
        timestamp: 1610848927
      }
      this.loading = false
    } catch (e) {
      console.log(e)
    }
  }
}
</script>
