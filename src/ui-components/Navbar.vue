<template>
  <nav class="navbar teal darken-2">
    <div class="nav-wrapper">
      <div class="navbar-left">
        <a href="#" @click.prevent="$emit('click')">
          <i class="material-icons white-text">dehaze</i>
        </a>
        <span class="white-text time">{{ date | date('datetime') }}</span>
      </div>

      <ul class="right hide-on-small-and-down">
        <li>
          <a
            class="dropdown-trigger white-text"
            href="#"
            data-target="dropdown"
            ref="dropdown"
          >
            {{ name }}
            <i class="material-icons right">arrow_drop_down</i>
          </a>

          <ul id="dropdown" class="dropdown-content">
            <li>
              <router-link class="black-text" to="/profile">
                <i class="material-icons">account_circle</i
                >{{ 'ProfileTitle' | localize }}
              </router-link>
            </li>
            <li class="divider" tabindex="-1"></li>
            <li>
              <a href="#" class="black-text" @click.prevent="logout">
                <i class="material-icons">assignment_return</i
                >{{ 'LogOut' | localize }}
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style lang="sass" scoped>
.time
  font-weight: 500
</style>

<script>
export default {
  data: () => ({
    date: new Date(),
    interval: null,
    dropdown: null
  }),

  methods: {
    async logout() {
      await this.$store.dispatch('logout')
      this.$router.push({
        name: 'login',
        query: {
          message: 'logout'
        }
      })
    }
  },

  computed: {
    name() {
      return this.$store.getters.info.name
    }
  },

  mounted() {
    this.dropdown = M.Dropdown.init(this.$refs.dropdown, {
      constrainWidth: true
    })
    this.interval = setInterval(() => {
      this.date = new Date()
    }, 1000)
  },

  beforeDestroy() {
    // Убираем интервал если навигации нет в шаблоне, чтобы избежать утечки памяти
    clearInterval(this.interval)

    if (this.dropdown && this.dropdown.destroy) {
      this.dropdown.destroy()
    }
  }
}
</script>
