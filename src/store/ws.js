export const state = {
  // 存放需要管理的數據
  ws: {},
  wsRes: [],
  clientRes: []
}

export const actions = {
  // 異步修改state，本質還是通過mutation修改
}

export const mutations = {
  // 唯一可以同步修改state的func
  setWs(state, payload) {
    state.ws = payload
  },
  setWsRes(state, payload) {
    state.wsRes.push(payload)
  },
  setClientRes(state, payload) {
    console.log(payload)
    state.clientRes = payload
  }
}
export const getters = {
  // 類似組件中的計算屬性
}

export default {
  state,
  actions,
  mutations,
  getters,
  namespaced: true
}
