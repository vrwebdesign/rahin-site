import jwtDecode from 'jwt-decode'
export const state = () => ({
  token: null,
  refreshToken: null,
  user: {}
})
export const mutations = {
  set_token(state, params) {
    state.token = params.token
    state.refreshToken = params.refreshToken
    localStorage.setItem('auth', JSON.stringify(params))
    if (state.token) {
      let { data } = jwtDecode(state.token)
      state.user = data
    }
    return (<any>this).$axios.setToken(state.token, 'Bearer')
  },
  logout(state) {
    localStorage.removeItem('auth')
    state.token = null
    state.refreshToken = null
    state.user = {}
    return (<any>this).$axios.setToken(false)
  },
  init(state, $axios) {
    let auth = localStorage.getItem('auth')
    if (!auth) {
      return
    }
    let parsed_auth = JSON.parse(auth)
    state.token = parsed_auth.token
    state.refreshToken = parsed_auth.refreshToken
    $axios.setToken(state.token, 'Bearer')
    if (state.token) {
      let { data } = jwtDecode(state.token)
      state.user = data
    }
  }
}
export const actions = {}
export const getters = {
  token(state) {
    return state.token
  },
  user(state) {}
}
