export const state = () => ({
  images: []
})

export const getters = {
  images: state => state.images.map(image => Object.assign({imageManehgeArray: []}, image))
}

export const mutations = {
  addImage(state, {image: images}) {
    console.log("addImage")
    state.images.push(images)
  },
  updateImage(state, {image}) {
    state.images = state.images.map(p => (p.ID === image.ID ? image : p))
  },
  clearImages(state) {
    state.images = []
  },

}

export const actions = {

  async getImageList({commit}) {
    const images = await this.$axios.$get(`/getImageList`)
    commit('clearImages')
    console.log("receive data=", JSON.stringify(images))
    console.log("imageManageArray len=", images.imageManageArray.length)
    //  ...images.forEach((_, i) => { console.log(i) })
    Object.entries(images.imageManageArray || [])
      .reverse()
      .forEach(([_, imageManageArray]) =>
          commit('addImage', {
            image: {
              ...imageManageArray
            }
          })

      )

    console.log("Init")
  },

  async getUsJson({commit}) {
    const us_json = await this.$axios.$get(`http://localhost:8080/static/data/us.json`)
  }
}
