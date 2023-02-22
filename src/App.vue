<template>
  <nav
    class="navbar navbar-expand-lg navbar-light bg-light"
    style="height: 5hv"
  >
    <div class="container-fluid">
      <a class="navbar-brand"
        ><router-link to="/" class="nav-link">YouAlone聊天</router-link></a
      >
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/login" class="nav-link" v-if="!onIsLoign"
              >Login</router-link
            >
            <router-link to="/login" class="nav-link" @click="onLogout" v-else
              >Logout</router-link
            >
          </li>
          <li class="nav-item">
            <router-link to="/chat" class="nav-link">聊天室</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/about" class="nav-link">About</router-link>
          </li>
        </ul>
      </div>
      <form class="d-flex" @submit.prevent>
        <span class="input-group-text" id="basic-addon1">@</span>
        <input
          type="text"
          class="form-control"
          placeholder="Username"
          aria-label="Username"
          aria-describedby="basic-addon1"
          v-model="searchText"
        />
        <button class="btn btn-outline-success" @click="onSubmit">
          Search
        </button>
      </form>
    </div>
  </nav>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import { connectSocket } from './utils/api'
import { ElMessage } from 'element-plus'

export default {
  setup() {},
  computed: {
    onIsLoign() {
      console.log('onIsLoign')
      return this.$store.state.isLogin
    }
  },
  methods: {
    onSubmit(event) {
      ElMessage(
        '您要查詢的使用者為:' + this.searchText + '。此功能後端API開發中'
      )
    },
    onLogout(event) {
      localStorage.removeItem('token') // 移除紀錄的token
      this.$store.state.ws.ws.close() // 關閉ws連線
      this.$store.dispatch('setUser', false) // 登入標籤設定為false
      ElMessage('登出')
    }
  },
  data() {
    return {
      searchText: ''
    }
  },
  created() {
    connectSocket()
  }
}
</script>

<style lang="scss">
@import './assets/all.scss';
</style>
