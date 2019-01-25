
export const state = () => ({
  isLoggedIn: false,

})

export const getters = {
  isLoggedIn: state => state.isLoggedIn,
}
