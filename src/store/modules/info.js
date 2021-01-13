import firebase from 'firebase/app'

export default {
  state: {
    info: {}
  },
  mutations: {
    setInfo(state, info) {
      state.info = info
    },
    clearInfo(state) {
      state.info = {}
    }
  },
  actions: {
    async fetchInfo({ dispatch, commit }) {
      try {
        const uid = await dispatch('getUid')
        const info = (
          await firebase
            .database()
            .ref(`/users/${uid}/info`)
            .once('value')
        ).val()
        console.log(info)
        commit('setInfo', info)
      } catch (e) {
        console.log(e)
      }
    },

    async updateInfo({ dispatch, commit, getters }, toUpdate) {
      try {
        const uid = await dispatch('getUid')
        const updateInfo = { ...getters.info, ...toUpdate }
        await firebase
          .database()
          .ref(`/users/${uid}/info`)
          .update(updateInfo)
        commit('setInfo', updateInfo)
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  },
  getters: {
    info: state => state.info
  }
}
