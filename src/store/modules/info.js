import firebase from 'firebase/app'

export default {
  state: {
    info: {

    }
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
        const info = (await firebase.database().ref(`/users/${uid}/info`).once('value')).val()
        console.log(info);
        commit('setInfo', info)
      }
      catch (e) {
        console.log(e);
      }
    },
    async updateName({ dispatch, commit, state }, newName) {
      try {
        const uid = await dispatch('getUid')
        await firebase.database().ref(`/users/${uid}`).child('info').update({name:newName})
        const newInfo = {}
        newInfo.name = newName
        newInfo.bill = state.info.bill
        commit('setInfo', newInfo)
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