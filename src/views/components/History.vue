<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>

    <div class="history-chart">
      <canvas></canvas>
    </div>

    <Loader v-if="loading" />

    <p class="center" v-else-if="!records.length">
      Записей пока нет <router-link to="/record">Добавьте первую</router-link>
    </p>

    <section v-else>
      <HistoryTable :records="records" @delete="deleteRecord" />
    </section>
  </div>
</template>

<script>
import HistoryTable from "@/ui-components/HistoryTable";

export default {
  name: "history",
  data: () => ({
    loading: true,
    records: [],
    categories: [],
  }),
  components: {
    HistoryTable,
  },
  methods: {
    async deleteRecord(recordId) {
      await this.$store.dispatch('deleteRecord', recordId)
      this.records = this.records.filter(r => r.id !== recordId)
      this.$message('Запись удалена')
    }
  },
  async mounted() {
    const records = await this.$store.dispatch("fetchRecords");
    this.categories = await this.$store.dispatch("fetchCategories");
    this.records = records.map((record) => {
      return {
        ...record,
        categoryName: this.categories.find((c) => c.id === record.categoryId).title,
        typeClass: record.type === "income" ? "green" : "red",
        typeName: record.type === "income" ? "Доход" : "Расход",
      };
    });
    this.loading = false;
  },
};
</script>