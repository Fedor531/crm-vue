import firebase from 'firebase/app'

export default {
  actions: {
    async login({ commit }, { email, password }) {
      try {
        // Метод авторизации
        await firebase.auth().signInWithEmailAndPassword(email, password)
      } catch (e) {
        // Вызываем мутацию из главного store
        commit('setError', e)
        throw e
      }
    },

    async logout({ commit }) {
      // Очистка информации о пользователе
      await firebase.auth().signOut()
      commit('clearInfo')
    },

    async register({ dispatch, commit }, { email, password, name, bill }) {
      try {
        // Метод авторизации
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        // Вызываем action
        const uid = await dispatch('getUid')
        // Добавляем в базу данных таблицу с uid и info
        await firebase
          .database()
          .ref(`/users/${uid}/info`)
          .set({
            bill,
            name,
            locale: 'ru-RU'
          })
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },

    getUid() {
      const user = firebase.auth().currentUser
      return user ? user.uid : null
    }
  }
}
