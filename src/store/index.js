import { createStore } from 'vuex'
import ws from './ws'

export default createStore({
  state: { isLogin: false }, // 存放需要管理的數據
  mutations: {
    userStatus (state, flag) {
      state.isLogin = flag
    }
  }, // 唯一可以同步修改state的func
  actions: {
    setUser ({ commit }, flag) {
      commit('userStatus', flag)
    }
  }, // 異步修改state，本質還是通過mutation修改
  getters: { isLogin: (state) => state.isLogin }, // 類似組件中的計算屬性
  modules: { ws } // 用於多數據管理，可以拆分為一個個模塊
})
