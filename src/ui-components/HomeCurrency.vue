<template>
  <div class="col s12 m6 l8">
    <div class="card green lighten-1 bill-card">
      <div class="card-content white-text">
        <div class="card-header">
          <span class="card-title">{{ 'ExchangeRate' | localize }}</span>
        </div>
        <table>
          <thead>
            <tr>
              <th class="th">{{ 'Currency' | localize }}</th>
              <th class="th">{{ 'Exchange' | localize }}</th>
              <th class="th">{{ 'Date' | localize }}</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="cur in currencies" :key="cur">
              <td>{{ cur }}</td>
              <td>{{ rates[cur] }}</td>
              <td>{{ new Date(date) | date('date') }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
.th
  font-weight: 400
</style>

<script>
export default {
  props: ['rates', 'date'],
  data: () => ({
    currencies: ['RUB', 'USD', 'EUR']
  })
}
</script>
