import firebase from 'firebase/app'

export default {
  actions: {
    async createCategory({ commit, dispatch }, { title, type, limit }) {
      const categoryDateObj =
        type === 'outcome' ? { title, type, limit } : { title, type }
      try {
        const uid = await dispatch('getUid')
        const category = await firebase
          .database()
          .ref(`/users/${uid}/categories`)
          .push(categoryDateObj)
        return { title, type, limit, id: category.key }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },

    async fetchCategories({ commit, dispatch }) {
      try {
        const uid = await dispatch('getUid')
        const categories =
          (
            await firebase
              .database()
              .ref(`/users/${uid}/categories`)
              .once('value')
          ).val() || []
        return Object.keys(categories).map(key => ({
          ...categories[key],
          id: key
        }))
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },

    async fetchCategoryById({ commit, dispatch }, id) {
      try {
        const uid = await dispatch('getUid')
        const category =
          (
            await firebase
              .database()
              .ref(`/users/${uid}/categories`)
              .child(id)
              .once('value')
          ).val() || []
        return { ...category, id }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },

    async updateCategory({ commit, dispatch }, { id, title, limit }) {
      try {
        const uid = await dispatch('getUid')
        await firebase
          .database()
          .ref(`/users/${uid}/categories`)
          .child(id)
          .update({ title, limit })
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },

    async deleteCategory({ commit, dispatch }, categoryId) {
      try {
        const uid = await dispatch('getUid')
        // Удаляем все записи категории из бд
        let records =
          (
            await firebase
              .database()
              .ref(`/users/EJKn3YJZa7fn3Pd2xwAcOKl8zBU2/records`)
              .once('value')
          ).val() || []
        Object.keys(records)
          .map(key => ({
            ...records[key],
            id: key
          }))
          .forEach(r => {
            if (r.categoryId === categoryId) {
              dispatch('deleteRecord', r.id)
            }
          })
        // Удаляем категорию из бд
        await firebase
          .database()
          .ref(`/users/${uid}/categories/${categoryId}`)
          .remove()
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  }
}
