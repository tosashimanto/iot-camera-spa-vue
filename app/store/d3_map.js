export const state = () => ({
  map_json: {}
})

export const getters = {
  map_json: state => state.map_json,
}

export const mutations = {

  setMapJSON(state, { map_json }) {
    console.log("setMapJSON")
    map_json = map_json
    console.log("map_json=", map_json)
  },

}

export const actions = {


  async getMapJSON({ commit }) {

    const map_json = await this.$axios.$get(`http://localhost:8080/d3_map/us.json`)
    commit('setMapJSON', { map_json })
  },

  async getTestJSON({ commit }) {

    const map_json = await this.$axios.$get(`http://localhost:8080/d3_map/us.json`)
    return map_json
  },
}
